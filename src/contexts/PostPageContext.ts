import React from 'react';

import {ShareOptions} from '@gravity-ui/components';

import {PostData} from '../models/common';
import {HeaderBreadCrumbsProps} from '@gravity-ui/page-constructor';

export type LikesRoutineType = {
    handleUserLike: () => void;
    hasUserLike: boolean;
    likesCount: number;
};

export interface PostPageContextProps {
    post: PostData;
    suggestedPosts: PostData[];
    likes?: LikesRoutineType;
    shareOptions?: ShareOptions[];
    breadcrumbs?: HeaderBreadCrumbsProps;
}

export const PostPageContext = React.createContext<PostPageContextProps>(
    {} as PostPageContextProps,
);
