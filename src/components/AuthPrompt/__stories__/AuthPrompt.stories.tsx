import React, {useCallback, useState} from 'react';

import {Meta, Story} from '@storybook/react/types-6-0';

import {Button} from '@gravity-ui/uikit';

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

const styleBtn = {margin: '1em'};

const DefaultTemplate: Story<AuthPromptProps> = (args) => {
    const {openTimestamp = 0} = args;
    const [timestamp, setTime] = useState(openTimestamp);
    const props = {...args, openTimestamp: timestamp};
    const onClick = useCallback(() => {
        setTime(Date.now());
    }, [setTime]);
    return (
        <div>
            <Button view="action" style={styleBtn} onClick={onClick}>
                Open Prompt
            </Button>
            <Button view="action" style={styleBtn} onClick={onClick}>
                Keep Prompt Open
            </Button>
            <AuthPrompt {...props} />
        </div>
    );
};

export const Default = DefaultTemplate.bind({});
