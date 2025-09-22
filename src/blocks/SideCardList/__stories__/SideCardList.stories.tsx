import {Block, PageConstructor} from '@gravity-ui/page-constructor';
import type {Meta, StoryFn} from '@storybook/react';

import {blockMockData, getSideCardListStoryArgs} from '../../../../.mocks/utils';
import customBlocks from '../../../constructor/blocksMap';
import {PostPageContext} from '../../../contexts/PostPageContext';
import {SideCardListProps} from '../../../models/blocks';
import {BlockType} from '../../../models/common';
import {SideCardList} from '../SideCardList';

export default {
    title: 'Blocks/SideCardList',
    component: SideCardList,
    args: {
        theme: 'light',
    },
} as Meta;

type SideCardListModel = {
    type: BlockType.SideCardList;
} & SideCardListProps;

const DefaultTemplate: StoryFn<SideCardListModel> = (args) => (
    <PostPageContext.Provider value={blockMockData}>
        <PageConstructor content={{blocks: [args] as unknown as Block[]}} custom={customBlocks} />
    </PostPageContext.Provider>
);

export const Default = DefaultTemplate.bind({});

Default.args = {
    type: BlockType.SideCardList,
    ...(getSideCardListStoryArgs() as SideCardListProps),
};
