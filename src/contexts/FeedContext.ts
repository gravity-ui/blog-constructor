import * as React from 'react';

import {FilterConfig, GetPostsType, PostData} from '../models/common';

export interface FeedContextProps {
    posts?: PostData[];
    pinnedPost?: PostData;
    totalCount?: number;
    filters?: FilterConfig[];
    getPosts?: GetPostsType;
    pageCountForShowSupportButtons?: number;
}

export const FeedContext = React.createContext<FeedContextProps>({} as FeedContextProps);
