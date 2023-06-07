import React from 'react';

import {PageConstructor} from '@gravity-ui/page-constructor';
import {Meta, Story} from '@storybook/react/types-6-0';

import {getDefaultStoryArgs} from '../../../../.mocks/utils';
import customBlocks from '../../../constructor/blocksMap';
import {PostPageContext} from '../../../contexts/PostPageContext';
import {BLOCKS} from '../../../demo/constants';
import {BannerProps} from '../../../models/blocks';
import {BlockInColumnsType, PostData} from '../../../models/common';
import {Banner} from '../Banner';

import post from '../../../../.mocks/post.json';

export default {
    title: `${BLOCKS}/Banner`,
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
    type: BlockInColumnsType.Banner;
} & BannerProps;

const DefaultTemplate: Story<BannerModel> = (args) => (
    <PostPageContext.Provider value={{post: post as PostData}}>
        <PageConstructor content={{blocks: [args]}} custom={customBlocks} />
    </PostPageContext.Provider>
);

export const Default = DefaultTemplate.bind({});

Default.args = {
    type: BlockInColumnsType.Banner,
    color: '#7ccea0',
    ...getDefaultStoryArgs(),
    title: 'Lorem',
    text: 'Lorem ipsum dolor sit amet',
    additionalInfo: 'consectetur adipiscing elit',
};
