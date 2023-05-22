import React from 'react';

import {PageConstructor} from '@gravity-ui/page-constructor';
import {Meta, Story} from '@storybook/react/types-6-0';

import {getDefaultStoryArgs} from '../../../../.mocks/utils';
import customBlocks from '../../../constructor/blocksMap';
import {PostPageContext} from '../../../contexts/PostPageContext';
import {BLOCKS} from '../../../demo/constants';
import {YFMProps} from '../../../models/blocks';
import {BlockType, PostData} from '../../../models/common';
import {YFM} from '../YFM';

import post from '../../../../.mocks/post.json';

export default {
    title: `${BLOCKS}/YFM`,
    component: YFM,
    args: {
        theme: 'light',
    },
} as Meta;

type YFMModel = {
    type: BlockType.YFM;
} & YFMProps;

const DefaultTemplate: Story<YFMModel> = (args) => (
    <PostPageContext.Provider value={{post: post as PostData}}>
        <PageConstructor content={{blocks: [args]}} custom={customBlocks} />
    </PostPageContext.Provider>
);

export const Default = DefaultTemplate.bind({});

Default.args = {
    type: BlockType.YFM,
    ...getDefaultStoryArgs(),
    text: '<p><strong>Lorem ipsum dolor sit amet</strong> <a href="https://example.com">consectetur adipiscing elit</a> sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>',
};
