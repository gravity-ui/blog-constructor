import {composeStories} from '@storybook/react';

import * as MediaStories from '../__stories__/Media.stories';

export const {Default} = composeStories(MediaStories);
