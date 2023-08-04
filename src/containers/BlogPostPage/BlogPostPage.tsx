import React, {SyntheticEvent, useMemo} from 'react';

import {ShareOptions} from '@gravity-ui/components';
import {
    NavigationData,
    PageConstructor,
    PageConstructorProvider,
    PageConstructorProviderProps,
    PageContent,
} from '@gravity-ui/page-constructor';

import {MetaWrapper} from '../../components/MetaWrapper/MetaWrapper';
import {PromptSignIn} from '../../components/PromptSignIn/PromptSignIn';
import {usePromptSignInProps} from '../../components/PromptSignIn/hooks/usePromptSignInProps';
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
    isSignedInUser?: boolean;
    // Required to enable Sign In on Post like
    onClickSignIn?: React.EventHandler<SyntheticEvent>;
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
    isSignedInUser = false,
    onClickSignIn,
}) => {
    const {hasUserLike, likesCount, handleLike} = useLikes({
        hasLike: likes?.hasUserLike,
        count: likes?.likesCount,
        toggleLikeCallback: likes?.toggleLike,
        postId: post?.blogPostId,
    });

    const {requireSignIn, ...promptSignInProps} = usePromptSignInProps(onClickSignIn);

    const likesContextData = useMemo(
        () => ({
            toggleLike: likes?.toggleLike,
            hasLikes: Boolean(likes),
            isSignedInUser,
            requireSignIn,
        }),
        [likes, isSignedInUser, requireSignIn],
    );

    return (
        <LikesContext.Provider value={likesContextData}>
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
            <PromptSignIn {...promptSignInProps} />
        </LikesContext.Provider>
    );
};
