import lintTs from "@fistware/lint-ts";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    extends: [lintTs],
  },
]);
