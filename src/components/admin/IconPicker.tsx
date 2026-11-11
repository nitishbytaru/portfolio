"use client";

import React, { useEffect, useId, useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { iconUrl, TechIcon } from "@/components/ui/TechIcon";
import { buttonClass } from "./kit";

interface IconOption {
  ref: string;
  label: string;
  source: "Devicon" | "Simple Icons";
  /** Lowercase words to search. */
  terms: string[];
}

const DEVICON_INDEX = "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/devicon.json";
const SIMPLE_INDEX = "https://cdn.jsdelivr.net/npm/simple-icons@13.21.0/_data/simple-icons.json";

// Simple Icons derives slugs from titles: ".NET" -> "dotnet", "C++" -> "cplusplus".
const SLUG_SWAPS: Record<string, string> = { "+": "plus", ".": "dot", "&": "and", "đ": "d", "ħ": "h", "ı": "i", "ĸ": "k", "ŀ": "l", "ł": "l", "ß": "ss", "ŧ": "t", "ø": "o" };
const titleToSlug = (title: string) =>
  title.toLowerCase().replace(/[+.&đħıĸŀłßŧø]/g, (char) => SLUG_SWAPS[char]).normalize("NFD").replace(/[^a-z0-9]/g, "");

const PREFERRED = ["original", "plain", "original-wordmark", "plain-wordmark", "line"];

// Loaded once per page, only when a picker opens.
let catalog: Promise<IconOption[]> | null = null;
const loadCatalog = () =>
  (catalog ??= Promise.all([
    fetch(DEVICON_INDEX).then((response) => response.json()) as Promise<{ name: string; altnames?: string[]; versions: { svg: string[] } }[]>,
    fetch(SIMPLE_INDEX).then((response) => response.json()) as Promise<{ icons?: unknown[] } | { title: string; slug?: string; aliases?: { aka?: string[] } }[]>,
  ])
    .then(([devicons, simple]) => {
      const fromDevicon: IconOption[] = devicons.flatMap((icon) => {
        const style = PREFERRED.find((variant) => icon.versions.svg.includes(variant)) ?? icon.versions.svg[0];
        return style ? [{ ref: `devicon:${icon.name}/${style}`, label: icon.name, source: "Devicon" as const, terms: [icon.name, ...(icon.altnames ?? [])].map((term) => term.toLowerCase()) }] : [];
      });
      const list = (Array.isArray(simple) ? simple : (simple.icons as { title: string; slug?: string; aliases?: { aka?: string[] } }[])) ?? [];
      const fromSimple: IconOption[] = list.map((icon) => {
        const slug = icon.slug ?? titleToSlug(icon.title);
        return { ref: `si:${slug}`, label: icon.title, source: "Simple Icons" as const, terms: [icon.title, slug, ...(icon.aliases?.aka ?? [])].map((term) => term.toLowerCase()) };
      });
      return [...fromDevicon, ...fromSimple];
    })
    .catch((error) => {
      catalog = null;
      throw error;
    }));

const score = (option: IconOption, query: string) => {
  const compact = query.replace(/[^a-z0-9]/g, "");
  if (option.terms.some((term) => term === query || term.replace(/[^a-z0-9]/g, "") === compact)) return 0;
  if (option.terms.some((term) => term.startsWith(query))) return 1;
  if (option.terms.some((term) => term.includes(query) || (compact && term.replace(/[^a-z0-9]/g, "").includes(compact)))) return 2;
  return -1;
};

const describe = (ref: string | undefined) => {
  if (!ref) return "Automatic";
  const devicon = ref.match(/^devicon:([a-z0-9]+)\/([a-z0-9-]+)$/);
  if (devicon) return `${devicon[1]} · Devicon`;
  const simple = ref.match(/^si:([a-z0-9]+)$/);
  if (simple) return `${simple[1]} · Simple Icons`;
  return ref;
};

/**
 * Choose a logo by searching Devicon (full colour) and Simple Icons (brand marks). With `allowAuto`,
 * the icon can go back to the one found from the skill's name.
 */
export default function IconPicker({ label, name, value, onChange, allowAuto = true, initialQuery }: {
  label: string;
  /** First search when the picker opens; defaults to `name`. */
  initialQuery?: string;
  /** The skill name, used for the automatic icon and as the first search. */
  name: string;
  value: string | undefined;
  onChange: (value: string | undefined) => void;
  allowAuto?: boolean;
}) {
  const id = useId();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [source, setSource] = useState<"All" | "Devicon" | "Simple Icons">("All");
  const [options, setOptions] = useState<IconOption[] | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!open || options) return;
    loadCatalog().then(setOptions, () => setFailed(true));
  }, [open, options]);

  const results = useMemo(() => {
    if (!options) return [];
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return options
      .filter((option) => source === "All" || option.source === source)
      .map((option) => ({ option, rank: score(option, q) }))
      .filter((entry) => entry.rank >= 0)
      .sort((a, b) => a.rank - b.rank || Number(a.option.source !== "Devicon") - Number(b.option.source !== "Devicon") || a.option.label.localeCompare(b.option.label))
      .slice(0, 48)
      .map((entry) => entry.option);
  }, [options, query, source]);

  const toggle = () => {
    if (!open) setQuery((initialQuery ?? name).trim());
    setOpen(!open);
  };

  return (
    <div className="min-w-0">
      <span id={`${id}-label`} className="mb-1.5 block text-sm font-semibold text-night-text">{label}</span>
      <div className="flex items-center gap-2">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-ink">
          <TechIcon name={name} icon={value} sizeClassName="h-6 w-6" />
        </span>
        <button type="button" onClick={toggle} aria-expanded={open} aria-controls={`${id}-panel`} aria-describedby={`${id}-label`} className={`${buttonClass.secondary} min-w-0 flex-1 !justify-between !px-3 text-sm`}>
          <span className="truncate">{describe(value)}</span>
          <span className="shrink-0 text-night-faint">{open ? "Close" : "Change"}</span>
        </button>
      </div>

      {open && (
        <div id={`${id}-panel`} className="mt-2 rounded-xl border border-night-edge bg-night p-3">
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative min-w-[12rem] flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-night-faint" aria-hidden="true" />
              <input
                autoFocus
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={(event) => { if (event.key === "Escape") setOpen(false); if (event.key === "Enter") event.preventDefault(); }}
                placeholder="Search logos, e.g. docker"
                aria-label="Search logos"
                className="block min-h-11 w-full rounded-xl border border-night-edge bg-night-panel py-2 pl-9 pr-3 text-base text-night-text focus:border-periwinkle-light"
              />
            </div>
            <div role="group" aria-label="Logo source" className="flex rounded-full border border-night-edge p-0.5">
              {(["All", "Devicon", "Simple Icons"] as const).map((option) => (
                <button
                  key={option}
                  type="button"
                  aria-pressed={source === option}
                  onClick={() => setSource(option)}
                  className={`min-h-10 rounded-full px-3 text-xs font-semibold transition-colors duration-150 ${source === option ? "bg-periwinkle text-ink" : "text-night-muted hover:text-night-text"}`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-3" aria-live="polite">
            {failed ? (
              <p className="text-sm text-red-300">Couldn&apos;t load the logo list. Check your connection and open the picker again.</p>
            ) : !options ? (
              <ul aria-label="Loading logos" className="grid grid-cols-[repeat(auto-fill,minmax(5.5rem,1fr))] gap-2">
                {Array.from({ length: 12 }, (_, index) => <li key={index} className="h-[5.5rem] animate-pulse rounded-xl bg-night-raised motion-reduce:animate-none" />)}
              </ul>
            ) : query.trim() === "" ? (
              <p className="text-sm text-night-faint">Type a name to search {options.length.toLocaleString("en")} logos.</p>
            ) : results.length === 0 ? (
              <p className="text-sm text-night-faint">No logo matches &ldquo;{query.trim()}&rdquo;. Try a shorter or different name.</p>
            ) : (
              <ul className="grid max-h-80 grid-cols-[repeat(auto-fill,minmax(5.5rem,1fr))] gap-2 overflow-auto pr-1">
                {results.map((option) => {
                  const selected = option.ref === value;
                  return (
                    <li key={option.ref}>
                      <button
                        type="button"
                        aria-pressed={selected}
                        title={`${option.label} (${option.source})`}
                        onClick={() => { onChange(option.ref); setOpen(false); }}
                        className={`flex h-[5.5rem] w-full flex-col items-center justify-center gap-1.5 rounded-xl border px-1 text-center transition-colors duration-150 ${
                          selected ? "border-periwinkle-light bg-periwinkle/15" : "border-night-line bg-night-panel hover:border-night-edge hover:bg-night-raised"
                        }`}
                      >
                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white">
                          <img src={iconUrl(option.ref) ?? ""} alt="" loading="lazy" className="h-6 w-6 object-contain" />
                        </span>
                        <span className="w-full truncate text-xs font-semibold text-night-text">{option.label}</span>
                        <span className="text-[11px] font-medium text-night-faint">{option.source === "Devicon" ? "Colour" : "Brand"}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-night-line pt-3">
            <p className="text-xs text-night-faint">Logos from Devicon and Simple Icons. The change shows on the site after you save.</p>
            {allowAuto && value && (
              <button type="button" className={buttonClass.quiet} onClick={() => { onChange(undefined); setOpen(false); }}>
                <X className="h-4 w-4" aria-hidden="true" /> Use automatic icon
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

