import * as React from 'react';

import {CustomInfoItemComponent} from '../components/PostInfo/PostInfo';

export interface SettingsContextProps {
    addNavigationLinkForPages?: boolean;
    isAnimationEnabled?: boolean;

    getBlogPath?: (pathPrefix: string) => string;
    extraInfoItems?: CustomInfoItemComponent[];
}

export const SettingsContext = React.createContext<SettingsContextProps>({});
