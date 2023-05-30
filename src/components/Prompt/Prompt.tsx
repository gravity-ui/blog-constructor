import React from 'react';

import {Button, ButtonProps} from '@gravity-ui/uikit';

import {useOpenCloseTimer} from '../../hooks/useOpenCloseTimer';
import {block} from '../../utils/cn';

import './Prompt.scss';

const b = block('prompt');

export interface PromptProps {
    // Prompt message
    text: string;
    actions: ButtonProps[];
    // Unix Timestamp in milliseconds when the Prompt opens
    openTimestamp?: number;
    // Milliseconds to remain visible
    openDuration?: number;
    className?: string;
    theme?: 'grey' | 'beige' | 'white';
}

/**
 * Popup that appears with text message and button(s) for given `actions`.
 * Features:
 *  - Automatically disappears after `openDuration` in milliseconds
 *  - `openTimestamp` (`Date.now()`) resets the visible duration
 * @returns {JSX|null}
 */
export const Prompt: React.FC<PromptProps> = ({
    text,
    actions,
    className,
    openTimestamp = 0,
    openDuration,
    theme,
}) => {
    const {open} = useOpenCloseTimer(openTimestamp, openDuration);
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
