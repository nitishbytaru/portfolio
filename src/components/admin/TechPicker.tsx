"use client";

import React, { useId, useMemo, useRef, useState } from "react";
import { ArrowLeft, MessageSquareText, Search, X } from "lucide-react";
import { TechIcon } from "@/components/ui/TechIcon";
import { techName, techNote, withNote } from "@/lib/tech";

/**
 * Pick technologies from a fixed list, so names stay consistent and typos can't reach the site.
 * Typing only filters; a value is added by choosing it. New names are added on the Skills page.
 */
export default function TechPicker({ label, hint, value, options, onChange, notes = false, compact = false }: {
  label: string;
  hint?: string;
  value: string[];
  options: string[];
  onChange: (value: string[]) => void;
  /** Each chip may carry a short note, stored as "Name (note)". */
  notes?: boolean;
  /** Hide the visible label (it stays for screen readers). */
  compact?: boolean;
}) {
  const id = useId();
  const listId = `${id}-list`;
  const input = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [editing, setEditing] = useState<number | null>(null);

  const chosen = useMemo(() => new Set(value.map((item) => techName(item).toLowerCase())), [value]);
  const known = useMemo(() => new Set(options.map((option) => option.toLowerCase())), [options]);
  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    return options
      .filter((option) => !chosen.has(option.toLowerCase()))
      .filter((option) => !q || option.toLowerCase().includes(q))
      .sort((a, b) => Number(!a.toLowerCase().startsWith(q)) - Number(!b.toLowerCase().startsWith(q)));
  }, [options, chosen, query]);

  const add = (option: string) => {
    onChange([...value, option]);
    setQuery("");
    setActive(0);
    input.current?.focus();
  };

  const remove = (index: number) => onChange(value.filter((_, i) => i !== index));
  const toFront = (index: number) => onChange([value[index], ...value.filter((_, i) => i !== index)]);
  const setNote = (index: number, note: string) => onChange(value.map((item, i) => (i === index ? withNote(techName(item), note) : item)));

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setOpen(true);
      setActive((current) => Math.min(current + 1, Math.max(matches.length - 1, 0)));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((current) => Math.max(current - 1, 0));
    } else if (event.key === "Enter") {
      // Never submits free text: Enter only picks the highlighted option.
      event.preventDefault();
      if (open && matches[active]) add(matches[active]);
    } else if (event.key === "Escape") {
      setOpen(false);
    } else if (event.key === "Backspace" && query === "" && value.length > 0) {
      remove(value.length - 1);
    }
  };

  const showList = open && (matches.length > 0 || query.trim() !== "");

  return (
    <div>
      <label htmlFor={id} className={compact ? "sr-only" : "mb-1.5 block text-sm font-semibold text-night-text"}>{label}</label>

      {value.length > 0 && (
        <ul aria-label={`Selected ${label.toLowerCase()}`} className="mb-2 flex flex-wrap gap-1.5">
          {value.map((item, index) => {
            const name = techName(item);
            const note = techNote(item);
            const isKnown = known.has(name.toLowerCase());
            if (editing === index) {
              return (
                <li key={`${item}-${index}`} className="inline-flex min-h-9 items-center gap-1.5 rounded-full border border-periwinkle-light bg-night-raised py-0.5 pl-3 pr-1 text-sm font-semibold text-night-text">
                  {name}
                  <input
                    autoFocus
                    defaultValue={note}
                    aria-label={`Note for ${name}`}
                    placeholder="note, e.g. for user data"
                    maxLength={80}
                    onBlur={(event) => { setNote(index, event.target.value); setEditing(null); }}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") { event.preventDefault(); event.currentTarget.blur(); }
                      if (event.key === "Escape") setEditing(null);
                    }}
                    className="h-8 w-44 rounded-full bg-night px-3 text-sm font-medium text-night-text"
                  />
                </li>
              );
            }
            return (
              <li
                key={`${item}-${index}`}
                className={`inline-flex min-h-9 items-center gap-1.5 rounded-full border py-0.5 pl-1 pr-0.5 text-sm font-semibold ${
                  isKnown ? "border-night-edge bg-night-raised text-night-text" : "border-amber/50 bg-amber/10 text-amber"
                }`}
                title={isKnown ? undefined : "Not on the Skills page. Remove it, or add it there."}
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-ink">
                  <TechIcon name={name} sizeClassName="h-4 w-4" />
                </span>
                {name}
                {note && <span className="font-medium text-night-faint">({note})</span>}
                {notes && (
                  <button type="button" onClick={() => setEditing(index)} aria-label={note ? `Edit note for ${name}` : `Add a note to ${name}`} title={note ? "Edit note" : "Add a note"} className="flex h-8 w-8 items-center justify-center rounded-full text-night-faint hover:bg-white/10 hover:text-night-text">
                    <MessageSquareText className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>
                )}
                {index > 0 && (
                  <button type="button" onClick={() => toFront(index)} aria-label={`Move ${name} to the front`} title="Move to the front (its icon leads)" className="flex h-8 w-8 items-center justify-center rounded-full text-night-faint hover:bg-white/10 hover:text-night-text">
                    <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>
                )}
                <button type="button" onClick={() => remove(index)} aria-label={`Remove ${name}`} className="flex h-8 w-8 items-center justify-center rounded-full text-night-faint hover:bg-white/10 hover:text-night-text">
                  <X className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              </li>
            );
          })}
        </ul>
      )}

      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-night-faint" aria-hidden="true" />
        <input
          ref={input}
          id={id}
          role="combobox"
          aria-expanded={showList}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={showList && matches[active] ? `${listId}-${active}` : undefined}
          autoComplete="off"
          value={query}
          placeholder="Search to add…"
          onChange={(event) => { setQuery(event.target.value); setOpen(true); setActive(0); }}
          onFocus={() => setOpen(true)}
          onBlur={() => setOpen(false)}
          onKeyDown={onKeyDown}
          className="block min-h-11 w-full rounded-xl border border-night-edge bg-night py-2 pl-9 pr-3 text-base text-night-text transition-colors duration-150 hover:border-[#4a4a55] focus:border-periwinkle-light"
        />
        {showList && (
          <ul
            id={listId}
            role="listbox"
            aria-label={label}
            className="absolute left-0 right-0 top-full z-30 mt-1.5 max-h-64 overflow-auto rounded-xl border border-night-edge bg-night-panel p-1 shadow-[0_18px_36px_-12px_rgb(0_0_0/0.7)]"
          >
            {matches.map((option, index) => (
              <li
                key={option}
                id={`${listId}-${index}`}
                role="option"
                aria-selected={index === active}
                // Keep focus in the input so the list doesn't close before the click lands.
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => add(option)}
                onMouseEnter={() => setActive(index)}
                className={`flex min-h-11 cursor-pointer items-center gap-2.5 rounded-lg px-2 text-sm font-semibold ${index === active ? "bg-white/10 text-night-text" : "text-night-muted"}`}
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-ink">
                  <TechIcon name={option} sizeClassName="h-4 w-4" />
                </span>
                {option}
              </li>
            ))}
            {matches.length === 0 && (
              <li className="px-3 py-2.5 text-sm text-night-muted">
                No match for &ldquo;{query.trim()}&rdquo;. Add it on the{" "}
                <a href="/admin/skills" target="_blank" rel="noopener noreferrer" onMouseDown={(event) => event.preventDefault()} className="font-semibold text-periwinkle-light underline underline-offset-4">
                  Skills page
                </a>{" "}
                (it can stay hidden), then reload here.
              </li>
            )}
          </ul>
        )}
      </div>
      {hint && <p className="mt-1.5 text-xs text-night-faint">{hint}</p>}
    </div>
  );
}
