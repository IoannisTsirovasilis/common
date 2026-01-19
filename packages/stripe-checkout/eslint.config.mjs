import lintReact from "@fistware/lint-react";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    extends: [lintReact],
  },
]);
