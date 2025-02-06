import {Block, PageConstructor, Theme} from '@gravity-ui/page-constructor';
import type {Meta, StoryFn} from '@storybook/react';

import {blockMockData, getDefaultStoryArgs} from '../../../../.mocks/utils';
import customBlocks from '../../../constructor/blocksMap';
import {PostPageContext} from '../../../contexts/PostPageContext';
import {CTAProps} from '../../../models/blocks';
import {BlockType} from '../../../models/common';
import {CTA} from '../CTA';

import contentBlocks from '../../../../.mocks/contentBlocks.json';

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
    <PostPageContext.Provider value={blockMockData}>
        <PageConstructor content={{blocks: [args] as unknown as Block[]}} custom={customBlocks} />
    </PostPageContext.Provider>
);

export const Default = DefaultTemplate.bind({});
export const OneItem = DefaultTemplate.bind({});
export const TwoItems = DefaultTemplate.bind({});
export const FourItems = DefaultTemplate.bind({});
export const FiveItems = DefaultTemplate.bind({});
export const SixItems = DefaultTemplate.bind({});
export const Colored = DefaultTemplate.bind({});

Default.args = {
    type: BlockType.CTA,
    ...getDefaultStoryArgs(),
    items: contentBlocks.slice(0, 3),
} as CTAModel;

OneItem.args = {
    type: BlockType.CTA,
    ...getDefaultStoryArgs(),
    items: contentBlocks.slice(0, 1),
} as CTAModel;

TwoItems.args = {
    type: BlockType.CTA,
    ...getDefaultStoryArgs(),
    items: contentBlocks.slice(0, 2),
} as CTAModel;

FourItems.args = {
    type: BlockType.CTA,
    ...getDefaultStoryArgs(),
    items: contentBlocks.slice(0, 4),
} as CTAModel;

FiveItems.args = {
    type: BlockType.CTA,
    ...getDefaultStoryArgs(),
    items: contentBlocks.slice(0, 5),
} as CTAModel;

SixItems.args = {
    type: BlockType.CTA,
    ...getDefaultStoryArgs(),
    items: contentBlocks.slice(0, 6),
} as CTAModel;

Colored.args = {
    type: BlockType.CTA,
    ...getDefaultStoryArgs(),
    items: contentBlocks.slice(0, 3),
    cardBackgroundColor: {
        [Theme.Light]: '#62c6ff',
        [Theme.Dark]: 'pink',
    },
} as CTAModel;
