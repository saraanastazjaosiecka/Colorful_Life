import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  //opening server in a specific browser -> also needs setting environment variable "BROWSER" wirh specific value (for example "chrome") in .env file;
  server: {
    open: true,
  },
});
