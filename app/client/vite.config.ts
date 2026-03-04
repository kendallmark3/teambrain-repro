import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

/**
 * Proxy /api → server in dev so the browser never sees cross-origin requests.
 * This avoids configuring permissive CORS headers and mirrors the production
 * pattern where a reverse proxy routes /api to the backend.
 */
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3001",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
