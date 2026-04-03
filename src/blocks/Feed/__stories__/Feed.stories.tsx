import * as React from 'react';

import {Block, PageConstructor, PageConstructorProvider} from '@gravity-ui/page-constructor';
import type {Meta, StoryFn} from '@storybook/react';
import isEqual from 'lodash/isEqual';

import {
    getDefaultStoryArgs,
    getFiltersConfig,
    getMultiRowFiltersConfig,
} from '../../../../.mocks/utils';
import customBlocks from '../../../constructor/blocksMap';
import {FeedContext, FeedContextProps} from '../../../contexts/FeedContext';
import {RouterContext} from '../../../contexts/RouterContext';
import {SettingsContext} from '../../../contexts/SettingsContext';
import {routerData} from '../../../demo/mocks';
import {FeedProps} from '../../../models/blocks';
import {BlockType, GetPostsRequest, GetPostsType, PostsProps} from '../../../models/common';
import {Feed} from '../Feed';

import mockedPosts from '../../../../.mocks/posts.json';

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
                    (query.tags as string).split(','),
                ),
        )
        .filter(
            (post) =>
                !query.services ||
                isEqual(
                    post.services.map((service) => service.id.toString()),
                    (query.services as string).split(','),
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

const createTemplate = (contextData: FeedContextProps): StoryFn<FeedModel> => {
    const Template: StoryFn<FeedModel> = (args) => {
        const {isAnimationEnabled} = React.useContext(SettingsContext);

        return (
            <FeedContext.Provider value={contextData}>
                <RouterContext.Provider value={routerData}>
                    <PageConstructorProvider projectSettings={{isAnimationEnabled}}>
                        <PageConstructor
                            content={{blocks: [args] as unknown as Block[]}}
                            custom={customBlocks}
                        />
                    </PageConstructorProvider>
                </RouterContext.Provider>
            </FeedContext.Provider>
        );
    };

    return Template;
};

const defaultArgs = {
    type: BlockType.Feed,
    color: '#000',
    imageSize: 'm',
    ...getDefaultStoryArgs(),
} as FeedModel;

export const Default = createTemplate({
    ...mockedPosts,
    filters: getFiltersConfig(),
    getPosts,
} as unknown as FeedContextProps).bind({});

Default.args = defaultArgs;

export const MultiRowFilters = createTemplate({
    ...mockedPosts,
    filters: getMultiRowFiltersConfig(),
    getPosts,
} as unknown as FeedContextProps).bind({});

MultiRowFilters.args = {
    ...defaultArgs,
    resetTitleMargin: true,
};
