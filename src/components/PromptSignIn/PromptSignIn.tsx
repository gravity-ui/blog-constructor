import * as React from 'react';

import {Keyset, i18n} from '../../i18n';
import {Prompt, PromptProps} from '../Prompt/Prompt';

export interface PromptSignInProps extends Partial<PromptProps> {
    onClickSignIn?: React.EventHandler<React.SyntheticEvent>;
}

/**
 * Authentication Popup that appears when user action requires login
 * @returns {JSX|null}
 */
export const PromptSignIn = ({
    text = i18n(Keyset.PromptSignInOnLike),
    onClickSignIn = () => alert(i18n(Keyset.SignIn)),
    actions = [
        {
            children: i18n(Keyset.SignIn),
            onClick: onClickSignIn,
            size: 'l',
        },
    ],
    ...props
}: PromptSignInProps) => <Prompt {...{text, actions}} {...props} />;
