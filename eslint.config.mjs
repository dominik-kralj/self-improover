import js from "@eslint/js";
import tseslint from "typescript-eslint";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import prettierConfig from "eslint-config-prettier";

const frontendFiles = ["frontend/**/*.{ts,tsx}"];

export default tseslint.config(
  { ignores: ["**/dist/**", "**/node_modules/**"] },

  js.configs.recommended,

  ...tseslint.configs.recommended,

  {
    files: ["**/*.{ts,tsx}"],
    rules: {
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
      "no-unused-vars": "off",
    },
  },

  {
    files: frontendFiles,
    plugins: {
      ...reactPlugin.configs.flat.recommended.plugins,
      ...reactHooksPlugin.configs.flat["recommended-latest"].plugins,
    },
    rules: {
      ...reactPlugin.configs.flat.recommended.rules,
      "react/react-in-jsx-scope": "off",
      ...reactHooksPlugin.configs.flat["recommended-latest"].rules,
    },
    settings: {
      react: { version: "detect" },
    },
  },

  prettierConfig
);
