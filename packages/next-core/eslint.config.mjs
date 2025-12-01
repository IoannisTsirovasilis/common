import lintNext from "@fistware/lint-next";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    extends: [lintNext],
    rules: {
      "@next/next/no-html-link-for-pages": "off",
    },
  },
]);
