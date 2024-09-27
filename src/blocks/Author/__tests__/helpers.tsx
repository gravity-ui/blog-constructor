import {composeStories} from '@storybook/react';

import * as AuthorStories from '../__stories__/Author.stories';

export const {Default} = composeStories(AuthorStories);
