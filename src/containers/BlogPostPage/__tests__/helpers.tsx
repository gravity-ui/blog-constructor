import {composeStories} from '@storybook/react';

import * as BlogPostPageStories from '../__stories__/BlogPostPage.stories';

export const {Default, WithNavigation} = composeStories(BlogPostPageStories);
