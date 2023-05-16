import React from 'react';

export interface SettingsContextProps {
    addNavigationLinkForPages?: boolean;
}

export const SettingsContext = React.createContext<SettingsContextProps>({});
