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
    openTimestamp,
    openDuration,
    theme = 'grey',
}) => {
    const [open] = useSelfCloseTimer(openTimestamp, openDuration);
    return (
        <div className={b({theme, 'fade-in': open, 'fade-out': !open}, className)}>
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

function useSelfCloseTimer(openTimestamp = Date.now(), openDuration = 4000) {
    const [isOpen, setOpen] = useState(Date.now() - openTimestamp < openDuration);

    useEffect(() => {
        if (!isOpen) return;

        const closeTime = openTimestamp + openDuration;
        const delay = closeTime - Date.now();
        if (delay <= 0) return;

        const timer = setTimeout(() => {
            setOpen(false);
        }, delay);

        // eslint-disable-next-line consistent-return
        return () => {
            clearTimeout(timer);
        };
    }, [isOpen, openTimestamp, openDuration]);

    return [isOpen];
}
