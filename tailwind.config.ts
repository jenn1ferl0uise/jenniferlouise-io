import type { Config } from "tailwindcss";
import animate from "tw-animate-css";

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx,js,jsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [animate],
};

export default config;