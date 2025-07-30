import {Block, PageConstructor} from '@gravity-ui/page-constructor';
import {Meta, StoryFn} from '@storybook/react';

import {
    blockMockData,
    getHeaderWithBackgroundStoryArgs,
    getHeaderWithImageOutGridStoryArgs,
    getHeaderWithImageStoryArgs,
} from '../../../../.mocks/utils';
import customBlocks from '../../../constructor/blocksMap';
import {PostPageContext} from '../../../contexts/PostPageContext';
import {HeaderProps} from '../../../models/blocks';
import {BlockType} from '../../../models/common';
import {Header} from '../Header';

export default {
    title: 'Blocks/Header',
    component: Header,
    args: {
        theme: 'light',
    },
} as Meta;

type HeaderModel = {
    type: BlockType.Header;
} & HeaderProps;

const DefaultTemplate: StoryFn<HeaderModel> = (args) => (
    <PostPageContext.Provider value={blockMockData}>
        <PageConstructor content={{blocks: [args] as unknown as Block[]}} custom={customBlocks} />
    </PostPageContext.Provider>
);

export const Default = DefaultTemplate.bind({});
export const ImageOutGrid = DefaultTemplate.bind({});
export const BgImage = DefaultTemplate.bind({});

Default.args = {
    type: BlockType.Header,
    ...getHeaderWithImageStoryArgs(),
} as unknown as HeaderModel;

BgImage.args = {
    type: BlockType.Header,
    ...getHeaderWithBackgroundStoryArgs(),
} as unknown as HeaderModel;

ImageOutGrid.args = {
    type: BlockType.Header,
    ...getHeaderWithImageOutGridStoryArgs(),
} as unknown as HeaderModel;
