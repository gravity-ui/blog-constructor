import {composeStories} from '@storybook/react';

import * as LayoutStories from '../__stories__/Layout.stories';

export const {Default} = composeStories(LayoutStories);
