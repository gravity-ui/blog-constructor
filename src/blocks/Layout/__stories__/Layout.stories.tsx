import {Block, PageConstructor} from '@gravity-ui/page-constructor';
import type {Meta, StoryFn} from '@storybook/react';

import {blockMockData, getDefaultStoryArgs} from '../../../../.mocks/utils';
import customBlocks from '../../../constructor/blocksMap';
import {PostPageContext} from '../../../contexts/PostPageContext';
import {LayoutProps} from '../../../models/blocks';
import {BlockType} from '../../../models/common';
import {Layout} from '../Layout';

import layoutBlock from '../../../../.mocks/layoutBlock.json';

export default {
    title: 'Blocks/Layout',
    component: Layout,
    args: {
        theme: 'light',
    },
} as Meta;

type LayoutModel = {
    type: BlockType.Layout;
} & LayoutProps;

const DefaultTemplate: StoryFn<LayoutModel> = (args) => (
    <PostPageContext.Provider value={blockMockData}>
        <PageConstructor content={{blocks: [args] as unknown as Block[]}} custom={customBlocks} />
    </PostPageContext.Provider>
);

export const Default = DefaultTemplate.bind({});

Default.args = {
    type: BlockType.Layout,
    ...getDefaultStoryArgs(),
    children: layoutBlock.children,
} as unknown as LayoutModel;
