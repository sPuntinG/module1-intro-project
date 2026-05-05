import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/module1-intro-project/",
  plugins: [react()],
});
