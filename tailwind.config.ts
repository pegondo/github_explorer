import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        typography: "var(--color-typography)",
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        buttons: "var(--buttons)",
        navbar: "var(--navbar)",
      },
      keyframes: {
        "fade-in": {
          "0%": {
            opacity: "0",
          },
          "100%": {
            opacity: "1",
          },
        },
      },
      animation: {
        fadein: "fade-in 1s ease-in-out 0s 1",
      },
    },
  },
  plugins: [],
};
export default config;
