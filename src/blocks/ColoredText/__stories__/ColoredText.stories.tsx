import type {Meta, StoryFn} from '@storybook/react';

import {STORY_ASSETS_PATH, StoryArgs, StoryBlock} from '../../../../.storybook/story-utils';
import {ColoredTextBlockModel} from '../../../models/blocks';
import {BlockType} from '../../../models/common';
import {ColoredText} from '../ColoredText';

export default {
    title: 'Blocks/ColoredText',
    component: ColoredText,
} as Meta<StoryArgs<ColoredTextBlockModel>>;

const DefaultTemplate: StoryFn<StoryArgs<ColoredTextBlockModel>> = (args) => (
    <StoryBlock args={args} />
);

export const Default = DefaultTemplate.bind({});

Default.args = {
    type: BlockType.ColoredText,
    background: {
        color: '#000000',
        image: `${STORY_ASSETS_PATH}/img_8-12_light.png`,
        altText: 'test',
    },
    text: 'Lorem ipsum dolor sit amet',
    paddingTop: 'l',
    paddingBottom: 'l',
};
