import * as React from 'react';

export interface SettingsContextProps {
    addNavigationLinkForPages?: boolean;
    isAnimationEnabled?: boolean;

    getBlogPath?: (pathPrefix: string) => string;
}

export const SettingsContext = React.createContext<SettingsContextProps>({});
