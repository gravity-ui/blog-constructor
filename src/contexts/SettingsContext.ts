import React from 'react';

export type SettingsContextProps = {
    addNavigationLinkForPages?: boolean;
};

export const SettingsContext = React.createContext<SettingsContextProps>({});
