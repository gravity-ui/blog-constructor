import * as React from 'react';

import {FiltersConfig, GetPostsType, PostData} from '../models/common';

export interface FeedContextProps {
    posts?: PostData[];
    pinnedPost?: PostData;
    totalCount?: number;
    filters?: FiltersConfig;
    getPosts?: GetPostsType;
    pageCountForShowSupportButtons?: number;
}

export const FeedContext = React.createContext<FeedContextProps>({} as FeedContextProps);
