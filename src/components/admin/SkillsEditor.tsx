"use client";

import React, { useState } from "react";
import { Plus } from "lucide-react";
import { GROUP_COLORS, type Skill, type SkillGroup } from "@/lib/schema";
import { toneBg } from "@/lib/tones";
import IconPicker from "./IconPicker";
import { buttonClass, Check, ItemCard, ItemTools, ListField, move, newId, replaceAt, SaveBar, TextField, useContentEditor } from "./kit";

const blankSkill = (): Skill => ({ id: newId("skill"), visible: true, featured: true, name: "", aliases: [], icon: "" });
const blankGroup = (): SkillGroup => ({ id: newId("group"), visible: true, title: "", color: "mint", leadIcon: "", skills: [] });

function SkillRow({ skill, index, count, onChange, onMove, onDelete }: {
  skill: Skill; index: number; count: number; onChange: (patch: Partial<Skill>) => void; onMove: (to: number) => void; onDelete: () => void;
}) {
  return (
    <li className={`rounded-xl bg-night-raised p-3 ${skill.visible ? "" : "opacity-70"}`}>
      <div className="grid items-start gap-x-3 gap-y-3 sm:grid-cols-2">
        <TextField label="Name" value={skill.name} onChange={(name) => onChange({ name, ...(skill.aliases.length === 0 || skill.aliases[0] === skill.name.toLowerCase() ? { aliases: name ? [name.toLowerCase()] : [] } : {}) })} />
        <ListField label="Also matches" hint="Project tech names, for “Used in N projects”" separator="comma" value={skill.aliases} onChange={(aliases) => onChange({ aliases: aliases.map((alias) => alias.toLowerCase()) })} />
        <div className="sm:col-span-2">
          <IconPicker label="Icon" name={skill.name} value={skill.icon || undefined} onChange={(icon) => onChange({ icon })} />
        </div>
      </div>
      <div className="mt-1 flex flex-wrap items-center justify-between gap-2">
        <Check label="Show on Home" checked={skill.featured} onChange={(featured) => onChange({ featured })} />
        <ItemTools name={skill.name || "this skill"} index={index} count={count} onMove={onMove} visible={skill.visible} onToggle={() => onChange({ visible: !skill.visible })} onDelete={onDelete} />
      </div>
    </li>
  );
}

export default function SkillsEditor({ initial, sha }: { initial: SkillGroup[]; sha: string }) {
  const { data, setData, dirty, status, save } = useContentEditor("skills", initial, sha);
  const [open, setOpen] = useState<string | null>(null);

  const update = (index: number, patch: Partial<SkillGroup>) => setData(replaceAt(data, index, { ...data[index], ...patch }));

  return (
    <div>
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm text-night-faint">Each group is one card on the Skills page. The grid adjusts to how many there are.</p>
        <button type="button" className={buttonClass.primary} onClick={() => { const group = blankGroup(); setData([...data, group]); setOpen(group.id); }}>
          <Plus className="h-4 w-4" aria-hidden="true" /> Add group
        </button>
      </div>

      <ul className="grid gap-3">
        {data.map((group, index) => (
          <ItemCard
            key={group.id}
            title={group.title}
            tone={group.color}
            subtitle={`${group.skills.length} skills${group.visible ? "" : " · hidden"}`}
            muted={!group.visible}
            open={open === group.id}
            onOpen={(next) => setOpen(next ? group.id : null)}
            tools={
              <ItemTools
                name={group.title || "this group"}
                index={index}
                count={data.length}
                onMove={(to) => setData(move(data, index, to))}
                visible={group.visible}
                onToggle={() => update(index, { visible: !group.visible })}
                onDelete={() => setData(data.filter((_, i) => i !== index))}
              />
            }
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <TextField label="Title" value={group.title} onChange={(title) => update(index, { title })} />
              <IconPicker
                label="Large background icon"
                name={group.leadIcon}
                initialQuery={group.title}
                value={group.leadIcon || undefined}
                allowAuto={false}
                onChange={(leadIcon) => update(index, { leadIcon: leadIcon ?? group.leadIcon })}
              />
            </div>

            <fieldset>
              <legend className="mb-2 text-sm font-semibold">Colour</legend>
              <div className="flex flex-wrap gap-2">
                {GROUP_COLORS.map((color) => (
                  <button
                    key={color}
                    type="button"
                    aria-pressed={group.color === color}
                    aria-label={color}
                    onClick={() => update(index, { color })}
                    className={`h-11 w-11 rounded-full ${toneBg(color)} ${group.color === color ? "ring-2 ring-night-text ring-offset-[3px] ring-offset-night-panel" : ""}`}
                  />
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend className="mb-2 text-sm font-semibold">Skills</legend>
              <ul className="grid gap-2">
                {group.skills.map((skill, skillIndex) => (
                  <SkillRow
                    key={skill.id}
                    skill={skill}
                    index={skillIndex}
                    count={group.skills.length}
                    onChange={(patch) => update(index, { skills: replaceAt(group.skills, skillIndex, { ...skill, ...patch }) })}
                    onMove={(to) => update(index, { skills: move(group.skills, skillIndex, to) })}
                    onDelete={() => update(index, { skills: group.skills.filter((_, i) => i !== skillIndex) })}
                  />
                ))}
              </ul>
              <button type="button" className={`${buttonClass.secondary} mt-2`} onClick={() => update(index, { skills: [...group.skills, blankSkill()] })}>
                <Plus className="h-4 w-4" aria-hidden="true" /> Add skill
              </button>
            </fieldset>
          </ItemCard>
        ))}
      </ul>

      <SaveBar dirty={dirty} status={status} onSave={() => save()} />
    </div>
  );
}
