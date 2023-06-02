import React, {SyntheticEvent} from 'react';

import {Keyset, i18} from '../../i18n';
import {Prompt, PromptProps} from '../Prompt/Prompt';

export interface PromptSignInProps extends Partial<PromptProps> {
    onClickSignIn?: React.EventHandler<SyntheticEvent>;
}

/**
 * Authentication Popup that appears when user action requires login
 * @returns {JSX|null}
 */
export const PromptSignIn = ({
    text = i18(Keyset.PromptSignInOnLike),
    onClickSignIn = () => alert(i18(Keyset.SignIn)),
    actions = [
        {
            children: i18(Keyset.SignIn),
            onClick: onClickSignIn,
            size: 'l',
        },
    ],
    ...props
}: PromptSignInProps) => <Prompt {...{text, actions}} {...props} />;
