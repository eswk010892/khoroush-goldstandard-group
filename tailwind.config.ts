// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0A0A0A", // premium near-black
        gold: "#D4AF37", // primary gold
        goldSoft: "#8E7B2D", // muted gold for borders/dividers
      },
      boxShadow: {
        gold: "0 0 24px 0 rgba(212,175,55,.22)", // soft gold glow
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(95deg,#D4AF37 0%,#F1D37A 25%,#D4AF37 50%,#B7942D 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
