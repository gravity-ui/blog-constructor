import React, {useCallback, useState} from 'react';

import {Button} from '@gravity-ui/uikit';
import type {Meta, StoryFn} from '@storybook/react';

import {PromptProps} from '../../Prompt/Prompt';
import {PromptSignIn} from '../PromptSignIn';

export default {
    title: 'Components/PromptSignIn',
    component: PromptSignIn,
} as Meta;

const styleBtn = {margin: '1em'};

const DefaultTemplate: StoryFn<PromptProps> = (args) => {
    const {openTimestamp = 0} = args;
    const [timestamp, setTime] = useState(openTimestamp);
    const props = {...args, openTimestamp: timestamp};
    const onClick = useCallback(() => {
        setTime(Date.now());
    }, [setTime]);

    return (
        <div className="g-root g-root_theme_light">
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
