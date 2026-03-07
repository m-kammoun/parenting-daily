// @ts-check
/**
 * Use recommended, recommended-type-checked, and strict plus best practice rules.
 */
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import tsEslint from "typescript-eslint";
import eslint from "@eslint/js";
import reactRecommended from "eslint-plugin-react/configs/recommended.js";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import eslintPluginReactHooks from "eslint-plugin-react-hooks";

const tsconfigRootDir = dirname(fileURLToPath(import.meta.url));

export default tsEslint.config({
  files: ["**/*.ts", "**/*.tsx"],
  extends: [
    eslint.configs.recommended,
    reactRecommended,
    ...tsEslint.configs.strictTypeChecked,
    ...tsEslint.configs.stylisticTypeChecked,
    eslintPluginPrettierRecommended,
  ],
  settings: {
    react: {
      version: "detect",
    },
  },
  languageOptions: {
    parserOptions: {
      project: "./tsconfig.json",
      tsconfigRootDir,
    },
  },
  plugins: {
    "react-hooks": eslintPluginReactHooks,
  },
  rules: {
    "react/react-in-jsx-scope": "off",
  },
});
