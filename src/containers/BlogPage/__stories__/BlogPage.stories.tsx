import React from 'react';

import type {Meta, StoryContext, StoryFn} from '@storybook/react';

import {BlogConstructorProvider} from '../../../constructor/BlogConstructorProvider';
import {GetPostsRequest} from '../../../models/common';
import {BlogPage, BlogPageProps} from '../BlogPage';

import page from '../../../../.mocks/blogPage.json';
import navigation from '../../../../.mocks/navigation.json';
import posts from '../../../../.mocks/posts.json';
import services from '../../../../.mocks/services.json';
import tags from '../../../../.mocks/tags.json';
import {Lang} from '../../../models/locale';
import {routerData} from '../../../demo/mocks';

const mockMetaComponent = <title>Blog page</title>;

export default {
    title: 'Containers/BlogPage',
    component: BlogPage,
    args: {
        theme: 'light',
        content: page.content,
        posts,
        services,
        tags,
        metaData: {
            needHelmetWrapper: true,
            metaComponent: mockMetaComponent,
        },
        getPosts: async (props: GetPostsRequest) => {
            console.log('getPosts: ~ props:', props);
            await new Promise((resolve) => setTimeout(() => resolve(props), 3000));
        },
        toggleLike: null,
        hasLikes: true,
    },
} as Meta;

const WithNavigationTemplate: StoryFn<BlogPageProps> = (args) => (
    <BlogConstructorProvider
        router={routerData}
        settings={{
            addNavigationLinkForPages: true,
            getBlogPath: (pathPrefix) => `${pathPrefix ? `/${pathPrefix}` : ''}/blog/`,
        }}
        locale={{lang: Lang.En, pathPrefix: 'test'}}
    >
        <BlogPage {...args} />
    </BlogConstructorProvider>
);

export const Default = {
    render: (args: BlogPageProps, {globals}: StoryContext) => (
        <BlogConstructorProvider router={routerData} isMobile={globals.platform === 'mobile'}>
            <BlogPage {...args} />
        </BlogConstructorProvider>
    ),
};

export const WithNavigation = WithNavigationTemplate.bind({});
WithNavigation.args = {
    navigation,
} as unknown as BlogPageProps;
