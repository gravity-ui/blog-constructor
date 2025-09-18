import {composeStories} from '@storybook/react';

import * as TakeStories from '../__stories__/Take.stories';

export const {Default, CustomColor, NoBackground, CustomColorNoBackground} =
    composeStories(TakeStories);
