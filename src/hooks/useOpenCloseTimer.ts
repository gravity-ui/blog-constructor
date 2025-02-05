import * as React from 'react';

/**
 * Timer to automatically update `open` state after a given duration
 * @param {number} openTimestamp - UNIX timestamp in milliseconds
 * @param {number} openDuration - in milliseconds
 * @returns {{open: boolean}} {open} - whether the state is open
 */
export function useOpenCloseTimer(openTimestamp = Date.now(), openDuration = 4000) {
    const open = Date.now() - openTimestamp < openDuration;
    const [, reset] = React.useState(0); // time to reset `open` state

    React.useEffect(() => {
        const closeTime = openTimestamp + openDuration;
        const delay = closeTime - Date.now();

        if (delay <= 0) {
            return;
        }

        const timer = setTimeout(() => {
            reset(Date.now);
        }, delay);

        // eslint-disable-next-line consistent-return
        return () => {
            clearTimeout(timer);
        };
    }, [openTimestamp, openDuration]);

    return {open};
}
