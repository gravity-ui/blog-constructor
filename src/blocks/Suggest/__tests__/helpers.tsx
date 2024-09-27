import {composeStories} from '@storybook/react';

import * as SuggestStories from '../__stories__/Suggest.stories';

export const {Default} = composeStories(SuggestStories);
