import type {Meta, StoryFn} from '@storybook/react';

import {postPageMockData} from '../../../../.mocks/utils';
import {BlogPostPage, BlogPostPageProps} from '../BlogPostPage';

import navigation from '../../../../.mocks/navigation.json';
import {BlogConstructorProvider} from '../../../constructor/BlogConstructorProvider';
import {CircleInfo, CommentDot} from '@gravity-ui/icons';
import {Popover, PopoverProps} from '@gravity-ui/uikit';

export default {
    title: 'Containers/BlogPostPage',
    component: BlogPostPage,
    args: {
        theme: 'light',
        ...postPageMockData,
    },
} as Meta;

const DefaultTemplate: StoryFn<BlogPostPageProps> = (args) => <BlogPostPage {...args} />;

const ExtraButtonsTemplate: StoryFn<BlogPostPageProps> = (args) => (
    <BlogConstructorProvider
        settings={{
            extraInfoButtons: [
                {
                    icon: CircleInfo,
                    text: 'Custom render with popup',
                    render: ({post, children}) => (
                        <Popover
                            style={{width: 300, padding: 16}}
                            content={`${post.id}: ${post.title}`}
                            trigger="click"
                            strategy="fixed"
                        >
                            {children as PopoverProps['children']}
                        </Popover>
                    ),
                },
                {
                    icon: CommentDot,
                    text: 'With click handler',
                    onClick: (post) => alert(`Post id is ${post.id}`),
                },
            ],
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

export const WithExtraInfoButtons = ExtraButtonsTemplate.bind({});
