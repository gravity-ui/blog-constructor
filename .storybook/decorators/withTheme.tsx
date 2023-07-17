import React, {useEffect} from 'react';
import {StoryFn, StoryContext} from '@storybook/react';
import {useTheme} from '../../src/contexts/theme';

export function withTheme(Story: StoryFn, context: StoryContext) {
    const themeValue = context.globals.theme;
    const [theme, setTheme] = useTheme(); // eslint-disable-line react-hooks/rules-of-hooks

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        if (theme !== themeValue) {
            setTheme(themeValue);
        }
    }, [theme, themeValue, setTheme]);

    return <Story {...context} />;
}
