import React, {SyntheticEvent, useContext, useMemo} from 'react';

import {ShareOptions} from '@gravity-ui/components';
import {
    CustomConfig,
    NavigationData,
    PageConstructor,
    PageConstructorProvider,
    PageConstructorProviderProps,
    PageContent,
} from '@gravity-ui/page-constructor';

import {MetaWrapper} from '../../components/MetaWrapper/MetaWrapper';
import {PromptSignIn} from '../../components/PromptSignIn/PromptSignIn';
import {usePromptSignInProps} from '../../components/PromptSignIn/hooks/usePromptSignInProps';
import {LikesContext} from '../../contexts/LikesContext';
import {PostPageContext} from '../../contexts/PostPageContext';
import {useExtendedComponentMap} from '../../hooks/useExtendedComponentMap';
import {useLikes} from '../../hooks/useLikes';
import {MetaProps, PostData, ToggleLikeCallbackType} from '../../models/common';
import {SettingsContext} from '../../contexts/SettingsContext';

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
    custom?: CustomConfig;
    shareOptions?: ShareOptions[];
    isSignedInUser?: boolean;
    // Required to enable Sign In on Post like
    onClickSignIn?: React.EventHandler<SyntheticEvent>;
}

export const BlogPostPage = ({
    metaData,
    suggestedPosts,
    likes,
    content,
    post,
    settings,
    navigation,
    custom,
    shareOptions,
    isSignedInUser = false,
    onClickSignIn,
}: BlogPostPageProps) => {
    const {isAnimationEnabled} = useContext(SettingsContext);
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

    const actualComponentMap = useExtendedComponentMap(custom);

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
                <PageConstructorProvider
                    {...settings}
                    projectSettings={{...(settings?.projectSettings || {}), isAnimationEnabled}}
                >
                    {metaData ? <MetaWrapper {...metaData} /> : null}
                    <PageConstructor
                        content={content}
                        custom={actualComponentMap}
                        navigation={navigation}
                    />
                </PageConstructorProvider>
            </PostPageContext.Provider>
            <PromptSignIn {...promptSignInProps} />
        </LikesContext.Provider>
    );
};
