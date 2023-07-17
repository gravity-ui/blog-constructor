import React from 'react';

import type {Meta, StoryFn} from '@storybook/react';

import {generatePostPageData} from '../../../../.mocks/utils';
import {BlogPostPage, BlogPostPageProps} from '../BlogPostPage';

import navigation from '../../../../.mocks/navigation.json';

export default {
    title: 'Containers/BlogPostPage',
    component: BlogPostPage,
    args: {
        theme: 'light',
        ...generatePostPageData(),
    },
} as Meta;

const DefaultTemplate: StoryFn<BlogPostPageProps> = (args) => <BlogPostPage {...args} />;

export const Default = DefaultTemplate.bind({});

export const WithNavigation = DefaultTemplate.bind({});
WithNavigation.args = {
    navigation,
};
