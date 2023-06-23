import React, {Fragment, SyntheticEvent, useMemo} from 'react';

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
import {FeedContext} from '../../contexts/FeedContext';
import {LikesContext} from '../../contexts/LikesContext';
import {
    GetPostsType,
    MetaProps,
    PostsProps,
    Service,
    SetQueryType,
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
    setQuery?: SetQueryType;
    settings?: PageConstructorProviderProps;
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
    hasLikes = false,
    toggleLike,
    navigation,
    settings,
    pageCountForShowSupportButtons,
    isSignedInUser = false,
    onClickSignIn,
}: BlogPageProps) => {
    const {requireSignIn, ...promptSignInProps} = usePromptSignInProps(onClickSignIn);

    const likes = useMemo(
        () => ({toggleLike, hasLikes, isSignedInUser, requireSignIn}),
        [toggleLike, hasLikes, isSignedInUser, requireSignIn],
    );

    return (
        <Fragment>
            <LikesContext.Provider value={likes}>
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
                            custom={componentMap}
                            navigation={navigation}
                        />
                    </PageConstructorProvider>
                </FeedContext.Provider>
            </LikesContext.Provider>
            <PromptSignIn {...promptSignInProps} />
        </Fragment>
    );
};
