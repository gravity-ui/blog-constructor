import React from 'react';

import {PageConstructor} from '@gravity-ui/page-constructor';
import type {Meta, StoryFn} from '@storybook/react';

import {getDefaultStoryArgs} from '../../../../.mocks/utils';
import customBlocks from '../../../constructor/blocksMap';
import {PostPageContext} from '../../../contexts/PostPageContext';
import {CTAProps} from '../../../models/blocks';
import {BlockType, PostData} from '../../../models/common';
import {CTA} from '../CTA';

import contentBlocks from '../../../../.mocks/contentBlocks.json';
import post from '../../../../.mocks/post.json';

export default {
    title: 'Blocks/CTA',
    component: CTA,
    args: {
        theme: 'light',
    },
} as Meta;

type CTAModel = {
    type: BlockType.CTA;
} & CTAProps;

const DefaultTemplate: StoryFn<CTAModel> = (args) => (
    <PostPageContext.Provider value={{post: post as PostData}}>
        <PageConstructor content={{blocks: [args]}} custom={customBlocks} />
    </PostPageContext.Provider>
);

export const Default = DefaultTemplate.bind({});
export const OneItem = DefaultTemplate.bind({});
export const TwoItems = DefaultTemplate.bind({});
export const FourItems = DefaultTemplate.bind({});
export const FiveItems = DefaultTemplate.bind({});
export const SixItems = DefaultTemplate.bind({});

Default.args = {
    type: BlockType.CTA,
    ...getDefaultStoryArgs(),
    items: contentBlocks.slice(0, 3),
};

OneItem.args = {
    type: BlockType.CTA,
    ...getDefaultStoryArgs(),
    items: contentBlocks.slice(0, 1),
};

TwoItems.args = {
    type: BlockType.CTA,
    ...getDefaultStoryArgs(),
    items: contentBlocks.slice(0, 2),
};

FourItems.args = {
    type: BlockType.CTA,
    ...getDefaultStoryArgs(),
    items: contentBlocks.slice(0, 4),
};

FiveItems.args = {
    type: BlockType.CTA,
    ...getDefaultStoryArgs(),
    items: contentBlocks.slice(0, 5),
};

SixItems.args = {
    type: BlockType.CTA,
    ...getDefaultStoryArgs(),
    items: contentBlocks.slice(0, 6),
};
