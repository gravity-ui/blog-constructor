import React from 'react';

import {Meta, Story} from '@storybook/react/types-6-0';

import {generatePostPageData} from '../../../../.mocks/utils';
import {CONTAINERS} from '../../../demo/constants';
import {BlogPostPage, BlogPostPageProps} from '../BlogPostPage';

import navigation from '../../../../.mocks/navigation.json';

export default {
    title: `${CONTAINERS}/BlogPostPage`,
    component: BlogPostPage,
    args: {
        theme: 'light',
        ...generatePostPageData(),
    },
} as Meta;

const DefaultTemplate: Story<BlogPostPageProps> = (args) => <BlogPostPage {...args} />;

export const Default = DefaultTemplate.bind({});

export const WithNavigation = DefaultTemplate.bind({});
WithNavigation.args = {
    navigation,
};
