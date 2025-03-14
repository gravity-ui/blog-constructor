import * as React from 'react';

import {DEFAULT_THEME, UIKIT_ROOT_CLASS} from '../../constants';

import {ThemeContext, ThemeContextProps} from './ThemeContext';
import {ThemeValueContext, ThemeValueType} from './ThemeValueContext';

interface ThemeProviderExternalProps {}

interface ThemeProviderDefaultProps {
    theme: ThemeValueType;
    children?: React.ReactNode;
}

export interface ThemeProviderProps
    extends ThemeProviderExternalProps,
        Partial<ThemeProviderDefaultProps> {}

interface ThemeProviderState extends ThemeContextProps {
    themeValue: ThemeValueType;
}

export class ThemeProvider extends React.Component<
    ThemeProviderExternalProps & ThemeProviderDefaultProps,
    ThemeProviderState
> {
    static defaultProps: ThemeProviderDefaultProps = {
        theme: DEFAULT_THEME,
    };

    state: ThemeProviderState = {
        theme: this.props.theme,
        themeValue: this.props.theme,
        setTheme: (theme: ThemeValueType) => {
            this.setState({theme});
        },
    };

    componentDidMount() {
        this.updateBodyClassName(this.state.themeValue);
    }

    componentDidUpdate(prevProps: ThemeProviderProps, prevState: ThemeProviderState) {
        if (prevState.theme !== this.state.theme) {
            this.setState({themeValue: this.state.theme});
            this.updateBodyClassName(this.state.theme);
        }

        if (prevProps.theme !== this.props.theme) {
            this.setState({themeValue: this.state.theme});
            this.updateBodyClassName(this.state.theme);
        }
    }

    render() {
        return (
            <ThemeContext.Provider value={this.state}>
                <ThemeValueContext.Provider value={{themeValue: this.state.themeValue}}>
                    {this.props.children}
                </ThemeValueContext.Provider>
            </ThemeContext.Provider>
        );
    }

    private updateBodyClassName(theme: string) {
        const bodyEl = document.body;

        if (!bodyEl.classList.contains(UIKIT_ROOT_CLASS)) {
            bodyEl.classList.add(UIKIT_ROOT_CLASS);
        }

        bodyEl.classList.toggle(`${UIKIT_ROOT_CLASS}_theme_light`, theme === 'light');
        bodyEl.classList.toggle(`${UIKIT_ROOT_CLASS}_theme_dark`, theme === 'dark');
    }
}
