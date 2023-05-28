import React from 'react';

import {Keyset, i18} from '../../i18n';
import {Prompt, PromptProps} from '../Prompt/Prompt';

export interface PromptSignInProps extends Partial<PromptProps> {
    onClickSignIn?: React.MouseEventHandler;
}

/**
 * Authentication Popup that appears when user action requires login
 */
export function PromptSignIn({
    text = i18(Keyset.PromptSignInOnLike),
    onClickSignIn = () => alert(i18(Keyset.SignIn)),
    actions = [
        {
            children: i18(Keyset.SignIn),
            onClick: onClickSignIn,
        },
    ],
    ...props
}: PromptSignInProps) {
    return <Prompt {...{text, actions}} {...props} />;
}
