import React from 'react';

import {PageConstructor} from '@gravity-ui/page-constructor';
import {Meta, Story} from '@storybook/react/types-6-0';

import {getDefaultStoryArgs} from '../../../../.mocks/utils';
import customBlocks from '../../../constructor/blocksMap';
import {PostPageContext} from '../../../contexts/PostPageContext';
import {BLOCKS} from '../../../demo/constants';
import {HeaderProps} from '../../../models/blocks';
import {BlockStandsAloneType, PostData} from '../../../models/common';
import {Header} from '../Header';

import post from '../../../../.mocks/post.json';

export default {
    title: `${BLOCKS}/Header`,
    component: Header,
    args: {
        theme: 'light',
    },
} as Meta;

type HeaderModel = {
    type: BlockStandsAloneType.Header;
} & HeaderProps;

const DefaultTemplate: Story<HeaderModel> = (args) => (
    <PostPageContext.Provider value={{post: post as PostData}}>
        <PageConstructor content={{blocks: [args]}} custom={customBlocks} />
    </PostPageContext.Provider>
);

export const Default = DefaultTemplate.bind({});

Default.args = {
    type: BlockStandsAloneType.Header,
    ...getDefaultStoryArgs(),
};
