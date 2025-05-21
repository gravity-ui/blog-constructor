import type {Meta, StoryFn} from '@storybook/react';

import {postPageMockData} from '../../../../.mocks/utils';
import {BlogPostPage, BlogPostPageProps} from '../BlogPostPage';

import navigation from '../../../../.mocks/navigation.json';
import {BlogConstructorProvider} from '../../../constructor/BlogConstructorProvider';
import {CircleInfo} from '@gravity-ui/icons';
import {Button, Icon} from '@gravity-ui/uikit';
import {CustomInfoItemComponent} from '../../../components/PostInfo/PostInfo';

export default {
    title: 'Containers/BlogPostPage',
    component: BlogPostPage,
    args: {
        theme: 'light',
        ...postPageMockData,
    },
} as Meta;

const DefaultTemplate: StoryFn<BlogPostPageProps> = (args) => <BlogPostPage {...args} />;

const ExtraInfoItem: CustomInfoItemComponent = ({post}) => (
    <Button
        view="flat"
        size="xs"
        onClick={() => alert(`Post id is ${post.id}`)}
        style={{font: 'inherit', color: 'inherit'}}
    >
        <Icon data={CircleInfo} />
        Extra Info Item
    </Button>
);

const ExtraItemsTemplate: StoryFn<BlogPostPageProps> = (args) => (
    <BlogConstructorProvider
        settings={{
            extraInfoItems: [ExtraInfoItem],
        }}
    >
        <BlogPostPage {...args} />
    </BlogConstructorProvider>
);

export const Default = DefaultTemplate.bind({});

export const WithNavigation = DefaultTemplate.bind({});
WithNavigation.args = {
    navigation,
} as unknown as BlogPostPageProps;

export const WithExtraInfoItems = ExtraItemsTemplate.bind({});
