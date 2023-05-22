import React from 'react';

import {Meta, Story} from '@storybook/react/types-6-0';

import {COMPONENTS} from '../../../demo/constants';
import {AuthPrompt, AuthPromptProps} from '../AuthPrompt';

export default {
    title: `${COMPONENTS}/AuthPrompt`,
    component: AuthPrompt,
    args: {
        text: 'Please login to save your bookmarks',
        actions: [
            {
                children: 'Login',
                onClick: () => alert('open'),
            },
        ],
        theme: 'light',
    },
} as Meta;

const DefaultTemplate: Story<AuthPromptProps> = (args) => <AuthPrompt {...args} />;
export const Default = DefaultTemplate.bind({});
