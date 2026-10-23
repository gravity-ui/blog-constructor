import type {Meta, StoryFn} from '@storybook/react';

import {STORY_ASSETS_PATH, StoryArgs, StoryBlock} from '../../../../.storybook/story-utils';
import {TakeBlockModel} from '../../../models/blocks';
import {BlockType} from '../../../models/common';
import {Take} from '../Take';

export default {
    title: 'Blocks/Take',
    component: Take,
} as Meta<StoryArgs<TakeBlockModel>>;

const DefaultTemplate: StoryFn<StoryArgs<TakeBlockModel>> = (args) => <StoryBlock args={args} />;

const commonArgs: StoryArgs<TakeBlockModel> = {
    type: BlockType.Take,
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam.',
    author: {
        firstName: 'Lorem',
        secondName: 'Ipsum',
        description: 'Cloud architect',
        avatar: `${STORY_ASSETS_PATH}/img_6-12_light.png`,
    },
    paddingTop: 'l',
    paddingBottom: 'l',
    paddingLeft: 'm',
    paddingRight: 'm',
};

export const Default = DefaultTemplate.bind({});
export const CustomColor = DefaultTemplate.bind({});
export const NoBackground = DefaultTemplate.bind({});
export const CustomColorNoBackground = DefaultTemplate.bind({});

Default.args = commonArgs;
CustomColor.args = {...commonArgs, color: '#ff5f5e'};
NoBackground.args = {...commonArgs, noBackground: true};
CustomColorNoBackground.args = {...commonArgs, color: '#a87cef', noBackground: true};
