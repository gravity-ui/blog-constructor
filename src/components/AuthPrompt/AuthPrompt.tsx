import React, {useEffect, useState} from 'react';

import block from 'bem-cn-lite';

import {Button, ButtonProps} from '@gravity-ui/uikit';

import './AuthPrompt.scss';

const b = block('AuthPrompt');

export interface AuthPromptProps {
    // Prompt message
    text: string;
    actions: ButtonProps[];
    // Unix Timestamp in milliseconds when the Prompt opens
    openTimestamp: number;
    // Milliseconds to remain visible
    openDuration?: number;
    className?: string;
    theme?: 'grey' | 'beige' | 'white';
}

/**
 * Authentication Popup that appears when user action requires login,
 * with text message and button(s) for given `actions`.
 * Features:
 *  - Automatically disappears after `openDuration` in milliseconds
 *  - `openTimestamp` (`Date.now()`) resets the visible duration
 */
export const AuthPrompt: React.FC<AuthPromptProps> = ({
    text,
    actions,
    className,
    openTimestamp = 0,
    openDuration,
    theme = 'grey',
}) => {
    const [open] = useOpenCloseTimer(openTimestamp, openDuration);
    const mounted = openTimestamp > 0;

    return (
        <div className={b({theme, open, close: !open, mounted}, className)}>
            <div className={b('content')}>
                <span className={b('text')}>{text}</span>
                <div className={b('actions')}>
                    {actions.map(({view = 'action', className: btnClass, ...btnProps}, i) => (
                        <Button
                            key={i}
                            className={b('action', btnClass)}
                            view={view}
                            {...btnProps}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

function useOpenCloseTimer(openTimestamp = Date.now(), openDuration = 1000) {
    const open = Date.now() - openTimestamp < openDuration;
    const [, reset] = useState(0); // time to reset open state

    useEffect(() => {
        const closeTime = openTimestamp + openDuration;
        const delay = closeTime - Date.now();
        if (delay <= 0) return;

        const timer = setTimeout(() => {
            reset(Date.now);
        }, delay);

        // eslint-disable-next-line consistent-return
        return () => {
            clearTimeout(timer);
        };
    }, [openTimestamp, openDuration]);

    return [open];
}
