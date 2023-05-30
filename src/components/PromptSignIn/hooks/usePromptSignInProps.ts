import React, {SyntheticEvent, useMemo, useState} from 'react';

export function usePromptSignInProps(onClickSignIn?: React.EventHandler<SyntheticEvent>) {
    const [openTimestamp, setTime] = useState(0);
    const requireSignIn = useMemo(() => {
        return onClickSignIn
            ? () => {
                  setTime(Date.now());
              }
            : undefined;
    }, [onClickSignIn, setTime]);

    return {onClickSignIn, openTimestamp, requireSignIn};
}
