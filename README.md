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

The codebase is organized logically to promote reusability and separation of concerns using the Next.js App Router:

- `src/app/`: The Next.js App Router containing route definitions, pages, layouts, and providers.
  - `src/app/page.tsx`: Main dashboard and portfolio landing page.
  - `src/app/projects/[slug]/`: Dynamic project detail routing.
  - `src/app/globals.css`: Global styles, theme tokens, and custom scrollbars.
- `src/components/`: Modular UI components:
  - `layout/`: Global templates like `Navbar.tsx`, `Footer.tsx`, and `ProjectLayout.tsx`.
  - `sections/`: Distinct page sections (e.g. `Experience`, `Projects`, `GitHubAnalytics`).
  - `ui/`: Lower-level reusable items (e.g. `GlassCard`, `Pill`, `FloatingBadge`).
- `src/context/`: React Context providers for global theme/color-palette management.
- `src/hooks/`: Custom React hooks for interactive scroll reveal and 3D tilts.
- `src/data/`: Static typed data definitions (e.g. project details, skills).
- `src/utils/`: Helper and utility functions (e.g. GitHub API interaction).

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
