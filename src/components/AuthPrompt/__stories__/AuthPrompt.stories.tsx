import React from 'react';

import {Meta, Story} from '@storybook/react/types-6-0';

import {COMPONENTS} from '../../../demo/constants';
import {Keyset, i18} from '../../../i18n';
import {AuthPrompt, AuthPromptProps} from '../AuthPrompt';

export default {
    title: `${COMPONENTS}/AuthPrompt`,
    component: AuthPrompt,
    args: {
        text: i18(Keyset.AuthPromptOnLike),
        actions: [
            {
                children: i18(Keyset.SignIn),
                onClick: () => alert('open'),
            },
        ],
        theme: 'light',
    },
} as Meta;

const DefaultTemplate: Story<AuthPromptProps> = (args) => <AuthPrompt {...args} />;
export const Default = DefaultTemplate.bind({});
