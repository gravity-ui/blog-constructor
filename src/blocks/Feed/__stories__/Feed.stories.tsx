import React from 'react';

import {Block, PageConstructor} from '@gravity-ui/page-constructor';
import type {Meta, StoryFn} from '@storybook/react';
import isEqual from 'lodash/isEqual';

import {getDefaultStoryArgs} from '../../../../.mocks/utils';
import customBlocks from '../../../constructor/blocksMap';
import {FeedContext, FeedContextProps} from '../../../contexts/FeedContext';
import {FeedProps} from '../../../models/blocks';
import {
    BlockType,
    GetPostsRequest,
    GetPostsType,
    PostsProps,
    Service,
    Tag,
} from '../../../models/common';
import {Feed} from '../Feed';

import mockedPosts from '../../../../.mocks/posts.json';
import mockedServices from '../../../../.mocks/services.json';
import mockedTags from '../../../../.mocks/tags.json';
import {RouterContext} from '../../../contexts/RouterContext';
import {routerData} from '../../../demo/mocks';

export default {
    title: 'Blocks/Feed',
    component: Feed,
    args: {
        theme: 'light',
    },
} as Meta;

type FeedModel = {
    type: BlockType.Feed;
} & FeedProps;

const getPosts: GetPostsType = async (query: GetPostsRequest) => {
    const filteredPosts = mockedPosts.posts
        .filter(
            (post) =>
                !query.tags ||
                isEqual(
                    post.tags.map((tag) => tag.id.toString()),
                    query.tags.split(','),
                ),
        )
        .filter(
            (post) =>
                !query.services ||
                isEqual(
                    post.services.map((service) => service.id.toString()),
                    query.services.split(','),
                ),
        )
        .filter(
            (post) =>
                !query.search ||
                post.metaTitle.includes(query.search) ||
                post.content.includes(query.search),
        );

    return {
        ...mockedPosts,
        posts: filteredPosts,
        count: filteredPosts.length,
        totalCount: mockedPosts.totalCount,
    } as unknown as PostsProps;
};

const contextData = {
    ...mockedPosts,
    services: mockedServices as Service[],
    tags: mockedTags as Tag[],
    getPosts,
};

const DefaultTemplate: StoryFn<FeedModel> = (args) => (
    <FeedContext.Provider value={contextData as unknown as FeedContextProps}>
        <RouterContext.Provider value={routerData}>
            <PageConstructor
                content={{blocks: [args] as unknown as Block[]}}
                custom={customBlocks}
            />
        </RouterContext.Provider>
    </FeedContext.Provider>
);

export const Default = DefaultTemplate.bind({});

Default.args = {
    type: BlockType.Feed,
    color: '#000',
    imageSize: 'm',
    ...getDefaultStoryArgs(),
} as FeedModel;
