import * as React from 'react';

export function usePromptSignInProps(onClickSignIn?: React.EventHandler<React.SyntheticEvent>) {
    const [openTimestamp, setTime] = React.useState(0);
    const requireSignIn = React.useMemo(() => {
        return onClickSignIn
            ? () => {
                  setTime(Date.now());
              }
            : undefined;
    }, [onClickSignIn, setTime]);

    return {onClickSignIn, openTimestamp, requireSignIn};
}
