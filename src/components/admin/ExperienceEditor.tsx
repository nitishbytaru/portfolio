"use client";

import React, { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { EXPERIENCE_KINDS, KIND_LABELS, METRIC_ICONS, ROLE_COLORS, type Experience } from "@/lib/schema";
import { rangeLabel } from "@/lib/layout";
import { toneBg } from "@/lib/tones";
import TechPicker from "./TechPicker";
import { buttonClass, Check, ItemCard, ItemTools, ListField, move, newId, replaceAt, SaveBar, Select, TextField, useContentEditor } from "./kit";

const blank = (): Experience => ({
  id: newId("role"),
  visible: true,
  kind: "full_time",
  company: "",
  role: "",
  location: "",
  start: new Date().toISOString().slice(0, 7),
  end: "",
  typeLabel: "",
  summaryLabel: "",
  points: [],
  skills: [],
  metrics: [],
  certificate: "",
  color: "pink",
});

export default function ExperienceEditor({ initial, sha, techOptions }: { initial: Experience[]; sha: string; techOptions: string[] }) {
  const { data, setData, dirty, status, save } = useContentEditor("experience", initial, sha);
  const [open, setOpen] = useState<string | null>(null);

  const update = (index: number, patch: Partial<Experience>) => setData(replaceAt(data, index, { ...data[index], ...patch }));

  return (
    <div>
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm text-night-faint">Top of the list shows first. Newest first works best.</p>
        <button
          type="button"
          className={buttonClass.primary}
          onClick={() => { const item = blank(); setData([item, ...data]); setOpen(item.id); }}
        >
          <Plus className="h-4 w-4" aria-hidden="true" /> Add role
        </button>
      </div>

      <ul className="grid gap-3">
        {data.map((item, index) => (
          <ItemCard
            key={item.id}
            title={item.company}
            tone={item.color}
            subtitle={`${item.role || "Role"} · ${rangeLabel(item.start, item.end)}${item.visible ? "" : " · hidden"}`}
            muted={!item.visible}
            open={open === item.id}
            onOpen={(next) => setOpen(next ? item.id : null)}
            tools={
              <ItemTools
                name={item.company || "this role"}
                index={index}
                count={data.length}
                onMove={(to) => setData(move(data, index, to))}
                visible={item.visible}
                onToggle={() => update(index, { visible: !item.visible })}
                onDelete={() => setData(data.filter((_, i) => i !== index))}
              />
            }
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <TextField label="Company" value={item.company} onChange={(company) => update(index, { company })} required />
              <TextField label="Role" value={item.role} onChange={(role) => update(index, { role })} required />
              <Select label="Kind" value={item.kind} options={EXPERIENCE_KINDS} labels={KIND_LABELS} onChange={(kind) => update(index, { kind })} />
              <TextField label="Location" value={item.location} onChange={(location) => update(index, { location })} />
              <TextField label="Start" type="month" value={item.start} onChange={(start) => update(index, { start })} />
              <div>
                {item.end !== "" && <TextField label="End" type="month" value={item.end} onChange={(end) => update(index, { end })} />}
                <Check
                  label="I currently work here"
                  checked={item.end === ""}
                  onChange={(current) => update(index, { end: current ? "" : new Date().toISOString().slice(0, 7) })}
                />
              </div>
              <TextField label="Type label" hint="e.g. Frontend Engineering" value={item.typeLabel} onChange={(typeLabel) => update(index, { typeLabel })} />
              <TextField label="Summary label" hint="e.g. Mobile Frontend" value={item.summaryLabel} onChange={(summaryLabel) => update(index, { summaryLabel })} />
            </div>

            <ListField label="What I did" hint="One point per line" rows={5} value={item.points} onChange={(points) => update(index, { points })} />
            <TechPicker label="Skills" hint="Shown as chips on the role and highlighted in “What I did”." options={techOptions} value={item.skills} onChange={(skills) => update(index, { skills })} />

            <fieldset>
              <legend className="mb-2 text-sm font-semibold">Stamps</legend>
              <div className="grid gap-2">
                {item.metrics.map((metric, metricIndex) => (
                  <div key={metricIndex} className="grid grid-cols-[minmax(0,1fr)_auto] gap-2 rounded-xl bg-night-raised p-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_10rem_auto] sm:items-end">
                    <TextField label="Label" value={metric.label} onChange={(label) => update(index, { metrics: replaceAt(item.metrics, metricIndex, { ...metric, label }) })} className="max-sm:col-span-2" />
                    <TextField label="Value" value={metric.value} onChange={(value) => update(index, { metrics: replaceAt(item.metrics, metricIndex, { ...metric, value }) })} className="max-sm:col-span-2" />
                    <Select label="Icon" value={metric.icon} options={METRIC_ICONS} onChange={(icon) => update(index, { metrics: replaceAt(item.metrics, metricIndex, { ...metric, icon }) })} />
                    <button type="button" className={buttonClass.danger} aria-label="Remove stamp" onClick={() => update(index, { metrics: item.metrics.filter((_, i) => i !== metricIndex) })}>
                      <Trash2 className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>
                ))}
              </div>
              <button type="button" className={`${buttonClass.secondary} mt-2`} onClick={() => update(index, { metrics: [...item.metrics, { label: "", value: "", icon: "activity" }] })}>
                <Plus className="h-4 w-4" aria-hidden="true" /> Add stamp
              </button>
            </fieldset>

            <TextField
              label="Certificate (Google Drive link)"
              hint="Share as “Anyone with the link”. Leave empty if there isn't one."
              type="url"
              value={item.certificate}
              onChange={(certificate) => update(index, { certificate: certificate.trim() })}
            />

            <fieldset>
              <legend className="mb-2 text-sm font-semibold">Colour</legend>
              <div className="flex flex-wrap gap-2">
                {ROLE_COLORS.map((color) => (
                  <button
                    key={color}
                    type="button"
                    aria-pressed={item.color === color}
                    aria-label={color}
                    onClick={() => update(index, { color })}
                    className={`h-11 w-11 rounded-full ${toneBg(color)} ${item.color === color ? "ring-2 ring-night-text ring-offset-[3px] ring-offset-night-panel" : ""}`}
                  />
                ))}
              </div>
            </fieldset>
          </ItemCard>
        ))}
      </ul>

      <SaveBar dirty={dirty} status={status} onSave={() => save()} />
    </div>
  );
}
