import {Block, PageConstructor} from '@gravity-ui/page-constructor';
import {Meta, StoryFn} from '@storybook/react';

import {blockMockData, getTakeStoryArgs} from '../../../../.mocks/utils';
import customBlocks from '../../../constructor/blocksMap';
import {PostPageContext} from '../../../contexts/PostPageContext';
import {TakeProps} from '../../../models/blocks';
import {BlockType} from '../../../models/common';
import {Take} from '../Take';

export default {
    title: 'Blocks/Take',
    component: Take,
    args: {
        theme: 'light',
    },
} as Meta;

type TakeModel = {
    type: BlockType.Take;
} & TakeProps;

const DefaultTemplate: StoryFn<TakeModel> = (args) => (
    <PostPageContext.Provider value={blockMockData}>
        <PageConstructor content={{blocks: [args] as unknown as Block[]}} custom={customBlocks} />
    </PostPageContext.Provider>
);

export const Default = DefaultTemplate.bind({});

Default.args = {
    type: BlockType.Take,
    ...getTakeStoryArgs(),
} as TakeModel;

export const CustomColor = DefaultTemplate.bind({});

CustomColor.args = {
    type: BlockType.Take,
    color: '#7CE28E',
    ...getTakeStoryArgs(),
} as TakeModel;

export const NoBackground = DefaultTemplate.bind({});

NoBackground.args = {
    type: BlockType.Take,
    noBackground: true,
    ...getTakeStoryArgs(),
} as TakeModel;

export const CustomColorNoBackground = DefaultTemplate.bind({});

CustomColorNoBackground.args = {
    type: BlockType.Take,
    color: '#A87CEF',
    noBackground: true,
    ...getTakeStoryArgs(),
} as TakeModel;
