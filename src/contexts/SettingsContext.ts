import React from 'react';
import {PostData} from '../models/common';

export interface SettingsContextProps {
    addNavigationLinkForPages?: boolean;

    getBlogPath?: (pathPrefix: string) => string;
    getBlogPostPath?: (pathPrefix: string, postData: PostData) => string;
}

export const SettingsContext = React.createContext<SettingsContextProps>({});
