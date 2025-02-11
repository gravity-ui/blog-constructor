import {Theme} from '@gravity-ui/page-constructor';
import {
    MobileProvider,
    ThemeProvider,
    Toaster,
    ToasterComponent,
    ToasterProvider,
} from '@gravity-ui/uikit';
import * as React from 'react';
import {BlogConstructorProvider} from '../../src/constructor/BlogConstructorProvider';

export const Providers = ({children}) => {
    const [theme, setTheme] = React.useState<Theme>(Theme.Light);

    React.useEffect(() => {
        const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const updateTheme = (event) => {
            setTheme(event.matches ? Theme.Dark : Theme.Light);
        };

        setTheme(darkModeMediaQuery.matches ? Theme.Dark : Theme.Light);

        darkModeMediaQuery.addEventListener('change', updateTheme);

        return () => {
            darkModeMediaQuery.removeEventListener('change', updateTheme);
        };
    }, []);

    const toaster = new Toaster();

    return (
        <ThemeProvider>
            <MobileProvider>
                <ToasterProvider toaster={toaster}>
                    <BlogConstructorProvider theme={theme} settings={{isAnimationEnabled: false}}>
                        {children}
                        <ToasterComponent />
                    </BlogConstructorProvider>
                </ToasterProvider>
            </MobileProvider>
        </ThemeProvider>
    );
};
