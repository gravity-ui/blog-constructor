import React from 'react';

import {Block, PageConstructor} from '@gravity-ui/page-constructor';
import type {Meta, StoryFn} from '@storybook/react';

import {blockMockData, getDefaultStoryArgs} from '../../../../.mocks/utils';
import customBlocks from '../../../constructor/blocksMap';
import {PostPageContext} from '../../../contexts/PostPageContext';
import {BannerProps} from '../../../models/blocks';
import {BlockType} from '../../../models/common';
import {Banner} from '../Banner';

export default {
    title: 'Blocks/Banner',
    component: Banner,
    args: {
        theme: 'light',
    },
    argTypes: {
        color: {
            control: {type: 'color'},
        },
    },
} as Meta;

type BannerModel = {
    type: BlockType.Banner;
} & BannerProps;

const DefaultTemplate: StoryFn<BannerModel> = (args) => (
    <PostPageContext.Provider value={blockMockData}>
        <PageConstructor content={{blocks: [args] as unknown as Block[]}} custom={customBlocks} />
    </PostPageContext.Provider>
);

export const Default = DefaultTemplate.bind({});

Default.args = {
    type: BlockType.Banner,
    color: '#7ccea0',
    ...getDefaultStoryArgs(),
    title: 'Lorem',
    text: 'Lorem ipsum dolor sit amet',
    additionalInfo: 'consectetur adipiscing elit',
} as BannerModel;
