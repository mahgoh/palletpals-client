import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { gitDescribeSync } from "git-describe";

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    GLOBAL: {
      APP_VERSION: gitDescribeSync().semverString,
      API_URL: process.env.API_URL,
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
