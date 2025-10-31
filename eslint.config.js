import js from "@eslint/js";
import globals from "globals";

export default [
    js.configs.recommended,
    {
        languageOptions: {
            ecmaVersion: 2018,
            sourceType: "module",
            globals: {
                ...globals.browser,
                chrome: "readonly",
                Atomics: "readonly",
                SharedArrayBuffer: "readonly",
            }
        },
        rules: {
            "no-undef": "off"
        }
    }
];
