module.exports = {
    parser: '@typescript-eslint/parser', // Specifies the ESLint parser
    parserOptions: {
        ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
        sourceType: 'module', // Allows for the use of imports
        ecmaFeatures: {
            jsx: true, // Allows for the parsing of JSX
        },
    },
    settings: {
        react: {
            version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
        },
    },
    extends: [
        "./packages/eslint-config/",
        "./packages/eslint-config/config/react",
        "./packages/eslint-config/config/typescript"
    ],
    overrides: [
        {
            "files": [
                "src/packages/app/__mocks__/*.js"
            ],
            "rules": {
                "react/no-multi-comp": "off"
            }
        }
    ],
    rules: {
        "@typescript-eslint/explicit-function-return-type": "off"
    }
};