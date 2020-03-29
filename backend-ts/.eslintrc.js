module.exports = {
  env: {
    es6: true,
    node: true
  },
  extends: ["standard", "prettier/@typescript-eslint"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module"
  },
  plugins: ["@typescript-eslint"],
  rules: {
    semi: ["error", "always"] // needed the rule about semi-colum
  }
};
