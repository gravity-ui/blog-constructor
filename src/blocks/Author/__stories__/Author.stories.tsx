import React from 'react';

import {Meta, Story} from '@storybook/react/types-6-0';

import {PageConstructor} from '@gravity-ui/page-constructor';

import {getDefaultStoryArgs} from '../../../../.mocks/utils';
import customBlocks from '../../../constructor/blocksMap';
import {PostPageContext} from '../../../contexts/PostPageContext';
import {BLOCKS} from '../../../demo/constants';
import {AuthorProps} from '../../../models/blocks';
import {BlockType, PostData} from '../../../models/common';
import {Author} from '../Author';

import post from '../../../../.mocks/post.json';

export default {
    title: `${BLOCKS}/Author`,
    component: Author,
    args: {
        theme: 'light',
    },
} as Meta;

type AuthorModel = {
    type: BlockType.Author;
} & AuthorProps;

const DefaultTemplate: Story<AuthorModel> = (args) => (
    <PostPageContext.Provider value={{post: post as PostData}}>
        <PageConstructor content={{blocks: [args]}} custom={customBlocks} />
    </PostPageContext.Provider>
);

export const Default = DefaultTemplate.bind({});

Default.args = {
    type: BlockType.Author,
    authorId: 290,
    ...getDefaultStoryArgs(),
};
