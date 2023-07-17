import React from 'react';

import {PageConstructor} from '@gravity-ui/page-constructor';
import type {Meta, StoryFn} from '@storybook/react';

import {getDefaultStoryArgs} from '../../../../.mocks/utils';
import customBlocks from '../../../constructor/blocksMap';
import {PostPageContext} from '../../../contexts/PostPageContext';
import {BannerProps} from '../../../models/blocks';
import {BlockType, PostData} from '../../../models/common';
import {Banner} from '../Banner';

import post from '../../../../.mocks/post.json';

export default {
    title: 'Blocks/Banner',
    component: Banner,
    args: {
        theme: 'light',
    },
    argTypes: {
        color: {
            control: {type: 'color'},
        },
    },
} as Meta;

type BannerModel = {
    type: BlockType.Banner;
} & BannerProps;

const DefaultTemplate: StoryFn<BannerModel> = (args) => (
    <PostPageContext.Provider value={{post: post as PostData}}>
        <PageConstructor content={{blocks: [args]}} custom={customBlocks} />
    </PostPageContext.Provider>
);

export const Default = DefaultTemplate.bind({});

Default.args = {
    type: BlockType.Banner,
    color: '#7ccea0',
    ...getDefaultStoryArgs(),
    title: 'Lorem',
    text: 'Lorem ipsum dolor sit amet',
    additionalInfo: 'consectetur adipiscing elit',
};
