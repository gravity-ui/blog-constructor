import {resolve} from 'path';

import type {StorybookConfig} from '@storybook/react-webpack5';

const assetsDirectory = 'story-assets';
const previewDestPath = process.env.PREVIEW_DEST_PATH;
const storyAssetsPath = `${previewDestPath || ''}/${assetsDirectory}`;

const config: StorybookConfig = {
    framework: {
        name: '@storybook/react-webpack5',
        options: {fastRefresh: true},
    },
    stories: ['./stories/**/*.mdx', '../src/**/__stories__/*.mdx', '../src/**/*.stories.@(ts|tsx)'],
    staticDirs: ['./public'],
    typescript: {
        reactDocgen: 'react-docgen-typescript',
    },
    docs: {
        defaultName: 'Docs',
    },
    env: (config) => ({...config, STORY_ASSETS_PATH: storyAssetsPath}),
    webpackFinal: (config) => {
        if (previewDestPath) {
            config.module?.rules?.push({
                test: /\.json$/,
                include: resolve(__dirname, '../.mocks'),
                loader: require.resolve('string-replace-loader'),
                options: {
                    search: `/${assetsDirectory}/`,
                    replace: `${previewDestPath}/${assetsDirectory}/`,
                    flags: 'g',
                },
            });
        }

        return config;
    },
    addons: [
        '@storybook/preset-scss',
        {name: '@storybook/addon-essentials', options: {backgrounds: false, actions: false}},
        './addons/context-data/preset',
        './addons/addon-yaml/preset',
        './addons/theme-addon/register.tsx',
        '@storybook/addon-mdx-gfm',
        '@storybook/addon-webpack5-compiler-babel',
    ],
};

export default config;
