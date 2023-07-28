import React from 'react';

import {Block, PageConstructor} from '@gravity-ui/page-constructor';
import type {Meta, StoryFn} from '@storybook/react';

import {blockMockData, getDefaultStoryArgs} from '../../../../.mocks/utils';
import customBlocks from '../../../constructor/blocksMap';
import {PostPageContext} from '../../../contexts/PostPageContext';
import {YFMProps} from '../../../models/blocks';
import {BlockType} from '../../../models/common';
import {YFM} from '../YFM';

export default {
    title: 'Blocks/YFM',
    component: YFM,
    args: {
        theme: 'light',
    },
} as Meta;

type YFMModel = {
    type: BlockType.YFM;
} & YFMProps;

const DefaultTemplate: StoryFn<YFMModel> = (args) => (
    <PostPageContext.Provider value={blockMockData}>
        <PageConstructor content={{blocks: [args] as unknown as Block[]}} custom={customBlocks} />
    </PostPageContext.Provider>
);

export const Default = DefaultTemplate.bind({});

Default.args = {
    type: BlockType.YFM,
    ...getDefaultStoryArgs(),
    text: '<p><strong>Lorem ipsum dolor sit amet</strong> <a href="https://example.com">consectetur adipiscing elit</a> sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>',
} as YFMModel;
