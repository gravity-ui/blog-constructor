import React from 'react';

import {Meta, Story} from '@storybook/react/types-6-0';

import {PageConstructor} from '@gravity-ui/page-constructor';

import {getDefaultStoryArgs} from '../../../../.mocks/utils';
import customBlocks from '../../../constructor/blocksMap';
import {PostPageContext} from '../../../contexts/PostPageContext';
import {BLOCKS} from '../../../demo/constants';
import {CTAProps} from '../../../models/blocks';
import {BlockType, PostData} from '../../../models/common';
import {CTA} from '../CTA';

import contentBlocks from '../../../../.mocks/contentBlocks.json';
import post from '../../../../.mocks/post.json';

export default {
    title: `${BLOCKS}/CTA`,
    component: CTA,
    args: {
        theme: 'light',
    },
} as Meta;

type CTAModel = {
    type: BlockType.CTA;
} & CTAProps;

const DefaultTemplate: Story<CTAModel> = (args) => (
    <PostPageContext.Provider value={{post: post as PostData}}>
        <PageConstructor content={{blocks: [args]}} custom={customBlocks} />
    </PostPageContext.Provider>
);

const ThreeItemsTemplate: Story<CTAModel> = (args) => (
    <PostPageContext.Provider value={{post: post as PostData}}>
        <PageConstructor content={{blocks: [args]}} custom={customBlocks} />
    </PostPageContext.Provider>
);

export const Default = DefaultTemplate.bind({});
export const ThreeItems = ThreeItemsTemplate.bind({});

Default.args = {
    type: BlockType.CTA,
    ...getDefaultStoryArgs(),
    items: contentBlocks,
};
ThreeItems.args = {
    type: BlockType.CTA,
    ...getDefaultStoryArgs(),
    items: contentBlocks.slice(0, 3),
};
