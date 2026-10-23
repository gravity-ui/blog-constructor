import type {Meta, StoryFn} from '@storybook/react';

import {STORY_ASSETS_PATH, StoryArgs, StoryBlock} from '../../../../.storybook/story-utils';
import {CompactMediaBlockModel} from '../../../models/blocks';
import {BlockType} from '../../../models/common';
import {CompactMedia} from '../CompactMedia';

export default {
    title: 'Blocks/CompactMedia',
    component: CompactMedia,
} as Meta<StoryArgs<CompactMediaBlockModel>>;

const DefaultTemplate: StoryFn<StoryArgs<CompactMediaBlockModel>> = (args) => (
    <StoryBlock args={args} />
);

export const Default = DefaultTemplate.bind({});

Default.args = {
    type: BlockType.CompactMedia,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    image: `${STORY_ASSETS_PATH}/logotype-cube.svg`,
    paddingTop: 'l',
    paddingBottom: 'l',
    paddingLeft: 'm',
    paddingRight: 'm',
};
