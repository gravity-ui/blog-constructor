import React from 'react';

import {Meta, Story} from '@storybook/react/types-6-0';

import {PageConstructor} from '@gravity-ui/page-constructor';

import customBlocks from '../../../constructor/blocksMap';
import {PostPageContext} from '../../../contexts/PostPageContext';
import {BLOCKS} from '../../../demo/constants';
import {ColoredTextProps} from '../../../models/blocks';
import {BlockType, PostData} from '../../../models/common';
import {ColoredText} from '../ColoredText';

import post from '../../../../.mocks/post.json';

export default {
    title: `${BLOCKS}/ColoredText`,
    component: ColoredText,
    args: {
        theme: 'light',
    },
} as Meta;

type ColoredTextModel = {
    type: BlockType.ColoredText;
} & ColoredTextProps;

const DefaultTemplate: Story<ColoredTextModel> = (args) => (
    <PostPageContext.Provider value={{post: post as PostData}}>
        <PageConstructor content={{blocks: [args]}} custom={customBlocks} />
    </PostPageContext.Provider>
);

export const Default = DefaultTemplate.bind({});

Default.args = {
    type: BlockType.ColoredText,
    background: {
        color: '#000',
        image: 'https://storage.yandexcloud.net/cloud-www-assets/constructor/storybook/images/img_8-12_light.png',
        altText: 'test',
    },
    text: 'Lorem ipsum dolor sit amet',
    paddingBottom: 'l',
    paddingTop: 'l',
};
