"use client";

import React, { createContext, useContext, useRef, useState } from "react";
import { ImagePlus } from "lucide-react";
import type { Upload } from "@/app/admin/actions";
import { buttonClass } from "./kit";

const MAX_EDGE = 2000;
const TARGET_BYTES = 3.5 * 1024 * 1024;
const ACCEPTED = /^image\/(png|jpeg|webp|gif|avif|heic|heif)$/;

/** Resize in the browser and re-encode as WebP (JPEG where the browser can't encode WebP). */
export async function prepareImage(file: File): Promise<Blob> {
  if (!ACCEPTED.test(file.type)) throw new Error(`${file.name}: choose a PNG, JPEG or WebP image. SVG isn't allowed.`);
  const bitmap = await createImageBitmap(file).catch(() => {
    throw new Error(`${file.name}: this browser can't read that image.`);
  });
  const scale = Math.min(1, MAX_EDGE / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  canvas.getContext("2d")!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();

  const encode = (type: string, quality: number) => new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, type, quality));
  for (const quality of [0.86, 0.76, 0.62, 0.5]) {
    let blob = await encode("image/webp", quality);
    if (blob && blob.type !== "image/webp") blob = await encode("image/jpeg", quality);
    if (blob && blob.size <= TARGET_BYTES) return blob;
  }
  throw new Error(`${file.name}: still too large after resizing. Try a smaller image.`);
}

export async function uploadImage(file: File): Promise<Upload & { src: string; preview: string }> {
  const blob = await prepareImage(file);
  const form = new FormData();
  form.append("file", blob, blob.type === "image/webp" ? "image.webp" : "image.jpg");
  const response = await fetch("/api/admin/upload", { method: "POST", body: form });
  const body = (await response.json().catch(() => ({}))) as { path?: string; sha?: string; src?: string; error?: string };
  if (!response.ok || !body.path || !body.sha || !body.src) throw new Error(body.error ?? "The upload failed. Try again.");
  return { path: body.path, sha: body.sha, src: body.src, preview: URL.createObjectURL(blob) };
}

/**
 * Where to show an image in admin. New uploads show from the browser; images committed but not yet
 * deployed (/uploads/...) show from the public repo; everything else is already on the site.
 */
const PreviewContext = createContext<{ rawBase: string; local: Record<string, string> }>({ rawBase: "", local: {} });

export function PreviewProvider({ rawBase, local, children }: { rawBase: string; local: Record<string, string>; children: React.ReactNode }) {
  return <PreviewContext.Provider value={{ rawBase, local }}>{children}</PreviewContext.Provider>;
}

export function usePreviewSrc() {
  const { rawBase, local } = useContext(PreviewContext);
  return (src: string) => local[src] ?? (src.startsWith("/uploads/") && rawBase ? `${rawBase}${src}` : src);
}

/** Pending uploads for one editor: committed with the next save, then cleared. */
export function useUploads() {
  const [uploads, setUploads] = useState<(Upload & { src: string; preview: string })[]>([]);
  const local = Object.fromEntries(uploads.map((upload) => [upload.src, upload.preview]));
  return {
    uploads,
    local,
    add: (added: (Upload & { src: string; preview: string })[]) => setUploads((current) => [...current, ...added]),
    clear: () => setUploads([]),
  };
}

export function UploadButton({ label, multiple, onUploaded }: { label: string; multiple?: boolean; onUploaded: (uploads: (Upload & { src: string; preview: string })[]) => void }) {
  const input = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handle = async (files: FileList | null) => {
    if (!files?.length) return;
    setError(null);
    const done: (Upload & { src: string; preview: string })[] = [];
    const list = [...files];
    try {
      // One request per image keeps each under the hosting limit.
      for (const [index, file] of list.entries()) {
        setBusy(`Uploading ${index + 1} of ${list.length}…`);
        done.push(await uploadImage(file));
      }
    } catch (cause) {
      setError((cause as Error).message);
    } finally {
      if (done.length) onUploaded(done);
      setBusy(null);
      if (input.current) input.current.value = "";
    }
  };

  return (
    <div>
      <input ref={input} type="file" accept="image/png,image/jpeg,image/webp" multiple={multiple} className="sr-only" tabIndex={-1} aria-hidden="true" onChange={(event) => handle(event.target.files)} />
      <button type="button" className={buttonClass.secondary} disabled={busy !== null} onClick={() => input.current?.click()}>
        <ImagePlus className="h-4 w-4" aria-hidden="true" />
        {busy ?? label}
      </button>
      {error && <p role="alert" className="mt-2 text-sm font-semibold text-red-700">{error}</p>}
    </div>
  );
}
