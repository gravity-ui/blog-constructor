import React from 'react';

import {PageConstructor} from '@gravity-ui/page-constructor';
import {Meta, Story} from '@storybook/react/types-6-0';

import {getDefaultStoryArgs} from '../../../../.mocks/utils';
import customBlocks from '../../../constructor/blocksMap';
import {PostPageContext} from '../../../contexts/PostPageContext';
import {BLOCKS} from '../../../demo/constants';
import {LayoutProps} from '../../../models/blocks';
import {BlockStandsAloneType, PostData} from '../../../models/common';
import {Layout} from '../Layout';

import layoutBlock from '../../../../.mocks/layoutBlock.json';
import post from '../../../../.mocks/post.json';

export default {
    title: `${BLOCKS}/Layout`,
    component: Layout,
    args: {
        theme: 'light',
    },
} as Meta;

type LayoutModel = {
    type: BlockStandsAloneType.Layout;
} & LayoutProps;

const DefaultTemplate: Story<LayoutModel> = (args) => (
    <PostPageContext.Provider value={{post: post as PostData}}>
        <PageConstructor content={{blocks: [args]}} custom={customBlocks} />
    </PostPageContext.Provider>
);

export const Default = DefaultTemplate.bind({});

Default.args = {
    type: BlockStandsAloneType.Layout,
    ...getDefaultStoryArgs(),
    children: layoutBlock.children,
};
