import React from 'react';

import {Block, PageConstructor} from '@gravity-ui/page-constructor';
import type {Meta, StoryFn} from '@storybook/react';

import {blockMockData} from '../../../../.mocks/utils';
import customBlocks from '../../../constructor/blocksMap';
import {PostPageContext} from '../../../contexts/PostPageContext';
import {ColoredTextProps} from '../../../models/blocks';
import {BlockType} from '../../../models/common';
import {ColoredText} from '../ColoredText';

export default {
    title: 'Blocks/ColoredText',
    component: ColoredText,
    args: {
        theme: 'light',
    },
} as Meta;

type ColoredTextModel = {
    type: BlockType.ColoredText;
} & ColoredTextProps;

const DefaultTemplate: StoryFn<ColoredTextModel> = (args) => (
    <PostPageContext.Provider value={blockMockData}>
        <PageConstructor content={{blocks: [args] as unknown as Block[]}} custom={customBlocks} />
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
