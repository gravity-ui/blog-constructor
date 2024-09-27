import {composeStories} from '@storybook/react';

import * as FormStories from '../__stories__/Form.stories';

export const {Default, FormData} = composeStories(FormStories);
