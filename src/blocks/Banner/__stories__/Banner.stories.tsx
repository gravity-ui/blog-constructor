import type {Meta, StoryFn} from '@storybook/react';

import {STORY_ASSETS_PATH, StoryArgs, StoryBlock} from '../../../../.storybook/story-utils';
import {BannerBlockModel} from '../../../models/blocks';
import {BlockType} from '../../../models/common';
import {Banner} from '../Banner';

export default {
    title: 'Blocks/Banner',
    component: Banner,
    argTypes: {
        color: {control: {type: 'color'}},
    },
} as Meta<StoryArgs<BannerBlockModel>>;

const DefaultTemplate: StoryFn<StoryArgs<BannerBlockModel>> = (args) => <StoryBlock args={args} />;

export const Default = DefaultTemplate.bind({});

Default.args = {
    type: BlockType.Banner,
    title: 'Blog',
    text: 'Lorem ipsum dolor sit amet',
    additionalInfo: 'Consectetur adipiscing elit',
    color: '#7ccea0',
    image: `${STORY_ASSETS_PATH}/img_8-12_light.png`,
    imageSize: 's',
    paddingTop: 'l',
    paddingBottom: 'l',
};
