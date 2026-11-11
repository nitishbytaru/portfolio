/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        page: "#E1E1E1",
        frame: "#F6F6F6",
        ink: "#000000",
        periwinkle: "#7D82D0",
        pink: "#F0ADFF",
        mint: "#A7D8D6",
        violet: "#8D6FBD",
        amber: "#FEC067",
        graphite: "#595959",
        indigo: "#2E2A5C",
        iris: "#5459AE",
        apricot: "#FFB54D",
        ghgreen: "#238636",
        ghblack: "#0D1117",
        "indigo-soft": "#4A4690",
        // Admin only: the board at night.
        night: {
          DEFAULT: "#0E0E11",
          panel: "#16161B",
          raised: "#1D1D23",
          line: "#2A2A31",
          edge: "#3A3A44",
          text: "#EDEDF0",
          muted: "#A3A3AD",
          faint: "#8E8E98",
        },
        "periwinkle-light": "#A9ADF0",
      },
      fontFamily: {
        sans: ["var(--font-archivo)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
