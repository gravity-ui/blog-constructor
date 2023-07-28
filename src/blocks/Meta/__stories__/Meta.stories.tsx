import React from 'react';

import {Block, PageConstructor} from '@gravity-ui/page-constructor';
import {Meta, StoryFn} from '@storybook/react';

import {blockMockData} from '../../../../.mocks/utils';
import customBlocks from '../../../constructor/blocksMap';
import {PostPageContext} from '../../../contexts/PostPageContext';
import {MetaProps} from '../../../models/blocks';
import {BlockType} from '../../../models/common';
import {Meta as MetaBlock} from '../Meta';

export default {
    title: 'Blocks/Meta',
    component: MetaBlock,
    args: {
        theme: 'light',
    },
} as Meta;

type MetaModel = {
    type: BlockType.Meta;
} & MetaProps;

const DefaultTemplate: StoryFn<MetaModel> = (args) => (
    <PostPageContext.Provider value={blockMockData}>
        <PageConstructor content={{blocks: [args] as unknown as Block[]}} custom={customBlocks} />
    </PostPageContext.Provider>
);

export const Default = DefaultTemplate.bind({});

Default.args = {
    type: BlockType.Meta,
    paddingBottom: 'l',
    paddingTop: 'l',
};
