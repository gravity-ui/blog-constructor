import * as React from 'react';
import {CustomInfoButtonProps} from '../components/PostInfo/components/CustomInfoButton';

export interface SettingsContextProps {
    addNavigationLinkForPages?: boolean;
    isAnimationEnabled?: boolean;

    getBlogPath?: (pathPrefix: string) => string;
    extraInfoButtons?: CustomInfoButtonProps[];
}

export const SettingsContext = React.createContext<SettingsContextProps>({});
