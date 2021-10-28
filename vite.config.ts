import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";
// import typescript from "rollup-plugin-typescript2";
import typescript from "@rollup/plugin-typescript";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],

  build: {
    // Instruct Vite to bundle this project as a library
    lib: {
      entry: "src/index.tsx",
      name: "animated-dark-mode-toggle",
      formats: ["cjs", "es"],
      fileName: (format) => `index.${format}.js`,
    },

    rollupOptions: {
      // Don't bundle react or react-dom
      external: ["react", "react-dom"],

      output: {
        globals: {
          // Globally define React for UMD builds
          react: "React",
        },
      },

      plugins: [
        typescript({
          // Ensure declaration files are outputted to our dist directory
          tsconfig: "./tsconfig.lib.json",
        }),
      ],
    },
  },
});
