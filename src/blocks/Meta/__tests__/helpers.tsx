import {composeStories} from '@storybook/react';

import * as MetaStories from '../__stories__/Meta.stories';

export const {Default} = composeStories(MetaStories);
