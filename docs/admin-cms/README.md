# Plan: Make the Portfolio Editable From a Private Admin Page

**Status:** approved direction (GitHub as storage), nothing built yet

## The goal

Add a job, internship, project or skill, or replace the resume, from a web page only I can sign in to. The public site updates by itself, with no code editing on my side. The site must also stay tidy as the content grows.

## Summary of the approach

Next.js does all the application work. It can't store the data by itself, because files written while a site runs on Vercel aren't kept. So the content is saved to this GitHub repo, which needs no new service.

| Need | Solution |
| --- | --- |
| Content lives outside the code | JSON files in `content/` in this repo |
| Resume and certificates (PDFs) | Google Drive links that I paste in; PDFs are never uploaded to the site |
| Screenshots, thumbnails, portrait | Image files committed to `public/uploads/` |
| Only I can edit | **GitHub sign-in**, locked to my one account |
| Web-based editing | A private `/admin` area in this same Next.js app |
| Changes go live | Each save is a commit, and Vercel redeploys, usually within a minute or two |
| History and undo | Built in through Git history |
| No clutter as it grows | Layouts calculated from the data, plus "featured" and "hidden" controls |

```text
Me ─ GitHub sign-in ─> /admin ─ save ─> Next.js server ─ commit ─> GitHub repo
                                                                       │
                                                       Vercel redeploys│
                                                                       ▼
Visitors ─────────────────────────────────────────> public pages (static, fast)
```

## What has to change in today's code

Moving the data out of the components isn't enough. Parts of the UI assume today's exact content, and some would crash on new data.

| Where | Today | What happens as content grows | Fix |
| --- | --- | --- | --- |
| `src/components/board/ExperienceBoard.tsx:40` and `src/data/site.ts:16` | Experience is stored twice, in different shapes | The two lists drift apart | One `experience.json` |
| `ExperienceBoard.tsx:109` `SPANS` | Timeline position is hardcoded per company name | **A third company crashes the page**, because its lookup is undefined. A second stint at one company collides | Calculate position from dates and key by id |
| `ExperienceBoard.tsx:104` `MONTHS`, `yearOf` | Ruler is fixed to Jul 2025 to May 2026 | Later roles fall off the ruler | Build the ruler from the real date range |
| `ExperienceBoard.tsx:31`, `:37` | Dates are display text, and metric icons are React components | Can't be sorted or stored | Store real dates and icon names |
| `ExperienceBoard.tsx:120` `KEYWORDS` | Highlight list is hand-written | New skills aren't highlighted | Build it from the skills data |
| `src/app/page.tsx:14` | Featured project is found with `slug === "echorealm"!` | **Deleting or renaming it crashes Home** | `featured` flag with a safe fallback |
| `src/app/page.tsx` count, stack and timeline | Everything is labelled "Internships" | Wrong once I have a full-time job | Label by type: "Experience" once jobs exist |
| `src/app/page.tsx:97` | Draws an avatar for every project | Overflows the tile | Show the first few, then "+N" |
| `src/components/board/SkillsBoard.tsx:22`, `:27` | Groups and hand-set grid spans sit inside the component | A sixth group breaks the grid | Store groups, calculate spans |
| `SkillsBoard.tsx` `GHOST_STYLE` | Styling is tied to group titles | Renaming a group loses its styling | Tie styling to the group's stored colour |
| `src/components/board/ProjectsBoard.tsx` | Expanding panels, one per project | Too narrow at about 10 or more | Featured panels plus a compact "all projects" list |
| `src/components/ui/TechIcon.tsx` | Icons come from a `switch` on tech name | New skills get a generic icon | Keep the map, add an optional icon slug per skill |
| `src/components/board/AboutCard.tsx`, `BoardFooter.tsx` | Name, bio, email and socials are in JSX | Needs a code change | `profile.json` |
| `site.ts:1`, `AboutCard.tsx:10`, `ExperienceBoard.tsx:40` | Resume and certificate Drive links are hardcoded | A new link needs a code change | Keep Google Drive and the existing thumbnail logic, but store the links in content files |
| `src/app/layout.tsx` | Side nav and footer wrap every page | They would also appear on `/admin` | Move public pages into an `(site)` route group; URLs don't change |
| Board components (`"use client"`) | Import data files directly | Hard to swap data sources, and hidden items could reach the browser | Server pages load visible content and pass it as props |
| `vercel.json` | Catch-all rewrite to `/index.html`, left over from before Next.js | May interfere with `/admin` and new routes | Remove it and confirm on a preview deploy |

## Content files

Order in a file is display order. Every list item also has a stable `id` and a `visible` flag.

| File | Main fields |
| --- | --- |
| `content/profile.json` | name, headline, bio, email, socials, portrait, SEO text, GitHub username |
| `content/experience.json` | **kind** (`internship`, `full_time`, `contract`, `freelance`), company, role, location, `start` and `end` as `YYYY-MM` (empty `end` means "Present"), type label, summary label, points, skills, metrics, certificate Drive link, colour |
| `content/projects.json` | slug, title, short description, thumbnail, live link, GitHub link, tech stack, features, intro, note, technologies, deployment, images, `featured` |
| `content/skills.json` | groups (title, colour, lead icon), each with skills (name, aliases, icon slug, `featured`) |
| `content/resume.json` | versions (Drive link, label, date added) and the active version's id |

Counts such as "5 Projects" and "2 Internships" are calculated, never stored.

Every file is checked against a `zod` schema during the build. If a bad edit ever got through, the build would fail and the live site would stay on its last good version.

## The private admin area

| Page | What I can do |
| --- | --- |
| `/admin/login` | Sign in with GitHub |
| `/admin` | See counts and recent content changes |
| `/admin/experience` | Add, edit, delete, reorder, hide; paste a certificate Drive link; tick "currently working here" |
| `/admin/projects` | The same, plus upload and order screenshots, choose the thumbnail, mark as featured |
| `/admin/skills` | Manage groups and skills, set icons, see a preview of each icon |
| `/admin/resume` | Paste a new Drive link, see past links, choose the active one |
| `/admin/profile` | Edit bio, headline, contact details, portrait |

Forms must work on a phone. Delete asks for confirmation. **Hide** keeps an item saved but off the public site, which is the normal way to retire old content.

After a save, admin shows "Saved. Live in a minute or two." Admin always reads the latest content from GitHub, so it's correct even while the public site is still redeploying.

### How a save works

1. The server action checks that I'm the owner and validates the data.
2. It fetches the current file from GitHub, so a save based on stale data is detected rather than overwriting newer content.
3. It makes **one commit per save**, even when a save touches several files, so each save causes one redeploy. Commit messages look like `content: update experience`.

### Image uploads

Only images are uploaded. Vercel limits a server request to about 4.5 MB, so:

- The browser resizes images and converts them to WebP before upload.
- Each file is sent in its own request, then all of them are included in the single commit.

### Resume and certificate links

PDFs stay in my Google Drive, and the site only stores their links.

1. I upload the PDF to Drive myself and set sharing to "Anyone with the link".
2. I paste the link at `/admin/resume`, or on the experience entry for a certificate.
3. The server checks that it's a Drive file link (`https://drive.google.com/file/d/<id>/...`) and rejects anything else.
4. The preview image comes from Drive's thumbnail using that file ID, as it does today. If Drive can't provide one, the site's existing fallback card appears.
5. For a resume, the new link becomes the active version.
6. The site's resume buttons point to a stable address, **`/resume`**, which redirects to the active Drive link.

A `/resume` link I send to a recruiter keeps working when I change the Drive file, and always opens the latest version after the redeploy.

## How "only me" is enforced

A hidden URL isn't security, so `/admin` can be publicly known and still be safe.

1. **Sign-in:** a GitHub OAuth app, with a `state` check against forged logins. Access is granted only if the numeric GitHub user ID matches `ADMIN_GITHUB_ID`. The ID is used instead of the username because usernames can change hands. My GitHub account must have two-factor authentication on.
2. **Session:** a signed, `httpOnly`, `Secure`, `SameSite=Lax` cookie that expires after 7 days.
3. **Page gate:** `proxy.ts` redirects anyone who isn't signed in as me away from `/admin`.
4. **Every save and upload:** each server action and route checks the session again. The page gate alone isn't relied on.
5. **The write token:** a fine-grained GitHub token limited to this one repo with only Contents read and write. It exists only as a server environment variable and is never sent to the browser or placed in a `NEXT_PUBLIC_` variable.

Other safeguards:

- All input is validated on the server, and links must be `https:` or `mailto:`.
- Uploads are limited by type and size. SVG uploads aren't allowed.
- File names are generated by the server, so uploads can't write to arbitrary repo paths.
- `/admin` is marked `noindex`.

### What this approach exposes

This repo is public, and I've accepted that. Everything in `content/` and `public/uploads/` can be seen by anyone, including hidden items and old resume links. Deleting something later doesn't remove it from Git history.

To fully withdraw an old resume or certificate, I can delete it or turn off sharing in Google Drive, which stops the old link working.

## Reliability

- Public pages are static, so they stay as fast as today and depend on nothing at runtime.
- **Undo:** any change can be reverted from the repo's commit history on GitHub.
- **Failed saves:** if the token expires or GitHub is down, admin shows an error and the public site is unaffected. The token's expiry date needs a calendar reminder.
- **Local work:** the admin commits to the repo too, so I run `git pull` before working on the code.
- **Testing:** `CONTENT_BRANCH` sets which branch admin writes to, so local testing never touches production content. Local sign-in uses a second OAuth app, because each app allows one callback URL.

## Keeping the site uncluttered

| Section | Rule |
| --- | --- |
| Home, experience | Latest 3 roles, then "+N more" (already partly built); label follows the role types |
| Experience page | Ruler fits any range and switches from months to years past about 24 months; overlapping roles are supported |
| Older roles | Stay visible until I hide them myself; there are no automatic rules |
| Home, projects | One featured project; avatars capped, then "+N" |
| Projects page | Featured projects get the rich panels; the rest go in a compact list |
| Skills | Grid adapts to the number of groups; Home shows only `featured` skills |

The site's design doesn't change. With today's data, every public page should look the same as it does now.

## Execution phases

Each phase can ship by itself, and the site keeps working throughout.

### Phase 0: Prepare (no visible change)

- Remove the `vercel.json` rewrite.
- Move public routes into `src/app/(site)/`.

**Done when:** every current URL works on a Vercel preview.

### Phase 1: Make the UI data-driven (still using today's data files)

- Merge experience into one list with real dates and a `kind`.
- Calculate the ruler, colours, skill grid spans and keywords.
- Add `featured`, caps and "+N".
- Pass data into components as props.

**Done when:** adding a test third job, sixth skill group and fifteenth project to local data causes no crash or overflow at desktop or phone width, and the real data looks unchanged.

This is the most important phase, and it's worth doing even if the admin area came later.

### Phase 2: Move content into JSON

- Create `content/*.json` from the current data.
- Add `zod` schemas and a typed read layer (`src/lib/content.ts`) that filters out hidden items.
- Switch public pages to it, then delete the content from `src/data/`.

**Done when:** the site renders entirely from `content/` and looks the same, a hidden test item doesn't appear in the built output, and a deliberately invalid file fails the build.

### Phase 3: Lock the door

- Create the OAuth apps and the fine-grained token.
- Add sign-in, sessions, `proxy.ts` and the admin shell.

**Done when:** all of the checks below pass.

| Attempt | Expected result |
| --- | --- |
| Open `/admin` signed out | Redirected to login |
| Sign in with a different GitHub account | Refused |
| Call a save action or upload route without a session | Rejected |
| Send a tampered session cookie | Rejected |
| Search `.next/static` for the token and secrets | Not found |

### Phase 4: Editors

- Build the GitHub commit helper, tested against a test branch.
- Build the image upload route and the browser image resizing.
- Build the editors in this order, because the most frequent updates come first:
  1. Resume, with the `/resume` redirect
  2. Experience
  3. Projects
  4. Skills
  5. Profile

Each needs validation and clear error messages.

**Done when:** I can do a full cycle on production for each type: add, see it live after the redeploy, edit, hide, delete.

### Phase 5: Finish

- Update the main `README.md`, including how to undo a change and rotate the token.
- Run `/security-review` before the final deploy.

**Done when:** I've added a real entry and replaced the resume from my phone with no code change.

## Alternatives considered

| Option | Why not |
| --- | --- |
| Save files directly on the Vercel server | Not possible: anything written while the site runs isn't kept |
| Supabase (database and file storage) | Updates in seconds, but adds a service, inactivity pausing and manual backups. It's the fallback if a minute or two ever becomes too slow |
| Vercel Blob or a Vercel-hosted database | Stays near the hosting, but still adds a data store and loses Git history |
| Headless CMS (Sanity, Contentful) | Fast to start, but the editor is generic and adds an outside service |
| Separate backend (Express + MongoDB) | Another service to host and secure, with no benefit here |

## Decisions made

1. **Repo visibility:** the repo is public, and that's acceptable for the content and images stored in it.
2. **PDFs:** the resume and certificates are never uploaded directly. They stay in Google Drive, and I only provide the links.
3. **Older experience:** all roles stay visible until I hide them manually.

## New dependencies

- `zod` for validation
- `jose` for signing the session cookie

Environment variables: `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`, `GITHUB_CONTENT_TOKEN`, `GITHUB_REPO`, `CONTENT_BRANCH`, `ADMIN_GITHUB_ID`, `SESSION_SECRET`.
