import React from 'react';

import {Prompt, PromptProps} from '../../components/Prompt/Prompt';
import {Keyset, i18} from '../../i18n';

/**
 * Authentication Popup that appears when user action requires login,
 * with text message and button(s) for given `actions`.
 * Features:
 *  - Automatically disappears after `openDuration` in milliseconds
 *  - `openTimestamp` (`Date.now()`) resets the visible duration
 */
export function AuthPrompt(args: PromptProps) {
    const props = {...args};

    if (!props.text) props.text = i18(Keyset.AuthPromptOnLike);

    if (!props.actions)
        props.actions = [
            {
                children: i18(Keyset.SignIn),
                onClick: () => alert('open'),
            },
        ];

    return <Prompt {...props} />;
}
