import * as React from 'react';

import {MobileProvider} from '@gravity-ui/uikit';
import {StoryFn, StoryContext} from '@storybook/react';

export function withMobile(Story: StoryFn, context: StoryContext) {
    const platform = context.globals.platform;

    return (
        <MobileProvider mobile={platform === 'mobile'} platform={platform}>
            <Story {...context} />
        </MobileProvider>
    );
}
