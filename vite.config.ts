import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const base = process.env.VITE_BASE_SERVER_URL || '';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  base,
});
