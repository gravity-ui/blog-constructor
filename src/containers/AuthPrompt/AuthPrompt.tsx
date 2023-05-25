import React from 'react';

import {Prompt, PromptProps} from '../../components/Prompt/Prompt';
import {Keyset, i18} from '../../i18n';

export interface AuthPromptProps extends Partial<PromptProps> {}

/**
 * Authentication Popup that appears when user action requires login
 *
 * @param text - Prompt message
 * @param actions
 * @param props
 * @constructor
 */
export function AuthPrompt({
    text = i18(Keyset.AuthPromptOnLike),
    actions = [
        {
            children: i18(Keyset.SignIn),
            onClick: () => alert('open'),
        },
    ],
    ...props
}: AuthPromptProps) {
    return <Prompt {...{text, actions}} {...props} />;
}
