import React from 'react';

import {Block, PageConstructor} from '@gravity-ui/page-constructor';
import type {Meta, StoryFn} from '@storybook/react';

import {blockMockData, getDefaultStoryArgs} from '../../../../.mocks/utils';
import customBlocks from '../../../constructor/blocksMap';
import {PostPageContext} from '../../../contexts/PostPageContext';
import {AuthorProps} from '../../../models/blocks';
import {BlockType} from '../../../models/common';
import {Author} from '../Author';

export default {
    title: 'Blocks/Author',
    component: Author,
    args: {
        theme: 'light',
    },
} as Meta;

type AuthorModel = {
    type: BlockType.Author;
} & AuthorProps;

const DefaultTemplate: StoryFn<AuthorModel> = (args) => (
    <PostPageContext.Provider value={blockMockData}>
        <PageConstructor content={{blocks: [args] as unknown as Block[]}} custom={customBlocks} />
    </PostPageContext.Provider>
);

export const Default = DefaultTemplate.bind({});

Default.args = {
    type: BlockType.Author,
    authorId: 290,
    ...getDefaultStoryArgs(),
} as AuthorModel;
