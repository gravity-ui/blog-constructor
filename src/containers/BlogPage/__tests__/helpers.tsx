import {composeStories} from '@storybook/react';

import * as BlogPageStories from '../__stories__/BlogPage.stories';

export const {Default, WithNavigation} = composeStories(BlogPageStories);
