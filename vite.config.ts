import typescript from "@rollup/plugin-typescript";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

import pkg from "./package.json";

const externals = Object.keys(pkg.peerDependencies);

export default defineConfig({
  plugins: [react(), cssInjectedByJsPlugin({ topExecutionPriority: false })],
  build: {
    lib: {
      entry: "src/index.tsx",
      formats: ["cjs", "es"],
      fileName: (format) => `index.${format}.js`,
    },

    rollupOptions: {
      // Don't bundle react or react-dom
      external: externals,

      plugins: [
        // Write the types to our dist directory
        typescript({ tsconfig: "./tsconfig.lib.json" }),
      ],
    },
  },
});
