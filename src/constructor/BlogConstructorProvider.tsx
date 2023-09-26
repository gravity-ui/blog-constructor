import React, {Fragment, PropsWithChildren} from 'react';

import {AnalyticsContext, AnalyticsContextProps} from '@gravity-ui/page-constructor';

import {DEFAULT_THEME} from '../constants';
import {DeviceContext, DeviceContextProps} from '../contexts/DeviceContext';
import {LocaleContext} from '../contexts/LocaleContext';
import {MobileContext} from '../contexts/MobileContext';
import {RouterContext, RouterContextProps} from '../contexts/RouterContext';
import {SettingsContext, SettingsContextProps} from '../contexts/SettingsContext';
import {ThemeValueContext, ThemeValueType} from '../contexts/theme/ThemeValueContext';
import {Locale} from '../models/locale';

export interface BlogConstructorProviderProps {
    isMobile?: boolean;
    locale?: Locale;
    router?: RouterContextProps;
    theme?: ThemeValueType;
    device?: DeviceContextProps;
    analytics?: AnalyticsContextProps;
    settings?: SettingsContextProps;
    children?: React.ReactNode;
}

export const BlogConstructorProvider = ({
    isMobile,
    locale = {} as Locale,
    router = {} as RouterContextProps,
    theme = DEFAULT_THEME,
    device = {},
    analytics = {},
    settings = {},
    children,
}: PropsWithChildren<BlogConstructorProviderProps>) => {
    const context = [
        <ThemeValueContext.Provider value={{themeValue: theme}} key="theme-context" />,
        <LocaleContext.Provider value={{locale}} key="locale-context" />,
        <RouterContext.Provider value={router} key="router-context" />,
        <MobileContext.Provider value={Boolean(isMobile)} key="is-mobile-context" />,
        <DeviceContext.Provider value={device} key="device-context" />,
        <SettingsContext.Provider value={settings} key="settings-context" />,
        <AnalyticsContext.Provider value={analytics} key="analytics-context" />,
    ].reduceRight((prev, provider) => React.cloneElement(provider, {}, prev), children);

    return <Fragment>{context}</Fragment>;
};
