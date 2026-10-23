import type {Meta, StoryFn} from '@storybook/react';

import {STORY_ASSETS_PATH, StoryArgs, StoryBlock} from '../../../../.storybook/story-utils';
import {SideCardListBlockModel} from '../../../models/blocks';
import {BlockType} from '../../../models/common';
import {SideCardList} from '../SideCardList';

export default {
    title: 'Blocks/SideCardList',
    component: SideCardList,
} as Meta<StoryArgs<SideCardListBlockModel>>;

const DefaultTemplate: StoryFn<StoryArgs<SideCardListBlockModel>> = (args) => (
    <StoryBlock args={args} />
);

export const Default = DefaultTemplate.bind({});

Default.args = {
    type: BlockType.SideCardList,
    title: 'Side card list',
    paddingTop: 'l',
    paddingBottom: 'l',
    items: [
        {
            image: {src: `${STORY_ASSETS_PATH}/logotype-cube.svg`, alt: 'Cube logo'},
            description: 'Lorem ipsum dolor sit amet.',
            url: 'https://example.com/first',
        },
        {
            image: {src: `${STORY_ASSETS_PATH}/logotype-long.svg`, alt: 'Long logo'},
            description: 'Consectetur adipiscing elit.',
            url: 'https://example.com/second',
        },
    ],
};
