import typescript from "@rollup/plugin-typescript";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  build: {
    lib: {
      entry: "src/index.tsx",
      formats: ["cjs", "es"],
      fileName: (format) => `index.${format}.js`,
    },

    rollupOptions: {
      // Don't bundle react or react-dom
      external: ["react", "react-dom"],

      plugins: [
        // Write the types to our dist directory
        typescript({ tsconfig: "./tsconfig.lib.json" }),
      ],
    },
  },
});
