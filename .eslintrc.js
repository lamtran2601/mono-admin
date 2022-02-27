export default {
  root: true,
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: { project: ["./tsconfig.json"] },
  plugins: ["@typescript-eslint", "react"],
  rules: {
    quotes: "single",
  },
};
