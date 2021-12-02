module.exports = {
    env: {
        browser: false,
        es6: true,
        jest: true,
    },
    extends: ['eslint:recommended', 'plugin:jest/recommended'],
    globals: {
        given: true,
        then: true,
        when: true,
        device: true,
        element: true,
        by: true,
    },
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
    },
    plugins: ['sort-keys-fix', 'chai-expect', 'jest', 'mocha', 'prettier', 'eslint-plugin-import-helpers'],
    rules: {
        'array-bracket-spacing': ['error', 'never'],
        'array-callback-return': 'error',
        'arrow-body-style': ['error', 'as-needed'],
        'arrow-spacing': 'error',
        'arrow-parens': ['error', 'as-needed'],
        'block-scoped-var': 'error',
        'block-spacing': 'error',
        'brace-style': 'error',
        'comma-dangle': ['error', 'always-multiline'],
        'comma-spacing': [
            'error',
            {
                after: true,
                before: false,
            },
        ],
        complexity: ['error', 20],
        curly: 'error',
        'default-case': 'error',
        'eol-last': ['error', 'always'],
        eqeqeq: ['error', 'always'],
        'func-call-spacing': ['error', 'never'],
        'generator-star-spacing': [
            'error',
            {
                before: false,
                after: true,
            },
        ],
        indent: [
            'error',
            4,
            {
                SwitchCase: 1,
            },
        ],
        'init-declarations': 'off',
        'jest/no-jasmine-globals': 'off',
        'key-spacing': [
            'error',
            {
                afterColon: true,
                beforeColon: false,
            },
        ],
        'keyword-spacing': 'error',
        'lines-between-class-members': [
            'error',
            'always',
            {
                exceptAfterSingleLine: true,
            },
        ],
        'max-classes-per-file': ['error', 1],
        'max-depth': ['error', 3],
        'max-len': [
            'error',
            {
                code: 135,
            },
        ],
        'max-params': ['error', 5],
        'new-parens': 'error',
        'no-alert': 'error',
        'no-array-constructor': 'error',
        'no-await-in-loop': 'error',
        'no-caller': 'error',
        'no-console': [
            'error',
            {
                allow: ['error', 'debug'],
            },
        ],
        'no-dupe-keys': 'error',
        'no-div-regex': 'error',
        'no-duplicate-imports': 'error',
        'no-else-return': 'error',
        'no-empty-function': 'off',
        'no-eq-null': 'error',
        'no-eval': 'error',
        'no-extend-native': 'off',
        'no-extra-bind': 'error',
        'no-floating-decimal': 'error',
        'no-implied-eval': 'error',
        'no-labels': 'error',
        'no-label-var': 'error',
        'no-loop-func': 'error',
        'no-mixed-spaces-and-tabs': 'error',
        'no-multi-assign': 'error',
        'no-multi-spaces': 'error',
        'no-multi-str': 'error',
        'no-multiple-empty-lines': [
            'error',
            {
                max: 1,
            },
        ],
        'no-new': 'error',
        'no-new-func': 'error',
        'no-new-object': 'error',
        'no-new-wrappers': 'error',
        'no-proto': 'error',
        'no-restricted-globals': 'off',
        'no-self-compare': 'error',
        'no-sequences': 'error',
        'no-shadow': 'error',
        'no-shadow-restricted-names': 'error',
        'no-tabs': 'error',
        'no-template-curly-in-string': 'error',
        'no-throw-literal': 'error',
        'no-trailing-spaces': 'error',
        'no-unmodified-loop-condition': 'error',
        'no-unneeded-ternary': 'error',
        'no-unused-expressions': 'error',
        'no-unused-vars': 'error',
        'no-use-before-define': 'error',
        'no-useless-concat': 'error',
        'no-useless-constructor': 'error',
        'no-useless-rename': 'error',
        'no-var': 'error',
        'no-whitespace-before-property': 'error',
        'object-curly-spacing': ['error', 'always'],
        'padded-blocks': [
            'error',
            {
                classes: 'never',
            },
        ],
        'prefer-const': 'error',
        'prefer-destructuring': [
            'error',
            { object: true, array: false },
            {
                enforceForRenamedProperties: true,
            },
        ],
        'prefer-rest-params': 'error',
        'prefer-spread': 'error',
        'prefer-template': 'error',
        'prettier/prettier': 'error',
        quotes: [
            'error',
            'single',
            {
                avoidEscape: true,
            },
        ],
        radix: 'error',
        semi: ['error', 'never'],
        'sort-keys': 'off',
        'sort-keys-fix/sort-keys-fix': 'error',
        'space-before-blocks': 'error',
        'space-before-function-paren': [
            'error',
            {
                anonymous: 'never',
                named: 'never',
                asyncArrow: 'always',
            },
        ],
        'space-in-parens': 'error',
        'space-infix-ops': 'error',
        'spaced-comment': 'error',
        'switch-colon-spacing': 'error',
        'template-curly-spacing': ['error', 'never'],
        'yield-star-spacing': ['error', 'after'],
    },
}
