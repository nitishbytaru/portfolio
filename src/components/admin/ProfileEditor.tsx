"use client";

import React from "react";
import { Plus } from "lucide-react";
import { SOCIAL_ICONS, type Profile } from "@/lib/schema";
import { buttonClass, ItemTools, move, newId, replaceAt, SaveBar, Select, TextArea, TextField, useContentEditor } from "./kit";
import { PreviewProvider, UploadButton, usePreviewSrc, useUploads } from "./images";

function Portrait({ src }: { src: string }) {
  const preview = usePreviewSrc();
  return <img src={preview(src)} alt="Current portrait" className="h-32 w-28 rounded-b-full bg-pink object-cover object-top" />;
}

export default function ProfileEditor({ initial, sha, rawBase }: { initial: Profile; sha: string; rawBase: string }) {
  const { data, setData, dirty, status, save } = useContentEditor("profile", initial, sha);
  const files = useUploads();
  const set = (patch: Partial<Profile>) => setData({ ...data, ...patch });

  return (
    <PreviewProvider rawBase={rawBase} local={files.local}>
      <section className="grid gap-4 rounded-[20px] bg-white p-4 sm:p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <TextField label="Name" value={data.name} onChange={(name) => set({ name })} required />
          <TextField label="Headline" value={data.headline} onChange={(headline) => set({ headline })} required />
          <TextField label="Email" type="email" value={data.email} onChange={(email) => set({ email: email.trim() })} />
          <TextField label="GitHub username" hint="Used by the GitHub Stats page" value={data.githubUsername} onChange={(githubUsername) => set({ githubUsername: githubUsername.trim() })} />
        </div>
        <TextArea label="Bio" value={data.bio} onChange={(bio) => set({ bio })} rows={4} />

        <div className="flex flex-wrap items-end gap-4">
          <Portrait src={data.portrait} />
          <div>
            <p className="mb-2 text-sm font-semibold">Portrait</p>
            <p className="mb-2 max-w-sm text-xs text-graphite">A cut-out on a transparent background looks best. It's resized and converted before upload.</p>
            <UploadButton
              label="Replace portrait"
              onUploaded={(added) => {
                files.add(added);
                if (added[0]) set({ portrait: added[0].src });
              }}
            />
          </div>
        </div>
      </section>

      <section className="mt-4 grid gap-4 rounded-[20px] bg-white p-4 sm:p-6">
        <h2 className="wide text-xl font-extrabold">Search and sharing</h2>
        <TextField label="Page title" value={data.seo.title} onChange={(title) => set({ seo: { ...data.seo, title } })} />
        <TextArea label="Description" value={data.seo.description} onChange={(description) => set({ seo: { ...data.seo, description } })} rows={2} />
      </section>

      <section className="mt-4 rounded-[20px] bg-white p-4 sm:p-6">
        <h2 className="wide mb-3 text-xl font-extrabold">Footer links</h2>
        <ul className="grid gap-2">
          {data.socials.map((social, index) => (
            <li key={social.id} className="grid gap-2 rounded-xl bg-frame p-2 sm:grid-cols-[10rem_minmax(0,1fr)_minmax(0,2fr)_auto] sm:items-end">
              <Select label="Icon" value={social.icon} options={SOCIAL_ICONS} onChange={(icon) => set({ socials: replaceAt(data.socials, index, { ...social, icon }) })} />
              <TextField label="Label" value={social.label} onChange={(label) => set({ socials: replaceAt(data.socials, index, { ...social, label }) })} />
              <TextField label="Link" hint="https:// or mailto:" value={social.href} onChange={(href) => set({ socials: replaceAt(data.socials, index, { ...social, href: href.trim() }) })} />
              <ItemTools
                name={social.label || "this link"}
                index={index}
                count={data.socials.length}
                onMove={(to) => set({ socials: move(data.socials, index, to) })}
                onDelete={() => set({ socials: data.socials.filter((_, i) => i !== index) })}
              />
            </li>
          ))}
        </ul>
        <button type="button" className={`${buttonClass.secondary} mt-2`} onClick={() => set({ socials: [...data.socials, { id: newId("link"), label: "", href: "https://", icon: "globe" }] })}>
          <Plus className="h-4 w-4" aria-hidden="true" /> Add link
        </button>
      </section>

      <SaveBar dirty={dirty} status={status} onSave={() => save(files.uploads.map(({ path, sha: blobSha }) => ({ path, sha: blobSha })))} />
    </PreviewProvider>
  );
}
