import React from 'react';

import {PageConstructor} from '@gravity-ui/page-constructor';
import {Meta, Story} from '@storybook/react/types-6-0';

import customBlocks from '../../../constructor/blocksMap';
import {PostPageContext} from '../../../contexts/PostPageContext';
import {BLOCKS} from '../../../demo/constants';
import {SuggestProps} from '../../../models/blocks';
import {BlockStandsAloneType} from '../../../models/common';
import {Suggest} from '../Suggest';

import post from '../../../../.mocks/post.json';
import suggestedPosts from '../../../../.mocks/suggestedPosts.json';

export default {
    title: `${BLOCKS}/Suggest`,
    component: Suggest,
    args: {
        theme: 'light',
    },
} as Meta;

type SuggestModel = {
    type: BlockStandsAloneType.Suggest;
} & SuggestProps;

const DefaultTemplate: Story<SuggestModel> = (args) => (
    <PostPageContext.Provider value={{post, suggestedPosts}}>
        <PageConstructor content={{blocks: [args]}} custom={customBlocks} />
    </PostPageContext.Provider>
);

export const Default = DefaultTemplate.bind({});

Default.args = {
    type: BlockStandsAloneType.Suggest,
    paddingBottom: 'l',
    paddingTop: 'l',
};
