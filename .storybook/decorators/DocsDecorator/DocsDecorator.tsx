import * as React from 'react';

import {DocsContainer} from '@storybook/addon-docs';
import type {DocsContainerProps} from '@storybook/addon-docs';

import {themes} from '../../../.storybook/theme';
import {MobileContext} from '../../../src/contexts/MobileContext';
import {cn} from '../../../src/utils/cn';
import {ThemeProvider} from '@gravity-ui/uikit';

import './DocsDecorator.scss';

export interface DocsDecoratorProps extends React.PropsWithChildren<DocsContainerProps> {}

const b = cn('docs-decorator');

export function DocsDecorator({children, context}: DocsDecoratorProps) {
    // @ts-expect-error
    const theme = context.store.userGlobals.globals.theme;

    return (
        <div className={b()}>
            <DocsContainer context={context} theme={themes[theme as 'dark' | 'light']}>
                <ThemeProvider theme={theme}>
                    <MobileContext.Provider value={false}>{children}</MobileContext.Provider>
                </ThemeProvider>
            </DocsContainer>
        </div>
    );
}
