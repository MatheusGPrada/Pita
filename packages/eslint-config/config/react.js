module.exports = {
    env: {
        browser: false,
        es6: true,
        jest: true,
    },
    extends: ['eslint:recommended', 'plugin:jest/recommended', 'plugin:jsx-a11y/recommended', 'plugin:react/recommended', 'react-app'],
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
    plugins: ['chai-expect', 'jest', 'jsx-a11y', 'mocha', 'prettier', 'react', 'react-hooks', '@typescript-eslint'],
    rules: {
        'jsx-quotes': ['error', 'prefer-double'],
        'jsx-a11y/href-no-hash': 'off',
        'jsx-a11y/label-has-for': 'off',
        'react/button-has-type': 'error',
        'react/default-props-match-prop-types': 'error',
        'react/destructuring-assignment': 'error',
        'react/display-name': 'off',
        'react/forbid-prop-types': [
            'error',
            {
                forbid: ['any'],
            },
        ],
        'react-hooks/rules-of-hooks': 'error',
        'react/jsx-closing-tag-location': 'error',
        'react/jsx-curly-spacing': [
            'error',
            {
                when: 'never',
                children: true,
            },
        ],
        'react/jsx-indent': 'error',
        'react/jsx-indent-props': 'error',
        'react/jsx-pascal-case': 'error',
        'react/jsx-props-no-multi-spaces': 'error',
        'react/jsx-tag-spacing': [
            'error',
            {
                closingSlash: 'never',
                beforeSelfClosing: 'always',
                beforeClosing: 'never',
            },
        ],
        'react/jsx-sort-default-props': 'error',
        'react/jsx-sort-props': 'error',
        'react/no-access-state-in-setstate': 'error',
        'react/no-danger': 'error',
        'react/no-redundant-should-component-update': 'error',
        'react/no-this-in-sfc': 'error',
        'react/no-will-update-set-state': 'error',
        'react/prop-types': 'off',
        'react/require-default-props': 'off',
        'react/self-closing-comp': 'error',
        'react/sort-comp': [
            'error',
            {
                order: ['static-methods', 'lifecycle', 'render', 'everything-else'],
                groups: {
                    lifecycle: [
                        'defaultProps',
                        'propTypes',
                        'contextTypes',
                        'childContextTypes',
                        'mixins',
                        'statics',
                        'state',
                        'getDefaultProps',
                        'constructor',
                        'getInitialState',
                        'getChildContext',
                        'getDerivedStateFromProps',
                        'componentWillMount',
                        'componentDidMount',
                        'componentWillReceiveProps',
                        'shouldComponentUpdate',
                        'componentWillUpdate',
                        'getSnapshotBeforeUpdate',
                        'componentDidUpdate',
                        'componentDidCatch',
                        'componentWillUnmount',
                    ],
                },
            },
        ],
        'react/sort-prop-types': 'error',
        'react/style-prop-object': 'error',
    },
    settings: {
        react: {
            version: '16.13.1',
        },
    },
    overrides: [
        {
            files: ['src/__mocks__/*.js'],
            rules: {
                'react/no-multi-comp': 'off',
            },
        },
    ],
}
