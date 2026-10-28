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
            image: {src: `${STORY_ASSETS_PATH}/logotype-cube.svg`, alt: 'card 1'},
            description: 'Lorem ipsum dolor sit amet lorem ipsum dolor sit amet dolor sit amet',
            url: 'https://example.com',
        },
        {
            image: {src: `${STORY_ASSETS_PATH}/logotype-long.svg`, alt: 'card 2'},
            description: 'Lorem ipsum dolor sit amet lorem ipsum dolor sit amet dolor sit amet',
            url: 'https://example.com',
        },
    ],
};
