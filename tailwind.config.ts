import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        terracotta: "#C1502E",
        sage: "#7D9B76",
        golden: "#E8B84B",
        "dusty-blue": "#6B8FA3",
        cream: "#FAF3E0",
        charcoal: "#3D3D3D",
      },
    },
  },
  plugins: [],
};
export default config;
