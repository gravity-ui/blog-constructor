import '../styles/styles.scss';
import '../styles/storybook/index.scss';
import '@gravity-ui/uikit/styles/styles.scss';
import '../styles/root.scss';

import * as React from 'react';
import {themes} from './theme';
import type {Decorator, Preview} from '@storybook/react';
import {MINIMAL_VIEWPORTS} from '@storybook/addon-viewport';
import {withTheme} from './decorators/withTheme';
import {withLang} from './decorators/withLang';
import {withMobile} from './decorators/withMobile';
import {DocsDecorator} from './decorators/DocsDecorator/DocsDecorator';
import {MobileProvider, ThemeProvider, Lang} from '@gravity-ui/uikit';

import {routerData} from '../src/demo/mocks';
import {BlogConstructorProvider} from '../src/constructor/BlogConstructorProvider';

const withContextProvider: Decorator = (Story, context) => (
    <React.StrictMode>
        <ThemeProvider theme={context.globals.theme}>
            <MobileProvider>
                <Story {...context} />
            </MobileProvider>
        </ThemeProvider>
    </React.StrictMode>
);

const localeEn = {
    code: 'en-En',
    lang: Lang.En,
    langName: 'English',
    pathPrefix: 'en',
};

const localeRu = {
    code: 'ru-Ru',
    lang: Lang.Ru,
    langName: 'Russia',
    pathPrefix: 'ru',
};

const withBlogConstructorProvider: Decorator = (Story, context) => {
    return (
        <BlogConstructorProvider
            router={routerData}
            locale={context.globals.lang === 'en' ? localeEn : localeRu}
            isMobile={context.globals.platform === 'mobile'}
        >
            <Story {...context} />
        </BlogConstructorProvider>
    );
};

const preview: Preview = {
    decorators: [withTheme, withLang, withMobile, withContextProvider, withBlogConstructorProvider],

    parameters: {
        docs: {
            theme: themes.light,
            container: DocsDecorator,
        },
        // FIXME: Disabled due to performance reasons. See https://github.com/storybookjs/storybook/issues/5551
        // actions: { argTypesRegex: '^on[A-Z].*' },
        jsx: {showFunctions: true}, // To show functions in sources
        viewport: {
            viewports: MINIMAL_VIEWPORTS,
        },
        options: {
            storySort: {
                order: ['Components', 'Blocks', 'Containers'],
                method: 'alphabetical',
            },
        },
    },

    globalTypes: {
        theme: {
            name: 'Theme',
            defaultValue: 'light',
            toolbar: {
                icon: 'mirror',
                items: [
                    {value: 'light', right: '☼', title: 'Light'},
                    {value: 'dark', right: '☾', title: 'Dark'},
                ],
            },
        },
        lang: {
            name: 'Language',
            defaultValue: 'en',
            toolbar: {
                icon: 'globe',
                items: [
                    {value: 'en', right: '🇬🇧', title: 'En'},
                    {value: 'ru', right: '🇷🇺', title: 'Ru'},
                ],
            },
        },
        platform: {
            name: 'Platform',
            defaultValue: 'desktop',
            toolbar: {
                items: [
                    {value: 'desktop', title: 'Desktop', icon: 'browser'},
                    {value: 'mobile', title: 'Mobile', icon: 'mobile'},
                ],
            },
        },
    },

    tags: ['autodocs', 'autodocs', 'autodocs'],
};

export default preview;
