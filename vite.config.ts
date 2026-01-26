import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import tsconfigPaths from "vite-tsconfig-paths";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  base: "/silk4me/",

  plugins: [
    tsconfigPaths(), // ✅ ОБЯЗАТЕЛЬНО первым
    react(),
    mode === "development" && componentTagger(),
  ].filter(Boolean),

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },

  server: {
    port: 8080,
    host: true,
    hmr: {
      overlay: false,
    },
  },
}));

