"use client";

import React, { useState } from "react";
import { driveFileId, driveFileUrl, type Resume } from "@/lib/schema";
import { buttonClass, newId, SaveBar, TextField, useContentEditor } from "./kit";

const today = () => new Date().toISOString().slice(0, 10);

export default function ResumeEditor({ initial, sha }: { initial: Resume; sha: string }) {
  const { data, setData, dirty, status, save } = useContentEditor("resume", initial, sha);
  const [url, setUrl] = useState("");
  const [label, setLabel] = useState("Resume");
  const [error, setError] = useState<string | null>(null);

  const add = () => {
    const parsed = driveFileUrl.safeParse(url);
    if (!parsed.success) return setError(parsed.error.issues[0].message);
    const version = { id: newId("resume"), label: label.trim() || "Resume", url: parsed.data, addedAt: today() };
    setData({ activeId: version.id, versions: [version, ...data.versions] });
    setUrl("");
    setError(null);
  };

  return (
    <div>
      <section className="rounded-[20px] bg-white p-4 sm:p-6">
        <h2 className="wide text-xl font-extrabold">Add a new resume</h2>
        <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-graphite">
          <li>Upload the PDF to Google Drive.</li>
          <li>Share it as &ldquo;Anyone with the link&rdquo;, then copy the link.</li>
          <li>Paste it here. It becomes the active resume once you save.</li>
        </ol>
        <div className="mt-4 grid gap-3 sm:grid-cols-[minmax(0,2fr)_minmax(0,1fr)_auto] sm:items-end">
          <TextField label="Drive link" type="url" value={url} onChange={setUrl} placeholder="https://drive.google.com/file/d/…/view" />
          <TextField label="Label" value={label} onChange={setLabel} />
          <button type="button" className={buttonClass.primary} onClick={add} disabled={!url.trim()}>Add</button>
        </div>
        {error && <p role="alert" className="mt-2 text-sm font-semibold text-red-700">{error}</p>}
      </section>

      <section className="mt-4">
        <h2 className="wide mb-2 text-xl font-extrabold">Versions</h2>
        <p className="mb-3 text-sm text-graphite">
          The site&apos;s resume buttons and <code>/resume</code> open the active one. Old links keep working until you delete or unshare them in Drive.
        </p>
        <ul className="grid gap-3">
          {data.versions.map((version) => {
            const active = version.id === data.activeId;
            const fileId = driveFileId(version.url);
            return (
              <li key={version.id} className={`flex min-w-0 flex-wrap items-center gap-3 rounded-[20px] bg-white p-3 sm:p-4 ${active ? "ring-4 ring-indigo" : ""}`}>
                {fileId && (
                  <img src={`https://drive.google.com/thumbnail?id=${fileId}&sz=w200`} alt="" referrerPolicy="no-referrer" className="h-20 w-14 shrink-0 rounded bg-page object-cover object-top" />
                )}
                <div className="min-w-0 flex-1">
                  <p className="font-bold">{version.label}{active && <span className="ml-2 rounded-full bg-indigo px-2 py-0.5 text-xs text-white">Active</span>}</p>
                  <p className="text-sm text-graphite">Added {version.addedAt}</p>
                  <a href={version.url} target="_blank" rel="noopener noreferrer" className="block truncate text-sm underline underline-offset-4">{version.url}</a>
                </div>
                <div className="flex gap-1">
                  {!active && (
                    <button type="button" className={buttonClass.secondary} onClick={() => setData({ ...data, activeId: version.id })}>Make active</button>
                  )}
                  {!active && (
                    <button
                      type="button"
                      className={buttonClass.danger}
                      onClick={() => { if (window.confirm(`Remove "${version.label}" from the list? The Drive file itself isn't touched.`)) setData({ ...data, versions: data.versions.filter((item) => item.id !== version.id) }); }}
                    >
                      Remove
                    </button>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      <SaveBar dirty={dirty} status={status} onSave={() => save()} />
    </div>
  );
}
