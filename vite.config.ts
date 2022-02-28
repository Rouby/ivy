import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig((cfg) => ({
  plugins: [
    react({
      jsxImportSource: "theme-ui",
    }),
  ],
  base: process.env.BASE,
}));
