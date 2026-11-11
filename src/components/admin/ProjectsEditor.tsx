"use client";

import React, { useState } from "react";
import { ArrowLeft, ArrowRight, Plus, Star, Trash2 } from "lucide-react";
import type { Project } from "@/lib/schema";
import { buttonClass, Check, ItemCard, ItemTools, ListField, move, newId, PairsField, replaceAt, SaveBar, slugify, TextArea, TextField, useContentEditor } from "./kit";
import { PreviewProvider, UploadButton, usePreviewSrc, useUploads } from "./images";

const blank = (): Project => ({
  id: newId("project"),
  visible: false,
  featured: false,
  slug: "",
  title: "",
  shortDescription: "",
  thumbnail: "",
  liveLink: "",
  githubLink: "",
  techStack: [],
  features: [],
  intro: [],
  note: "",
  technologiesUsed: {},
  deployment: {},
  images: [],
});

function Screens({ project, onChange }: { project: Project; onChange: (patch: Partial<Project>) => void }) {
  const preview = usePreviewSrc();
  const setImages = (images: string[]) =>
    onChange({ images, thumbnail: images.includes(project.thumbnail) ? project.thumbnail : images[0] ?? "" });

  return (
    <fieldset>
      <legend className="mb-2 text-sm font-semibold">Screenshots</legend>
      {project.images.length === 0 && <p className="mb-2 text-sm text-graphite">Add at least one. The first becomes the thumbnail unless you pick another.</p>}
      <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
        {project.images.map((src, index) => {
          const isThumb = src === project.thumbnail;
          return (
            <li key={src} className={`overflow-hidden rounded-xl bg-frame ${isThumb ? "ring-4 ring-indigo" : ""}`}>
              <img src={preview(src)} alt={`Screenshot ${index + 1}`} className="aspect-[16/10] w-full bg-ink object-cover object-left-top" />
              <div className="flex flex-wrap items-center justify-between gap-0.5 p-1">
                <button type="button" className={buttonClass.quiet} disabled={index === 0} onClick={() => setImages(move(project.images, index, index - 1))} aria-label={`Move screenshot ${index + 1} earlier`}>
                  <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                </button>
                <button type="button" className={buttonClass.quiet} aria-pressed={isThumb} onClick={() => onChange({ thumbnail: src })} aria-label={`Use screenshot ${index + 1} as the thumbnail`}>
                  <Star className={`h-4 w-4 ${isThumb ? "fill-current" : ""}`} aria-hidden="true" />
                </button>
                <button type="button" className={buttonClass.quiet} disabled={index === project.images.length - 1} onClick={() => setImages(move(project.images, index, index + 1))} aria-label={`Move screenshot ${index + 1} later`}>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
                <button type="button" className={buttonClass.danger} onClick={() => setImages(project.images.filter((_, i) => i !== index))} aria-label={`Remove screenshot ${index + 1}`}>
                  <Trash2 className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </li>
          );
        })}
      </ul>
      <p className="mt-2 text-xs text-graphite">The starred screenshot is the thumbnail. Images are resized and converted before upload.</p>
    </fieldset>
  );
}

export default function ProjectsEditor({ initial, sha, rawBase }: { initial: Project[]; sha: string; rawBase: string }) {
  const { data, setData, dirty, status, save } = useContentEditor("projects", initial, sha);
  const files = useUploads();
  const [open, setOpen] = useState<string | null>(null);

  const update = (index: number, patch: Partial<Project>) => setData(replaceAt(data, index, { ...data[index], ...patch }));

  return (
    <PreviewProvider rawBase={rawBase} local={files.local}>
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm text-graphite">List order is display order. New projects start hidden until you show them.</p>
        <button type="button" className={buttonClass.primary} onClick={() => { const item = blank(); setData([...data, item]); setOpen(item.id); }}>
          <Plus className="h-4 w-4" aria-hidden="true" /> Add project
        </button>
      </div>

      <ul className="grid gap-3">
        {data.map((project, index) => (
          <ItemCard
            key={project.id}
            title={project.title}
            subtitle={[`/projects/${project.slug || "…"}`, project.featured && "featured", !project.visible && "hidden"].filter(Boolean).join(" · ")}
            muted={!project.visible}
            open={open === project.id}
            onOpen={(next) => setOpen(next ? project.id : null)}
            tools={
              <ItemTools
                name={project.title || "this project"}
                index={index}
                count={data.length}
                onMove={(to) => setData(move(data, index, to))}
                visible={project.visible}
                onToggle={() => update(index, { visible: !project.visible })}
                onDelete={() => setData(data.filter((_, i) => i !== index))}
              />
            }
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <TextField
                label="Title"
                value={project.title}
                required
                onChange={(title) => update(index, { title, ...(project.slug === "" || project.slug === slugify(project.title) ? { slug: slugify(title) } : {}) })}
              />
              <TextField label="Address" hint="Lowercase letters, numbers and dashes" value={project.slug} onChange={(slug) => update(index, { slug: slug.toLowerCase() })} />
              <TextField label="Live link" type="url" value={project.liveLink} onChange={(liveLink) => update(index, { liveLink: liveLink.trim() })} />
              <TextField label="GitHub link" type="url" value={project.githubLink} onChange={(githubLink) => update(index, { githubLink: githubLink.trim() })} />
            </div>
            <Check label="Featured: the Home tile and first in line for a large panel" checked={project.featured} onChange={(featured) => update(index, { featured })} />
            <TextArea label="Short description" value={project.shortDescription} onChange={(shortDescription) => update(index, { shortDescription })} />

            <Screens project={project} onChange={(patch) => update(index, patch)} />
            <UploadButton
              label="Upload screenshots"
              multiple
              onUploaded={(added) => {
                files.add(added);
                const images = [...project.images, ...added.map((upload) => upload.src)];
                update(index, { images, thumbnail: project.thumbnail || images[0] });
              }}
            />

            <ListField label="Tech stack" separator="comma" value={project.techStack} onChange={(techStack) => update(index, { techStack })} />
            <ListField label="Key features" value={project.features} onChange={(features) => update(index, { features })} />
            <ListField label="About (paragraphs)" hint="One paragraph per line" value={project.intro} onChange={(intro) => update(index, { intro })} />
            <TextArea label="Note" value={project.note} onChange={(note) => update(index, { note })} rows={2} />
            <div className="grid gap-4 sm:grid-cols-2">
              <PairsField label="How it's built" value={project.technologiesUsed} onChange={(technologiesUsed) => update(index, { technologiesUsed })} />
              <PairsField label="Deployment" value={project.deployment} onChange={(deployment) => update(index, { deployment })} />
            </div>
          </ItemCard>
        ))}
      </ul>

      <SaveBar
        dirty={dirty}
        status={status}
        onSave={async () => {
          await save(files.uploads.map(({ path, sha: blobSha }) => ({ path, sha: blobSha })));
        }}
      />
    </PreviewProvider>
  );
}
