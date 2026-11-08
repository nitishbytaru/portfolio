/** @type {import('tailwindcss').Config} */ export default {
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "color-mix(in srgb, var(--border) calc(<alpha-value> * 100%), transparent)",
        input: "color-mix(in srgb, var(--border) calc(<alpha-value> * 100%), transparent)",
        ring: "color-mix(in srgb, var(--primary) calc(<alpha-value> * 100%), transparent)",
        background: "color-mix(in srgb, var(--bg) calc(<alpha-value> * 100%), transparent)",
        foreground: "color-mix(in srgb, var(--text) calc(<alpha-value> * 100%), transparent)",
        primary: {
          DEFAULT: "color-mix(in srgb, var(--primary) calc(<alpha-value> * 100%), transparent)",
          hover: "color-mix(in srgb, var(--primary-hover) calc(<alpha-value> * 100%), transparent)",
          foreground: "color-mix(in srgb, var(--bg) calc(<alpha-value> * 100%), transparent)",
        },
        secondary: {
          DEFAULT: "color-mix(in srgb, var(--secondary) calc(<alpha-value> * 100%), transparent)",
          foreground: "color-mix(in srgb, var(--text) calc(<alpha-value> * 100%), transparent)",
        },
        surface: {
          DEFAULT: "color-mix(in srgb, var(--surface) calc(<alpha-value> * 100%), transparent)",
          elevated: "color-mix(in srgb, var(--surface-elevated) calc(<alpha-value> * 100%), transparent)",
        },
        text: {
          DEFAULT: "color-mix(in srgb, var(--text) calc(<alpha-value> * 100%), transparent)",
          secondary: "color-mix(in srgb, var(--text-secondary) calc(<alpha-value> * 100%), transparent)",
          muted: "color-mix(in srgb, var(--muted-text) calc(<alpha-value> * 100%), transparent)",
        },
        portfolio: {
          primary: "color-mix(in srgb, var(--primary) calc(<alpha-value> * 100%), transparent)",
          secondary: "color-mix(in srgb, var(--secondary) calc(<alpha-value> * 100%), transparent)",
          accent: "color-mix(in srgb, var(--primary) calc(<alpha-value> * 100%), transparent)",
          light: "color-mix(in srgb, var(--secondary) calc(<alpha-value> * 100%), transparent)",
          dark: "color-mix(in srgb, var(--bg) calc(<alpha-value> * 100%), transparent)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in-down": {
          "0%": { opacity: "0", transform: "translateY(-20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "pulse-slow": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.8" },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "gradient-x": {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
        },
        // --- NEW ANIMATIONS ---
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(40px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in-left": {
          "0%": { opacity: "0", transform: "translateX(-40px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "slide-in-right": {
          "0%": { opacity: "0", transform: "translateX(40px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.85)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        shimmer: {
          "0%": { "background-position": "-200% 0" },
          "100%": { "background-position": "200% 0" },
        },
        "glow-pulse": {
          "0%, 100%": {
            "box-shadow":
              "0 0 20px rgba(161,161,170,0.15), 0 0 60px rgba(161,161,170,0.05)",
          },
          "50%": {
            "box-shadow":
              "0 0 30px rgba(161,161,170,0.3), 0 0 80px rgba(161,161,170,0.1)",
          },
        },
        "text-gradient": {
          "0%, 100%": { "background-position": "0% 50%" },
          "50%": { "background-position": "100% 50%" },
        },
        "draw-line": {
          "0%": { "stroke-dashoffset": "1000", opacity: "0" },
          "10%": { opacity: "1" },
          "100%": { "stroke-dashoffset": "0", opacity: "1" },
        },
        typewriter: {
          "0%": { width: "0" },
          "100%": { width: "100%" },
        },
        "blink-caret": {
          "0%, 100%": { "border-color": "transparent" },
          "50%": { "border-color": "currentColor" },
        },
        "bounce-subtle": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-4px)" },
        },
        ripple: {
          "0%": { transform: "scale(0)", opacity: "0.5" },
          "100%": { transform: "scale(4)", opacity: "0" },
        },
        "heart-beat": {
          "0%, 100%": { transform: "scale(1)" },
          "25%": { transform: "scale(1.2)" },
          "50%": { transform: "scale(1)" },
          "75%": { transform: "scale(1.1)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in-down": "fade-in-down 0.5s ease-out",
        "fade-in-up": "fade-in-up 0.5s ease-out",
        "fade-in": "fade-in 0.5s ease-out",
        float: "float 3s ease-in-out infinite",
        "pulse-slow": "pulse-slow 3s ease-in-out infinite",
        "spin-slow": "spin-slow 10s linear infinite",
        "gradient-x": "gradient-x 5s ease infinite",
        // --- NEW ---
        "slide-up": "slide-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) both",
        "slide-in-left":
          "slide-in-left 0.6s cubic-bezier(0.16, 1, 0.3, 1) both",
        "slide-in-right":
          "slide-in-right 0.6s cubic-bezier(0.16, 1, 0.3, 1) both",
        "scale-in": "scale-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) both",
        shimmer: "shimmer 2s linear infinite",
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
        "text-gradient": "text-gradient 4s ease infinite",
        typewriter: "typewriter 2s steps(26) 0.5s both",
        "blink-caret": "blink-caret 0.75s step-end infinite",
        "bounce-subtle": "bounce-subtle 2s ease-in-out infinite",
        ripple: "ripple 0.6s linear",
        "heart-beat": "heart-beat 1.2s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
