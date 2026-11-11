# Personal Portfolio Website

This repository contains the source code for my personal portfolio website, designed to showcase my projects, skills, and professional experience.

## 🚀 Technical Stack

This project is built using modern web technologies to ensure high performance, responsiveness, and maintainability.

### Core Technologies
- **[Next.js 16 / React 19](https://nextjs.org/)**: React framework using the App Router for server-side rendering, static site generation, and optimized performance.
- **[TypeScript](https://www.typescriptlang.org/)**: Strict type safety across components, layouts, routing params, and utilities.

### Styling & UI
- **[Tailwind CSS v3](https://tailwindcss.com/)**: Utility-first CSS framework for rapid and responsive UI development.
- **[shadcn/ui](https://ui.shadcn.com/)**: High-quality, accessible component library.
- **[Lucide React](https://lucide.dev/)**: Beautiful, consistent icon library.
- **[Swiper](https://swiperjs.com/)**: Modern touch slider for creating interactive carousels.
- **[tailwindcss-animate](https://github.com/jamiebuilds/tailwindcss-animate)**: Tailwind plugin for crafting smooth animations.
- **[tw-animate-css](https://github.com/Wombosvideo/tw-animate-css)**: Modern Tailwind replacement for CSS animation utilities.

### Deployment
- **Vercel**: Optimized deployment configuration and static asset generation for hosting on the Vercel platform.

## 📂 Project Structure

- `content/`: **All site content** as JSON: `profile`, `experience`, `projects`, `skills`, `resume`. Order in a file is display order. Edited from `/admin` or by hand.
- `public/uploads/`: Images uploaded from the admin. Other screenshots live in per-project folders in `public/`.
- `src/app/(site)/`: Public pages (Home, Experience, Projects, Skills, GitHub Stats). The route group keeps URLs unchanged.
- `src/app/admin/`: The private admin area. `src/app/api/` holds sign-in and image upload routes.
- `src/proxy.ts`: Redirects anyone not signed in as the owner away from `/admin`.
- `src/lib/schema.ts`: The `zod` schema for every content file, shared by the build and the admin.
- `src/lib/content.ts`: Reads and validates `content/` at build time and drops hidden items.
- `src/lib/layout.ts`: Layouts calculated from data (experience ruler, skill grid, labels).
- `src/lib/server/`: Server-only code: sessions, GitHub commits, upload checks.
- `src/components/board/`: Public UI. Components receive content as props.
- `src/components/admin/`: The admin editors.

## 💻 Getting Started

Follow these steps to run the project locally.

### Prerequisites
- Node.js (v18 or higher recommended)
- npm

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000`.

### Building for Production

To create an optimized production build:
```bash
npm run build
```
This will compile the TypeScript code, generate static paths for your dynamic project routes, and output optimized server assets in the `.next` directory.

To run the production build locally:
```bash
npm run start
```

## ✏️ Editing Content

Sign in at `/admin` with GitHub. Each save is **one commit** to this repo (`content: update …`), and Vercel redeploys the site, usually within a minute or two. Admin always reads the latest content from GitHub, so it's correct while a deploy is running.

- **Hide** keeps an item saved but off the public site. **Delete** removes it from the file (it stays in Git history).
- **Resume and certificates** stay in Google Drive: share the PDF as "Anyone with the link" and paste the link. Share `https://<site>/resume` with recruiters: it always redirects to the active resume.
- **Images** are resized and converted to WebP in the browser, then committed to `public/uploads/` with the save.
- **Featured project**: the first featured project is the Home tile. Featured projects come first in the large panels on `/projects` (up to six); the rest go into a compact list.
- Every content file is validated during the build. If a bad edit ever got through, the build fails and the live site stays on its last good version.

The repo is public, so everything in `content/` and `public/uploads/` is visible, including hidden items and old resume links. To fully withdraw an old resume or certificate, delete it or turn off sharing in Google Drive.

> The admin commits to this repo, so run `git pull` before working on the code.

### Undo a change

Open the commit on GitHub (the admin's Overview lists recent ones), or run `git revert <sha>` and push. The site redeploys with the previous content.

## 🔐 Admin Setup

1. **OAuth app** (GitHub → Settings → Developer settings → OAuth Apps): set the callback URL to `https://<your-domain>/api/auth/callback`. Each app allows one callback, so create a second app for local work with `http://localhost:3000/api/auth/callback`.
2. **Content token**: a *fine-grained* personal access token, limited to this one repository, with only **Contents: Read and write**. Set an expiry and put a reminder in your calendar.
3. **Your GitHub user id**: `https://api.github.com/users/<username>` → `id`. The numeric id is used because usernames can change hands. Keep two-factor authentication on for this account.
4. Set these as **server** environment variables on Vercel (never prefixed `NEXT_PUBLIC_`). See `.env.example`.

| Variable | Value |
| --- | --- |
| `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET` | From the OAuth app |
| `GITHUB_CONTENT_TOKEN` | The fine-grained token |
| `GITHUB_REPO` | `owner/name` of this repo |
| `CONTENT_BRANCH` | Branch admin writes to (default `main`). Use a test branch locally so local saves never touch production. |
| `ADMIN_GITHUB_ID` | Your numeric GitHub user id |
| `SESSION_SECRET` | At least 32 random characters: `openssl rand -base64 48` |

### Rotate the content token

1. Create a new fine-grained token with the same settings.
2. Replace `GITHUB_CONTENT_TOKEN` on Vercel and redeploy.
3. Delete the old token on GitHub.

If the token expires, saves show an error and the public site is unaffected. To sign everyone out (for example after a lost device), change `SESSION_SECRET` and redeploy.

### Testing

Set `CONTENT_DIR=<folder>` to build the site from another set of content files, e.g. a fixture with many projects or an invalid file:
```bash
CONTENT_DIR=/path/to/fixture npm run build
```
