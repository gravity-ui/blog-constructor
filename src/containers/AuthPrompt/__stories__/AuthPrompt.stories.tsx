import React, {useCallback, useState} from 'react';

import {Meta, Story} from '@storybook/react/types-6-0';

import {Button} from '@gravity-ui/uikit';

import {PromptProps} from '../../../components/Prompt/Prompt';
import {CONTAINERS} from '../../../demo/constants';
import {AuthPrompt} from '../AuthPrompt';

export default {
    title: `${CONTAINERS}/AuthPrompt`,
    component: AuthPrompt,
} as Meta;

const styleBtn = {margin: '1em'};

const DefaultTemplate: Story<PromptProps> = (args) => {
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
