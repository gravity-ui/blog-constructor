import React, {SyntheticEvent, useMemo} from 'react';

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
import {FeedContext} from '../../contexts/FeedContext';
import {LikesContext} from '../../contexts/LikesContext';
import {useExtendedComponentMap} from '../../hooks/useExtendedComponentMap';
import {
    GetPostsType,
    MetaProps,
    PostsProps,
    Service,
    Tag,
    ToggleLikeCallbackType,
} from '../../models/common';

import './BlogPage.scss';

export type BlogPageProps = {
    content: PageContent;
    posts: PostsProps;
    tags: Tag[];
    services?: Service[];
    navigation?: NavigationData;
    getPosts: GetPostsType;
    hasLikes?: boolean;
    toggleLike?: ToggleLikeCallbackType;
    metaData?: MetaProps;
    settings?: PageConstructorProviderProps;
    custom?: CustomConfig;
    pageCountForShowSupportButtons?: number;
    isSignedInUser?: boolean;
    // Required to enable Sign In on Post like
    onClickSignIn?: React.EventHandler<SyntheticEvent>;
};

export const BlogPage = ({
    content,
    posts,
    tags,
    services,
    getPosts,
    metaData,
    custom,
    hasLikes = false,
    toggleLike,
    navigation,
    settings,
    pageCountForShowSupportButtons,
    isSignedInUser = false,
    onClickSignIn,
}: BlogPageProps) => {
    const {requireSignIn, ...promptSignInProps} = usePromptSignInProps(onClickSignIn);

    const likesContextData = useMemo(
        () => ({toggleLike, hasLikes, isSignedInUser, requireSignIn}),
        [toggleLike, hasLikes, isSignedInUser, requireSignIn],
    );

    const actualComponentMap = useExtendedComponentMap(custom);

    return (
        <LikesContext.Provider value={likesContextData}>
            <FeedContext.Provider
                value={{
                    posts: posts.posts,
                    pinnedPost: posts.pinnedPost,
                    totalCount: posts.count,
                    tags,
                    services: services ?? [],
                    getPosts,
                    pageCountForShowSupportButtons,
                }}
            >
                <PageConstructorProvider {...settings}>
                    {metaData ? <MetaWrapper {...metaData} /> : null}
                    <PageConstructor
                        content={content}
                        custom={actualComponentMap}
                        navigation={navigation}
                    />
                </PageConstructorProvider>
            </FeedContext.Provider>
            <PromptSignIn {...promptSignInProps} />
        </LikesContext.Provider>
    );
};
