import {composeStories} from '@storybook/react';

import * as HeaderStories from '../__stories__/Header.stories';

export const {Default, BgImage, ImageOutGrid} = composeStories(HeaderStories);
