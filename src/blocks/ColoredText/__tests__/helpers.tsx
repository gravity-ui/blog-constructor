import {composeStories} from '@storybook/react';

import * as ColoredTextStories from '../__stories__/ColoredText.stories';

export const {Default} = composeStories(ColoredTextStories);
