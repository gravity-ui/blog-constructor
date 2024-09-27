import {composeStories} from '@storybook/react';

import * as YFMStories from '../__stories__/YFM.stories';

export const {Default} = composeStories(YFMStories);
