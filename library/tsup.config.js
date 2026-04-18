import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.js"],
  format: ["esm", "cjs"],
  dts: false,
  clean: true,
  external: ["react"],
});
