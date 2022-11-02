import React from 'react';

import {PageConstructor} from '@gravity-ui/page-constructor';
import {Meta, Story} from '@storybook/react/types-6-0';

import {BlockType, BlogPostData} from '../../../models/blog';

import customBlocks from '../../../constructor/blocksMap';
import {BLOCKS} from '../../../demo/constants';
import {BlogPageContext} from '../../../contexts/BlogPageContext';
import post from '../../../../.mocks/post.json';

import {BlogCTABlock, CTABlockProps} from '../BlogCTA';

export default {
    title: `${BLOCKS}/BlogCTABlock`,
    component: BlogCTABlock,
    args: {
        theme: 'light',
    },
} as Meta;

type ColoredTextProps = {
    type: BlockType.BlogCTABlock;
} & CTABlockProps;

const DefaultTemplate: Story<ColoredTextProps> = (args) => (
    <BlogPageContext.Provider value={{post: post as BlogPostData}}>
        <PageConstructor content={{blocks: [args]}} custom={customBlocks} />
    </BlogPageContext.Provider>
);

export const Default = DefaultTemplate.bind({});

Default.args = {
    type: BlockType.BlogCTABlock,
    columnCount: 3,
    paddingBottom: 'l',
    paddingTop: 'l',
    items: [
        {
            title: 'Call to Action Item #1',
            text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
            links: [
                {
                    url: '#',
                    text: 'Link #1',
                    arrow: true,
                },
            ],
        },
        {
            title: 'Call to Action Item #2',
            text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
            links: [
                {
                    url: '#',
                    text: 'Link #2',
                    arrow: true,
                },
            ],
        },
    ],
};
