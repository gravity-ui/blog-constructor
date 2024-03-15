import type {StorybookConfig} from '@storybook/react-webpack5';

const config: StorybookConfig = {
    framework: {
        name: '@storybook/react-webpack5',
        options: {fastRefresh: true},
    },
    stories: ['./stories/**/*.mdx', '../src/**/__stories__/*.mdx', '../src/**/*.stories.@(ts|tsx)'],
    docs: {
        autodocs: true,
        defaultName: 'Docs',
    },
    addons: [
        '@storybook/preset-scss',
        {name: '@storybook/addon-essentials', options: {backgrounds: false, actions: false}},
        './addons/addon-yaml/preset',
        './addons/theme-addon/register.tsx',
        '@storybook/addon-mdx-gfm',
        '@storybook/addon-webpack5-compiler-babel',
    ],
};

export default config;
