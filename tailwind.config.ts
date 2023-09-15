import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        green: {
          "50": "#f0fdf4",
          "100": "#dcfce6",
          "200": "#baf8ce",
          "300": "#85f0a8",
          "400": "#48e07b",
          "500": "#20c758",
          "600": "#14a143",
          "700": "#148139",
          "800": "#156631",
          "900": "#13542b",
          "950": "#052e15",
        },
        crema: {
          "50": "#fdfaed",
          "100": "#f8efcd",
          "200": "#f3e5ab",
          "300": "#e8ca61",
          "400": "#e3b53c",
          "500": "#db9825",
          "600": "#c1761e",
          "700": "#a1571c",
          "800": "#83451d",
          "900": "#6c381b",
          "950": "#3e1c0a",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      screens: {
        xs: "480px",
        ss: "620px",
        sm: "768px",
        md: "1060px",
        lg: "1200px",
      },
    },
  },
  plugins: [require("tailwindcss-animated")],
};
export default config;
