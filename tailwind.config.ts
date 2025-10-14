import type { Config } from "tailwindcss"

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
        background: "#f4f1ea", // Beige roche
        foreground: "#2e2e2e", // Noir basaltes
        primary: {
          DEFAULT: "#a94442", // Rouge ferrugineux
          foreground: "#f4f1ea", // Beige roche
        },
        secondary: {
          DEFAULT: "#d6d3ce", // Gris clair stratifié
          foreground: "#2e2e2e", // Noir basaltes
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "#d6d3ce", // Gris clair stratifié
          foreground: "#2e2e2e", // Noir basaltes
        },
        accent: {
          DEFAULT: "#f1e7c8", // Sable doux / jaune pâle
          foreground: "#2e2e2e", // Noir basaltes
        },
        popover: {
          DEFAULT: "#f4f1ea", // Beige roche
          foreground: "#2e2e2e", // Noir basaltes
        },
        card: {
          DEFAULT: "#f4f1ea", // Beige roche
          foreground: "#2e2e2e", // Noir basaltes
        },
        // Couleurs géologiques supplémentaires
        geology: {
          strata: "#d4b48c", // Strates rocheuses
          quartz: "#e5e1df", // Quartz clair
          iron: "#a13c2f", // Fer oxydé (argile rouge)
          basalt: "#2e2e2e", // Basalte
          limestone: "#f5f5f2", // Calcaire
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
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
