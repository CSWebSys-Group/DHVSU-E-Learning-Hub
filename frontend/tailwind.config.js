import { IconPerspective } from "@tabler/icons-react";
import { keyframes } from "framer-motion";
import { transform } from "typescript";

/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

const CustomStyle = plugin(function ({ addUtilities }) {
  addUtilities({
    ".rotate-y-180": {
      transform: "rotateY(180deg)",
    },
    ".preserve-3d": {
      transformStyle: "preserve-3d",
    },
    ".perspective-1000": {
      perspective: "1000px",
    },
    ".backface-hidden": {
      backfaceVisibility: "hidden",
    },
  });
});

export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      keyframes: {
        "fade-in": {
          "0%": {
            opacity: 0,
          },
          "100%": {
            opacity: 1,
          },
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        brand: {
          100: "#C17171",
          200: "#A94C4C",
          300: "#924444",
          400: "#6D3636",
          500: "#562424",
          DEFAULT: "#701D0B",
        },
        dhvsu: {
          DEFAULT: "#701D0B",
          lighter: "#F2E6E4",
          light: "#8D4A3C",
          black: "#4A403A",
        },
        red: {
          100: "rgb(254, 226, 226)",
          DEFAULT: "#FF7474",
        },
        error: "#b80000",
        blue: "#56B8FF",
        pink: "#EEA8FD",
        orange: "#F9AB72",
        light: {
          100: "#333F4E",
          200: "#A3B2C7",
          300: "#F2F5F9",
          400: "#F2F4F8",
        },
        default: "hsl(var(--default)",
        background: "hsl(var(--background))",
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        form: {
          DEFAULT: "hsl(var(--form-background))",
        },
      },
      boxShadow: {
        "drop-1": "0px 10px 30px 0px rgba(66, 71, 97, 0.1)",
        "drop-2": "0 8px 30px 0 rgba(65, 89, 214, 0.3)",
        "drop-3": "0 8px 30px 0 rgba(65, 89, 214, 0.1)",
      },
      fontFamily: {
        poppins: ["var(--font-poppins)"],
        inter: ["var(--font-inter)"],
        outfit: ["Outfit", "sans-serif"],
      },
      keyframes: {
        "bounce-updown": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        "bounce-updown": "bounce-updown 2s infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), CustomStyle],
};
