import React, {useContext} from 'react';

import type {Meta, StoryFn} from '@storybook/react';

import {BlogConstructorProvider} from '../../../constructor/BlogConstructorProvider';
import {GetPostsRequest} from '../../../models/common';
import {BlogPage, BlogPageProps} from '../BlogPage';

import page from '../../../../.mocks/blogPage.json';
import navigation from '../../../../.mocks/navigation.json';
import posts from '../../../../.mocks/posts.json';
import services from '../../../../.mocks/services.json';
import tags from '../../../../.mocks/tags.json';
import {Lang} from '@gravity-ui/uikit';
import {routerData} from '../../../demo/mocks';
import {SettingsContext} from '../../../contexts/SettingsContext';

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

const WithNavigationTemplate: StoryFn<BlogPageProps> = (args) => {
    const {isAnimationEnabled} = useContext(SettingsContext);

    return (
        <BlogConstructorProvider
            router={routerData}
            settings={{
                addNavigationLinkForPages: true,
                getBlogPath: (pathPrefix) => `${pathPrefix ? `/${pathPrefix}` : ''}/blog/`,
                isAnimationEnabled,
            }}
            locale={{lang: Lang.En, pathPrefix: 'test'}}
        >
            <BlogPage {...args} />
        </BlogConstructorProvider>
    );
};

export const Default = {
    render: (args: BlogPageProps) => <BlogPage {...args} />,
};

export const WithNavigation = WithNavigationTemplate.bind({});
WithNavigation.args = {
    navigation,
} as unknown as BlogPageProps;
