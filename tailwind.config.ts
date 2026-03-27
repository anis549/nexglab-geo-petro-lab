import type { Config } from "tailwindcss"
import tailwindcssAnimate from "tailwindcss-animate"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
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
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "#f6f8fb", // Clean scientific background
        foreground: "#1a1a1a", // Dark text for contrast
        primary: {
          DEFAULT: "#0b3d91", // Professional blue
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#e2e8f0", // Light gray
          foreground: "#1a1a1a",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "#f1f5f9", // Soft muted background
          foreground: "#64748b", // Muted text
        },
        accent: {
          DEFAULT: "#2fa4ff", // Bright accent blue
          foreground: "#ffffff",
        },
        card: {
          DEFAULT: "#ffffff", // Clean white cards
          foreground: "#1a1a1a",
        },
        highlight: "#f4c24b",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xl: "1.5rem",
        "2xl": "2rem",
      },
      boxShadow: {
        "glow-primary": "var(--glow-primary)",
        "glow-xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25), var(--glow-primary)",
        glass: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
      },
      animation: {
        "pulse-glow": "pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float-in": "float-in 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
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
        "pulse-glow": {
          "0%, 100%": { boxShadow: "var(--glow-primary)" },
          "50%": { boxShadow: "var(--glow-primary), 0 0 40px rgba(47,164,255,0.6)" },
        },
        "float-in": {
          "0%": { opacity: 0, transform: "translateY(20px) scale(0.95)" },
          "100%": { opacity: 1, transform: "translateY(0) scale(1)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pulse-glow": "pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float-in": "float-in 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
      },
      keyframes: {
        "pulse-glow": {
          "0%, 100%": { boxShadow: "var(--glow-primary)" },
          "50%": { boxShadow: "var(--glow-primary), 0 0 40px rgba(47,164,255,0.6)" },
        },
        "float-in": {
          "0%": { opacity: 0, transform: "translateY(20px) scale(0.95)" },
          "100%": { opacity: 1, transform: "translateY(0) scale(1)" },
        },
      },
    },
  },
  plugins: [tailwindcssAnimate],
};

export default config
