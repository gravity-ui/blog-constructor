import {Block, PageConstructor} from '@gravity-ui/page-constructor';
import {Meta, StoryFn} from '@storybook/react';

import {blockMockData, getDefaultStoryArgs} from '../../../../.mocks/utils';
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

Default.args = {
    type: BlockType.Header,
    ...getDefaultStoryArgs(),
} as unknown as HeaderModel;
