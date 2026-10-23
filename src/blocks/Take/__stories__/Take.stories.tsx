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
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    author: {
        firstName: 'Lorem',
        secondName: 'Ipsum dolor',
        description: 'Lorem ipsum dolor sit amet"',
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
