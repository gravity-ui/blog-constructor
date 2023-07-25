import React from 'react';

import {Block, PageConstructor} from '@gravity-ui/page-constructor';
import {Meta, StoryFn} from '@storybook/react';

import {blockMockData} from '../../../../.mocks/utils';
import customBlocks from '../../../constructor/blocksMap';
import {PostPageContext} from '../../../contexts/PostPageContext';
import {SuggestProps} from '../../../models/blocks';
import {BlockType} from '../../../models/common';
import {Suggest} from '../Suggest';

export default {
    title: 'Blocks/Suggest',
    component: Suggest,
    args: {
        theme: 'light',
    },
} as Meta;

type SuggestModel = {
    type: BlockType.Suggest;
} & SuggestProps;

const DefaultTemplate: StoryFn<SuggestModel> = (args) => (
    <PostPageContext.Provider value={blockMockData}>
        <PageConstructor content={{blocks: [args] as unknown as Block[]}} custom={customBlocks} />
    </PostPageContext.Provider>
);

export const Default = DefaultTemplate.bind({});

Default.args = {
    type: BlockType.Suggest,
    paddingBottom: 'l',
    paddingTop: 'l',
};
