module.exports = {
    env: {
        browser: false,
        es6: true,
        jest: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:jest/recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    globals: {
        given: true,
        then: true,
        when: true,
        device: true,
        element: true,
        by: true,
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
            tsx: true,
        },
        ecmaVersion: 2018,
        sourceType: 'module',
    },
    plugins: ['chai-expect', 'jest', 'mocha', 'prettier', '@typescript-eslint'],
    rules: {
        '@typescript-eslint/no-explicit-any': 'error',
        'no-unused-vars': 'off',
        '@typescript-eslint/camelcase': 'off',
        '@typescript-eslint/member-delimiter-style': 'off',
        '@typescript-eslint/no-unused-vars': ['error'],
    },
}
