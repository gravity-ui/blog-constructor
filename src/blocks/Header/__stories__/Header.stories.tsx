import React from 'react';

import {PageConstructor} from '@gravity-ui/page-constructor';
import {Meta, StoryFn} from '@storybook/react';

import {getDefaultStoryArgs} from '../../../../.mocks/utils';
import customBlocks from '../../../constructor/blocksMap';
import {PostPageContext} from '../../../contexts/PostPageContext';
import {HeaderProps} from '../../../models/blocks';
import {BlockType, PostData} from '../../../models/common';
import {Header} from '../Header';

import post from '../../../../.mocks/post.json';

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
    <PostPageContext.Provider value={{post: post as PostData}}>
        <PageConstructor content={{blocks: [args]}} custom={customBlocks} />
    </PostPageContext.Provider>
);

export const Default = DefaultTemplate.bind({});

Default.args = {
    type: BlockType.Header,
    ...getDefaultStoryArgs(),
};
