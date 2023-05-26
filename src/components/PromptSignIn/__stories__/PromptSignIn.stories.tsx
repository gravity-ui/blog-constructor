import React, {useCallback, useState} from 'react';

import {Meta, Story} from '@storybook/react/types-6-0';

import {Button} from '@gravity-ui/uikit';

import {COMPONENTS} from '../../../demo/constants';
import {PromptProps} from '../../Prompt/Prompt';
import {PromptSignIn} from '../PromptSignIn';

export default {
    title: `${COMPONENTS}/PromptSignIn`,
    component: PromptSignIn,
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
            <PromptSignIn {...props} />
        </div>
    );
};

export const Default = DefaultTemplate.bind({});
