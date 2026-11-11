"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { ArrowDown, ArrowUp, CircleCheck, Eye, EyeOff, Trash2 } from "lucide-react";
import type { z } from "zod";
import { saveContent, type SaveResult, type Upload } from "@/app/admin/actions";
import { describeIssues, SCHEMAS, type ContentData, type ContentFile } from "@/lib/schema";
import { toneBg } from "@/lib/tones";

// Shared admin form pieces. Everything is a single column on phones and at least 44px to tap.

export const inputClass =
  "block w-full min-h-11 rounded-xl border border-night-edge bg-night px-3 py-2 text-base text-night-text transition-colors duration-150 hover:border-[#4a4a55] focus:border-periwinkle-light aria-[invalid=true]:border-red-400";

export const buttonClass = {
  primary: "inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-periwinkle px-5 font-semibold text-ink transition-colors duration-150 hover:bg-periwinkle-light disabled:cursor-not-allowed disabled:bg-night-raised disabled:text-night-faint",
  secondary: "inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-night-edge px-4 font-semibold text-night-text transition-colors duration-150 hover:border-night-muted hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-50",
  quiet: "inline-flex min-h-11 min-w-11 items-center justify-center gap-1.5 rounded-xl px-2 text-sm font-semibold text-night-muted transition-colors duration-150 hover:bg-white/5 hover:text-night-text disabled:pointer-events-none disabled:opacity-30",
  danger: "inline-flex min-h-11 min-w-11 items-center justify-center gap-1.5 rounded-xl px-2 text-sm font-semibold text-red-300 transition-colors duration-150 hover:bg-red-500/10 hover:text-red-200",
};

export const newId = (prefix: string) => `${prefix}-${Math.random().toString(36).slice(2, 8)}`;

export const slugify = (text: string) =>
  text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 60) || "item";

export function Field({ label, hint, children, className = "" }: { label: string; hint?: string; children: (id: string) => React.ReactNode; className?: string }) {
  const id = useId();
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-night-text">{label}</label>
      {children(id)}
      {hint && <p className="mt-1.5 text-xs text-night-faint">{hint}</p>}
    </div>
  );
}

export function TextField({ label, hint, value, onChange, type = "text", placeholder, className, required }: {
  label: string; hint?: string; value: string; onChange: (value: string) => void; type?: string; placeholder?: string; className?: string; required?: boolean;
}) {
  return (
    <Field label={label} hint={hint} className={className}>
      {(id) => <input id={id} type={type} value={value} required={required} placeholder={placeholder} onChange={(event) => onChange(event.target.value)} className={inputClass} />}
    </Field>
  );
}

export function TextArea({ label, hint, value, onChange, rows = 3, className }: {
  label: string; hint?: string; value: string; onChange: (value: string) => void; rows?: number; className?: string;
}) {
  return (
    <Field label={label} hint={hint} className={className}>
      {(id) => <textarea id={id} value={value} rows={rows} onChange={(event) => onChange(event.target.value)} className={inputClass} />}
    </Field>
  );
}

export function Select<T extends string>({ label, value, options, onChange, className, labels }: {
  label: string; value: T; options: readonly T[]; onChange: (value: T) => void; className?: string; labels?: Partial<Record<T, string>>;
}) {
  return (
    <Field label={label} className={className}>
      {(id) => (
        <select id={id} value={value} onChange={(event) => onChange(event.target.value as T)} className={inputClass}>
          {options.map((option) => <option key={option} value={option}>{labels?.[option] ?? option}</option>)}
        </select>
      )}
    </Field>
  );
}

export function Check({ label, checked, onChange }: { label: string; checked: boolean; onChange: (checked: boolean) => void }) {
  return (
    <label className="inline-flex min-h-11 cursor-pointer items-center gap-2.5 text-sm font-semibold text-night-text">
      <input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} className="h-5 w-5 accent-periwinkle" />
      {label}
    </label>
  );
}

/**
 * A list typed as text, one entry per line (or comma separated). Keeps its own text so typing a
 * new line or a trailing comma isn't swallowed, and reports the parsed list.
 */
export function ListField({ label, hint, value, onChange, separator = "line", rows = 4, className }: {
  label: string; hint?: string; value: string[]; onChange: (value: string[]) => void; separator?: "line" | "comma"; rows?: number; className?: string;
}) {
  const join = (list: string[]) => list.join(separator === "line" ? "\n" : ", ");
  const [text, setText] = useState(() => join(value));
  const last = useRef(value);
  useEffect(() => {
    if (value !== last.current) {
      last.current = value;
      setText(join(value));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const update = (next: string) => {
    setText(next);
    const list = next.split(separator === "line" ? /\n/ : /,/).map((item) => item.trim()).filter(Boolean);
    last.current = list;
    onChange(list);
  };

  return (
    <Field label={label} hint={hint ?? (separator === "line" ? "One per line" : "Separate with commas")} className={className}>
      {(id) =>
        separator === "line" ? (
          <textarea id={id} rows={rows} value={text} onChange={(event) => update(event.target.value)} className={inputClass} />
        ) : (
          <input id={id} value={text} onChange={(event) => update(event.target.value)} className={inputClass} />
        )
      }
    </Field>
  );
}

/** "Key: value" per line, for the project's technology and deployment tables. */
export function PairsField({ label, hint, value, onChange }: { label: string; hint?: string; value: Record<string, string>; onChange: (value: Record<string, string>) => void }) {
  const lines = Object.entries(value).map(([key, text]) => `${key}: ${text}`);
  return (
    <ListField
      label={label}
      hint={hint ?? "One per line, as Name: value"}
      value={lines}
      onChange={(list) => {
        const next: Record<string, string> = {};
        list.forEach((line) => {
          const at = line.indexOf(":");
          if (at > 0) next[line.slice(0, at).trim()] = line.slice(at + 1).trim();
        });
        onChange(next);
      }}
    />
  );
}

/** Move, hide and delete controls for an item in an ordered list. */
export function ItemTools({ index, count, onMove, visible, onToggle, onDelete, name }: {
  index: number; count: number; onMove: (to: number) => void; visible?: boolean; onToggle?: () => void; onDelete: () => void; name: string;
}) {
  return (
    <div className="ml-auto flex flex-wrap items-center gap-0.5">
      <button type="button" className={buttonClass.quiet} disabled={index === 0} onClick={() => onMove(index - 1)} aria-label={`Move ${name} up`}>
        <ArrowUp className="h-4 w-4" aria-hidden="true" />
      </button>
      <button type="button" className={buttonClass.quiet} disabled={index === count - 1} onClick={() => onMove(index + 1)} aria-label={`Move ${name} down`}>
        <ArrowDown className="h-4 w-4" aria-hidden="true" />
      </button>
      {onToggle && (
        <button type="button" className={buttonClass.quiet} onClick={onToggle} aria-pressed={!visible} aria-label={visible ? `Hide ${name}` : `Show ${name}`}>
          {visible ? <Eye className="h-4 w-4" aria-hidden="true" /> : <EyeOff className="h-4 w-4" aria-hidden="true" />}
          <span className="max-sm:hidden">{visible ? "Visible" : "Hidden"}</span>
        </button>
      )}
      <button
        type="button"
        className={buttonClass.danger}
        onClick={() => { if (window.confirm(`Delete ${name}? It disappears from the site after you save. To keep it but take it off the site, hide it instead.`)) onDelete(); }}
        aria-label={`Delete ${name}`}
      >
        <Trash2 className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  );
}

export const move = <T,>(list: T[], from: number, to: number) => {
  if (to < 0 || to >= list.length) return list;
  const next = [...list];
  const [item] = next.splice(from, 1);
  next.splice(to, 0, item);
  return next;
};

export const replaceAt = <T,>(list: T[], index: number, item: T) => list.map((current, i) => (i === index ? item : current));

/** A collapsible card for one item in a list. */
export function ItemCard({ title, subtitle, muted, open, onOpen, tools, tone, children }: {
  title: string; subtitle?: string; muted?: boolean; open: boolean; onOpen: (open: boolean) => void; tools: React.ReactNode; tone?: string; children: React.ReactNode;
}) {
  return (
    <li className={`min-w-0 rounded-2xl border bg-night-panel p-3 transition-colors duration-150 sm:p-4 ${open ? "border-night-edge" : "border-night-line hover:border-night-edge"}`}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <button type="button" onClick={() => onOpen(!open)} aria-expanded={open} className={`flex min-h-11 min-w-[12rem] flex-1 items-center gap-3 rounded-xl text-left ${muted ? "opacity-55" : ""}`}>
          {tone && <span aria-hidden="true" className={`h-3.5 w-3.5 shrink-0 rounded-full ${toneBg(tone)}`} />}
          <span className="min-w-0">
            <span className="wide block truncate text-lg font-extrabold text-night-text">{title || "Untitled"}</span>
            {subtitle && <span className="block truncate text-sm text-night-faint">{subtitle}</span>}
          </span>
        </button>
        {tools}
      </div>
      {open && <div className="mt-3 grid gap-5 border-t border-night-line pt-5">{children}</div>}
    </li>
  );
}

// ---------------------------------------------------------------------------------------------
// Saving

type Status =
  | { kind: "idle" }
  | { kind: "saving" }
  | { kind: "saved"; commitUrl: string }
  | { kind: "error"; message: string; issues?: string[]; conflict?: boolean; signedOut?: boolean };

/** Editor state for one content file, with validation and conflict-safe saving. */
export function useContentEditor<F extends ContentFile>(file: F, initial: ContentData[F], initialSha: string) {
  const [data, setData] = useState<ContentData[F]>(initial);
  const [sha, setSha] = useState(initialSha);
  const [saved, setSaved] = useState(() => JSON.stringify(initial));
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const dirty = JSON.stringify(data) !== saved;

  useEffect(() => {
    if (!dirty) return;
    const warn = (event: BeforeUnloadEvent) => event.preventDefault();
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  const save = async (uploads: Upload[] = []) => {
    const check = (SCHEMAS[file] as z.ZodType).safeParse(data);
    if (!check.success) {
      setStatus({ kind: "error", message: "Some fields need fixing.", issues: describeIssues(check.error) });
      return;
    }
    setStatus({ kind: "saving" });
    let result: SaveResult;
    try {
      result = await saveContent({ file, data: check.data, baseSha: sha, uploads });
    } catch {
      result = { ok: false, error: "Couldn't reach the server. Check your connection and try again." };
    }
    if (result.ok) {
      setSha(result.sha);
      setSaved(JSON.stringify(data));
      setStatus({ kind: "saved", commitUrl: result.commitUrl });
    } else {
      setStatus({ kind: "error", message: result.error, issues: result.issues, conflict: result.conflict, signedOut: result.signedOut });
    }
  };

  return { data, setData, dirty, status, save };
}

/** Sticky save bar with the outcome of the last save. */
export function SaveBar({ dirty, status, onSave }: { dirty: boolean; status: Status; onSave: () => void }) {
  return (
    <div className="sticky bottom-0 z-20 -mx-3 mt-8 border-t border-night-line bg-night/85 px-3 py-3 backdrop-blur-md sm:-mx-6 sm:px-6" style={{ paddingBottom: "max(12px, env(safe-area-inset-bottom))" }}>
      <div role="status" aria-live="polite" className="mb-2 text-sm empty:hidden">
        {status.kind === "saved" && !dirty && (
          <p className="flex flex-wrap items-center gap-x-2 gap-y-1 font-semibold text-mint">
            <CircleCheck className="h-4 w-4" aria-hidden="true" />
            Saved. Live in a minute or two.
            <a href={status.commitUrl} target="_blank" rel="noopener noreferrer" className="text-night-muted underline underline-offset-4 hover:text-night-text">View the change</a>
          </p>
        )}
        {status.kind === "error" && (
          <div className="rounded-xl border border-red-400/30 bg-red-500/10 p-3 text-red-200">
            <p className="font-semibold">{status.message}</p>
            {status.issues && <ul className="mt-1 list-disc pl-5">{status.issues.map((issue) => <li key={issue}>{issue}</li>)}</ul>}
            {status.conflict && <button type="button" onClick={() => window.location.reload()} className="mt-2 font-semibold underline underline-offset-4">Reload the latest version</button>}
            {status.signedOut && <a href="/admin/login" className="mt-2 inline-block font-semibold underline underline-offset-4">Sign in again</a>}
          </div>
        )}
      </div>
      <div className="flex items-center justify-between gap-3">
        <span className="inline-flex items-center gap-2 text-sm text-night-muted">
          <span aria-hidden="true" className={`h-2 w-2 rounded-full ${dirty ? "bg-amber" : "bg-night-edge"}`} />
          {dirty ? "Unsaved changes" : "All changes saved"}
        </span>
        <button type="button" onClick={onSave} disabled={!dirty || status.kind === "saving"} className={buttonClass.primary}>
          {status.kind === "saving" ? "Saving…" : "Save"}
        </button>
      </div>
    </div>
  );
}
