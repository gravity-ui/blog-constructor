import React from 'react';
import {StoryFn, StoryContext} from '@storybook/react';

import {Lang, configure} from '@gravity-ui/uikit';

configure({lang: Lang.En});

export function withLang(Story: StoryFn, context: StoryContext) {
    const lang = context.globals.lang || Lang.En;
    configure({lang});

    return <Story {...context} />;
}
