module.exports = {
    plugins: [
        [
            'module-resolver',
            {
                alias: {
                    '@cache': './src/cache',
                    '@components': './src/components',
                    '@features': './src/features',
                    '@i18n': './src/_translate/i18n',
                    '@routes': './src/routes',
                    '@theme': './src/styles/theme.ts',
                    '@utils': './src/utils',
                },
                extensions: ['.ts', '.tsx', '.json'],
                root: ['.'],
            },
        ],
    ],
    presets: ['module:metro-react-native-babel-preset'],
}
