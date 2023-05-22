import React from 'react';

import block from 'bem-cn-lite';

import {Button, ButtonProps} from '@gravity-ui/uikit';

import './AuthPrompt.scss';

const b = block('AuthPrompt');

export interface AuthPromptProps {
    text: string;
    actions: ButtonProps[];
    className?: string;
    theme?: 'grey' | 'beige' | 'white';
}

/**
 * Authentication Popup that appears when user action requires login,
 * with text message and button(s) for given `actions`.
 */
export const AuthPrompt: React.FC<AuthPromptProps> = ({
    text,
    actions,
    className,
    theme = 'grey',
}) => (
    <div className={b({theme}, className)}>
        <div className={b('content')}>
            <span className={b('text')}>{text}</span>
            <div className={b('actions')}>
                {actions.map(({view = 'action', className: btnClass, ...btnProps}, i) => (
                    <Button key={i} className={b('action', btnClass)} view={view} {...btnProps} />
                ))}
            </div>
        </div>
    </div>
);
