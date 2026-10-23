import type {Meta, StoryFn} from '@storybook/react';
import isEqual from 'lodash/isEqual';

import {
    STORY_ASSETS_PATH,
    contextDataArgType,
    contextDataParameters,
    transformStoryBlock,
} from '../../../../.storybook/story-utils';
import {FeedContext, FeedContextProps} from '../../../contexts/FeedContext';
import {RouterContext, RouterContextProps} from '../../../contexts/RouterContext';
import {Keyset, i18n} from '../../../i18n';
import {FeedBlockModel} from '../../../models/blocks';
import {
    BlockType,
    FiltersConfig,
    GetPostsRequest,
    GetPostsType,
    PostsProps,
} from '../../../models/common';
import {Feed} from '../Feed';

import mockedPosts from '../../../../.mocks/posts.json';
import services from '../../../../.mocks/services.json';
import tags from '../../../../.mocks/tags.json';

type FeedContextData = {
    feed: Omit<FeedContextProps, 'getPosts'>;
    router: Omit<RouterContextProps, 'updateQueryCallback'>;
};

type FeedStoryArgs = FeedBlockModel & {contextData: FeedContextData};

const filters: FiltersConfig = [
    {type: 'search', queryParamName: 'search'},
    {
        type: 'select',
        queryParamName: 'tags',
        allLabel: i18n(Keyset.AllTags),
        options: tags.map((tag) => ({content: tag.name, value: tag.slug})),
    },
    {
        type: 'select',
        queryParamName: 'services',
        allLabel: i18n(Keyset.AllServices),
        options: services.map((service) => ({content: service.name, value: `${service.id}`})),
        multiple: true,
        filterable: true,
        hasClear: true,
        qa: 'service-select',
    },
    {type: 'savedOnly', queryParamName: 'savedOnly'},
];

const multiRowFilters: FiltersConfig = [
    [
        {type: 'search', queryParamName: 'search'},
        {
            type: 'select',
            queryParamName: 'other',
            allLabel: i18n(Keyset.AllOptions),
            options: tags.map((tag) => ({content: tag.name, value: tag.slug})),
        },
        {
            type: 'select',
            queryParamName: 'another',
            allLabel: i18n(Keyset.AllOptions),
            options: tags.map((tag) => ({content: tag.name, value: tag.slug})),
        },
    ],
    [
        {
            type: 'select',
            queryParamName: 'tags',
            allLabel: i18n(Keyset.AllTags),
            options: tags.map((tag) => ({content: tag.name, value: tag.slug})),
        },
        {
            type: 'select',
            queryParamName: 'services',
            allLabel: i18n(Keyset.AllServices),
            options: services.map((service) => ({content: service.name, value: `${service.id}`})),
            multiple: true,
            filterable: true,
            hasClear: true,
            qa: 'service-select',
        },
    ],
];

const getPosts: GetPostsType = async (query: GetPostsRequest) => {
    const posts = mockedPosts.posts
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

    return {...mockedPosts, posts, count: posts.length} as unknown as PostsProps;
};

export default {
    title: 'Blocks/Feed',
    component: Feed,
    argTypes: {contextData: contextDataArgType},
    parameters: contextDataParameters,
} as Meta<FeedStoryArgs>;

const DefaultTemplate: StoryFn<FeedStoryArgs> = (args) => {
    const {contextData, ...block} = args;
    const {type: _type, ...feedProps} = transformStoryBlock(block);

    return (
        <RouterContext.Provider
            value={{...contextData.router, updateQueryCallback: () => undefined}}
        >
            <FeedContext.Provider value={{...contextData.feed, getPosts}}>
                <Feed {...feedProps} />
            </FeedContext.Provider>
        </RouterContext.Provider>
    );
};

const contextData: FeedContextData = {
    feed: {
        posts: mockedPosts.posts as unknown as PostsProps['posts'],
        pinnedPost: mockedPosts.pinnedPost as unknown as PostsProps['pinnedPost'],
        totalCount: mockedPosts.totalCount,
        filters,
        pageCountForShowSupportButtons: 3,
    },
    router: {
        pathname: '/blog',
        as: '/blog',
        hostname: 'localhost',
        query: {},
    },
};

const defaultArgs: FeedStoryArgs = {
    type: BlockType.Feed,
    image: `${STORY_ASSETS_PATH}/img_8-12_light.png`,
    title: 'Blog',
    resetTitleMargin: false,
    contextData,
};

export const Default = DefaultTemplate.bind({});
export const MultiRowFilters = DefaultTemplate.bind({});

Default.args = defaultArgs;
MultiRowFilters.args = {
    ...defaultArgs,
    resetTitleMargin: true,
    contextData: {...contextData, feed: {...contextData.feed, filters: multiRowFilters}},
};
