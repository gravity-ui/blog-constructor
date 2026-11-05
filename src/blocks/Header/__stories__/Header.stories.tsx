import type {Meta, StoryFn} from '@storybook/react';

import {blockMockData} from '../../../../.mocks/utils';
import {
    STORY_ASSETS_PATH,
    StoryArgs,
    StoryBlock,
    contextDataArgType,
    contextDataParameters,
} from '../../../../.storybook/story-utils';
import {HeaderBlockModel} from '../../../models/blocks';
import {BlockType} from '../../../models/common';
import {Header} from '../Header';

export default {
    title: 'Blocks/Header',
    component: Header,
    argTypes: {contextData: contextDataArgType},
    parameters: contextDataParameters,
} as Meta<StoryArgs<HeaderBlockModel>>;

const DefaultTemplate: StoryFn<StoryArgs<HeaderBlockModel>> = (args) => <StoryBlock args={args} />;

const commonArgs: StoryArgs<HeaderBlockModel> = {
    type: BlockType.Header,
    title: blockMockData.post.htmlTitle || blockMockData.post.title,
    paddingTop: 'l',
    paddingBottom: 'l',
    contextData: {postPage: blockMockData},
};

export const Default = DefaultTemplate.bind({});
export const ImageOutGrid = DefaultTemplate.bind({});
export const BgImage = DefaultTemplate.bind({});

Default.args = {
    ...commonArgs,
    image: {
        light: `${STORY_ASSETS_PATH}/img_8-12_light.png`,
        dark: `${STORY_ASSETS_PATH}/img_8-12_dark.png`,
    },
};

ImageOutGrid.args = {
    ...commonArgs,
    image: {
        light: `${STORY_ASSETS_PATH}/img_8-12_light.png`,
        dark: `${STORY_ASSETS_PATH}/img_8-12_dark.png`,
    },
    imageInGrid: false,
    background: {
        light: {color: '#eef2f8'},
        dark: {color: '#262626'},
    },
};

BgImage.args = {
    ...commonArgs,
    background: {
        light: {url: `${STORY_ASSETS_PATH}/img_8-12_light.png`},
        dark: {url: `${STORY_ASSETS_PATH}/img_8-12_dark.png`},
    },
};
