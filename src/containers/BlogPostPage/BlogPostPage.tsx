import React from 'react';

import {
    NavigationData,
    PageConstructor,
    PageConstructorProvider,
    PageConstructorProviderProps,
    PageContent,
} from '@gravity-ui/page-constructor';
import {ShareOptions} from '@gravity-ui/uikit';

import {MetaWrapper} from '../../components/MetaWrapper/MetaWrapper';
import componentMap from '../../constructor/blocksMap';
import {LikesContext} from '../../contexts/LikesContext';
import {PostPageContext} from '../../contexts/PostPageContext';
import {useLikes} from '../../hooks/useLikes';
import {MetaProps, PostData, ToggleLikeCallbackType} from '../../models/common';

import './BlogPostPage.scss';

export interface BlogPostPageProps {
    suggestedPosts: PostData[];
    metaData?: MetaProps;
    likes?: {
        hasUserLike?: boolean;
        likesCount?: number;
        toggleLike?: ToggleLikeCallbackType;
    };
    content: PageContent;
    post: PostData;
    settings?: PageConstructorProviderProps;
    navigation?: NavigationData;
    shareOptions?: ShareOptions[];
}

export const BlogPostPage: React.FC<BlogPostPageProps> = ({
    metaData,
    suggestedPosts,
    likes,
    content,
    post,
    settings,
    navigation,
    shareOptions,
}) => {
    const {hasUserLike, likesCount, handleLike} = useLikes({
        hasLike: likes?.hasUserLike,
        count: likes?.likesCount,
        toggleLikeCallback: likes?.toggleLike,
        postId: post?.blogPostId,
    });

    return (
        <main>
            <LikesContext.Provider
                value={{
                    toggleLike: likes?.toggleLike,
                    hasLikes: Boolean(likes),
                }}
            >
                <PostPageContext.Provider
                    value={{
                        post,
                        suggestedPosts,
                        likes: likes
                            ? {
                                  handleUserLike: handleLike,
                                  hasUserLike,
                                  likesCount,
                              }
                            : undefined,
                        shareOptions,
                    }}
                >
                    <PageConstructorProvider {...settings}>
                        {metaData ? <MetaWrapper {...metaData} /> : null}
                        <PageConstructor
                            content={content}
                            custom={componentMap}
                            navigation={navigation}
                        />
                    </PageConstructorProvider>
                </PostPageContext.Provider>
            </LikesContext.Provider>
        </main>
    );
};
