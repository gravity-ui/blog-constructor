import {CircleInfo} from '@gravity-ui/icons';
import {Button, Icon} from '@gravity-ui/uikit';
import type {Meta, StoryFn} from '@storybook/react';

import {postPageMockData} from '../../../../.mocks/utils';
import {CustomInfoItemComponent} from '../../../components/PostInfo/PostInfo';
import {BlogConstructorProvider} from '../../../constructor/BlogConstructorProvider';
import {BlogPostPage, BlogPostPageProps} from '../BlogPostPage';

import navigation from '../../../../.mocks/navigation.json';

export default {
    title: 'Containers/BlogPostPage',
    component: BlogPostPage,
    args: {
        ...postPageMockData,
    },
} as Meta;

const DefaultTemplate: StoryFn<BlogPostPageProps> = (args, context) => (
    <BlogPostPage
        {...args}
        settings={{
            ...args.settings,
            theme: context.globals.theme,
        }}
    />
);

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

const ExtraItemsTemplate: StoryFn<BlogPostPageProps> = (args, context) => (
    <BlogConstructorProvider
        settings={{
            extraInfoItems: [ExtraInfoItem],
        }}
    >
        <BlogPostPage
            {...args}
            settings={{
                ...args.settings,
                theme: context.globals.theme,
            }}
        />
    </BlogConstructorProvider>
);

export const Default = DefaultTemplate.bind({});

export const WithNavigation = DefaultTemplate.bind({});
WithNavigation.args = {
    navigation,
} as unknown as BlogPostPageProps;

export const WithExtraInfoItems = ExtraItemsTemplate.bind({});
