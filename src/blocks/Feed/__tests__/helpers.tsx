import {composeStories} from '@storybook/react';

import * as FeedStories from '../__stories__/Feed.stories';

export const {Default} = composeStories(FeedStories);
