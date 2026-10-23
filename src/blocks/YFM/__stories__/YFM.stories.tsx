import type {Meta, StoryFn} from '@storybook/react';

import {StoryArgs, StoryBlock} from '../../../../.storybook/story-utils';
import {YFMBlockModel} from '../../../models/blocks';
import {BlockType} from '../../../models/common';
import {YFM} from '../YFM';

export default {
    title: 'Blocks/YFM',
    component: YFM,
} as Meta<StoryArgs<YFMBlockModel>>;

const DefaultTemplate: StoryFn<StoryArgs<YFMBlockModel>> = (args) => <StoryBlock args={args} />;

export const Default = DefaultTemplate.bind({});

Default.args = {
    type: BlockType.YFM,
    text: '<p><strong>Lorem ipsum dolor sit amet</strong> <a href="https://example.com">consectetur adipiscing elit</a> sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>',
    paddingTop: 'l',
    paddingBottom: 'l',
    paddingLeft: 'm',
    paddingRight: 'm',
};
