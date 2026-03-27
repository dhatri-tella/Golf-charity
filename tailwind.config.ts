import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./index.html",
  ],
  theme: {
    extend: {
      colors: {
        forest: "#0B1F14",
        pine: "#132A1C",
        leaf: "#1C4228",
        turf: "#2A6040",
        chalk: "#F2EDE4",
        ash: "#8A9E90",
        signal: "#E8381A",
        gold: "#C9A84C",
        goldLight: "#E8C97A",
      },
      fontFamily: {
        display: ["'Cormorant Garamond'", "serif"],
        sans: ["'Cabinet Grotesk'", "sans-serif"],
      },
      animation: {
        shimmer: "shimmer 5s linear infinite",
        float: "floatY 4s ease-in-out infinite",
        "pulse-red": "pulseRed 2.5s ease-in-out infinite",
        heartbeat: "heartbeat 2s ease-in-out infinite",
        "slide-up": "slideUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) both",
        "line-grow": "lineGrow 1s ease-out forwards",
      },
      keyframes: {
        shimmer: {
          "0%": { "background-position": "-600px 0" },
          "100%": { "background-position": "600px 0" },
        },
        floatY: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-14px)" },
        },
        pulseRed: {
          "0%, 100%": { "box-shadow": "0 0 0 0 rgba(232, 56, 26, 0.5)" },
          "50%": { "box-shadow": "0 0 0 16px rgba(232, 56, 26, 0)" },
        },
        heartbeat: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.06)" },
        },
        slideUp: {
          from: { opacity: "0", transform: "translateY(50px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        lineGrow: {
          from: { transform: "scaleX(0)" },
          to: { transform: "scaleX(1)" },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;

