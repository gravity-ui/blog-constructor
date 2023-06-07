// import type {StorybookConfig} from '@storybook/core-common';
const {join} = require('path');

const config = {
    stories: ['../src/**/*.stories.@(ts|tsx)'],
    addons: [
        '@storybook/preset-scss',
        {name: '@storybook/addon-essentials', options: {backgrounds: false}},
        '@storybook/addon-controls',
        './addons/addon-yaml/preset',
    ],
    typescript: {
        check: true,
        checkOptions: {},
        reactDocgen: 'react-docgen-typescript',
        reactDocgenTypescriptOptions: {
            setDisplayName: false,
            shouldExtractLiteralValuesFromEnum: true,
            compilerOptions: {
                allowSyntheticDefaultImports: true,
                esModuleInterop: true,
            },
        },
    },

    webpackFinal: (storybookBaseConfig) => {
        storybookBaseConfig.module.rules.push({
            test: /\.md$/,
            include: [join(__dirname, '..')],
            use: [{loader: 'markdown-loader'}],
        });

        storybookBaseConfig.module.rules[0].exclude = [/node_modules/, /\.test.(tsx?|jsx?)$/];

        // to turn fileName in context.parameters into path form number in production bundle
        storybookBaseConfig.optimization.moduleIds = 'named';

        return storybookBaseConfig;
    },
};

module.exports = config;
