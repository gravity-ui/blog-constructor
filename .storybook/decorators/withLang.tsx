import React from 'react';
import {StoryFn, StoryContext} from '@storybook/react';

import {Lang} from '../../src/models/locale';

import {configure} from '@gravity-ui/uikit';

export function withLang(Story: StoryFn, context: StoryContext) {
    const lang = context.globals.lang || Lang.En;
    configure({lang});

    return <Story {...context} />;
}
