# Personal Portfolio Website

This repository contains the source code for my personal portfolio website, designed to showcase my projects, skills, and professional experience.

## 🚀 Technical Stack

This project is built using modern web technologies to ensure high performance, responsiveness, and maintainability.

### Core Technologies
- **[React 19](https://react.dev/)**: Frontend library for building the user interface.
- **[Vite](https://vitejs.dev/)**: Next-generation frontend tooling for fast development and optimized builds.
- **[React Router DOM v7](https://reactrouter.com/)**: Handling client-side routing for seamless navigation.

### Styling & UI
- **[Tailwind CSS v3](https://tailwindcss.com/)**: Utility-first CSS framework for rapid and responsive UI development.
- **[Lucide React](https://lucide.dev/)**: Beautiful, consistent icon library.
- **[Swiper](https://swiperjs.com/)**: Modern touch slider for creating interactive carousels.
- **[tailwindcss-animate](https://github.com/jamiebuilds/tailwindcss-animate)**: Tailwind plugin for crafting smooth animations.

### Linting & Code Quality
- **ESLint**: Configured with React-specific plugins to maintain code quality and consistency.

### Deployment
- **Vercel**: The project includes a `vercel.json` configuration for seamless deployment and hosting on the Vercel platform.

## 📂 Project Structure

The codebase is organized logically to promote reusability and separation of concerns:

- `src/components/`: Reusable, modular UI components used across the application.
- `src/pages/`: Top-level page components corresponding to different routes.
- `src/context/`: React Context providers for global state management.
- `src/hooks/`: Custom React hooks for shared logic.
- `src/data/`: Static data definitions (e.g., project details, skills).
- `src/utils/`: Helper and utility functions.
- `src/index.css`: Global styles and Tailwind configuration directives.

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

4. Open your browser and navigate to the local URL provided by Vite (usually `http://localhost:5173`).

### Building for Production

To create a production-ready build:
```bash
npm run build
```
This will generate optimized assets in the `dist` directory. You can preview the production build locally using `npm run preview`.
