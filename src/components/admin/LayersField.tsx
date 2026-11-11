"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { ArrowDown, ArrowUp, Plus, Trash2 } from "lucide-react";
import { joinSpec, splitSpec } from "@/lib/tech";
import { buttonClass, inputClass } from "./kit";
import TechPicker from "./TechPicker";

interface Row {
  key: string;
  items: string[];
}

const toRows = (value: Record<string, string>): Row[] => Object.entries(value).map(([key, text]) => ({ key, items: splitSpec(text) }));
// Rows still being filled in (no tech yet) stay on screen but aren't saved.
const toRecord = (rows: Row[]) => Object.fromEntries(rows.filter((row) => row.items.length > 0).map((row) => [row.key, joinSpec(row.items)]));

/**
 * "How it's built" and "Deployment": an ordered list of layers, each a name chosen from a list and
 * the tech in it picked from the catalog. Stored as { Layer: "A, B (note)" } as before.
 */
export default function LayersField({ label, hint, value, layerOptions, techOptions, onChange }: {
  label: string;
  hint?: string;
  value: Record<string, string>;
  layerOptions: string[];
  techOptions: string[];
  onChange: (value: Record<string, string>) => void;
}) {
  const id = useId();
  const [rows, setRows] = useState<Row[]>(() => toRows(value));
  const last = useRef(JSON.stringify(value));

  useEffect(() => {
    const incoming = JSON.stringify(value);
    if (incoming !== last.current) {
      last.current = incoming;
      setRows(toRows(value));
    }
  }, [value]);

  const commit = (next: Row[]) => {
    setRows(next);
    const record = toRecord(next);
    last.current = JSON.stringify(record);
    onChange(record);
  };

  const used = new Set(rows.map((row) => row.key));
  // "File Storage" and an existing "File_Storage" are the same layer; the spelling in use wins.
  const norm = (name: string) => name.toLowerCase().replace(/[_\s-]+/g, "");
  const inUse = new Set(rows.map((row) => norm(row.key)));
  const allLayers = [...rows.map((row) => row.key), ...layerOptions.filter((layer) => !inUse.has(norm(layer)))]
    .filter((layer, i, all) => all.indexOf(layer) === i);
  const nextFree = allLayers.find((layer) => !used.has(layer));

  return (
    <fieldset aria-describedby={hint ? `${id}-hint` : undefined}>
      <legend className="mb-1.5 text-sm font-semibold text-night-text">{label}</legend>
      {rows.length === 0 && <p className="mb-2 text-sm text-night-faint">Nothing added yet.</p>}
      <ol className="grid gap-2">
        {rows.map((row, index) => (
          <li key={`${row.key}-${index}`} className="rounded-xl bg-night-raised p-3">
            <div className="mb-2 flex items-center gap-2">
              <label htmlFor={`${id}-${index}`} className="sr-only">Layer {index + 1}</label>
              <select
                id={`${id}-${index}`}
                value={row.key}
                onChange={(event) => commit(rows.map((current, i) => (i === index ? { ...current, key: event.target.value } : current)))}
                className={`${inputClass} !w-auto min-w-0 flex-1 font-semibold sm:max-w-xs`}
              >
                {allLayers.map((layer) => (
                  <option key={layer} value={layer} disabled={layer !== row.key && used.has(layer)}>
                    {layer.replace(/_/g, " ")}
                  </option>
                ))}
              </select>
              <div className="ml-auto flex items-center">
                <button type="button" className={buttonClass.quiet} disabled={index === 0} aria-label={`Move ${row.key} up`}
                  onClick={() => commit(rows.map((current, i) => (i === index - 1 ? rows[index] : i === index ? rows[index - 1] : current)))}>
                  <ArrowUp className="h-4 w-4" aria-hidden="true" />
                </button>
                <button type="button" className={buttonClass.quiet} disabled={index === rows.length - 1} aria-label={`Move ${row.key} down`}
                  onClick={() => commit(rows.map((current, i) => (i === index + 1 ? rows[index] : i === index ? rows[index + 1] : current)))}>
                  <ArrowDown className="h-4 w-4" aria-hidden="true" />
                </button>
                <button type="button" className={buttonClass.danger} aria-label={`Remove ${row.key}`} onClick={() => commit(rows.filter((_, i) => i !== index))}>
                  <Trash2 className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>
            <TechPicker
              compact
              notes
              label={`${row.key} tech`}
              options={techOptions}
              value={row.items}
              onChange={(items) => commit(rows.map((current, i) => (i === index ? { ...current, items } : current)))}
            />
            {row.items.length === 0 && <p className="mt-1.5 text-xs text-amber">Add at least one, or this layer won&apos;t be saved.</p>}
          </li>
        ))}
      </ol>
      <button type="button" className={`${buttonClass.secondary} mt-2`} disabled={!nextFree} onClick={() => nextFree && commit([...rows, { key: nextFree, items: [] }])}>
        <Plus className="h-4 w-4" aria-hidden="true" /> Add layer
      </button>
      {hint && <p id={`${id}-hint`} className="mt-1.5 text-xs text-night-faint">{hint}</p>}
    </fieldset>
  );
}
