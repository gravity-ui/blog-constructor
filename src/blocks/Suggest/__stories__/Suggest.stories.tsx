import type {Meta, StoryFn} from '@storybook/react';

import {blockMockData} from '../../../../.mocks/utils';
import {
    StoryArgs,
    StoryBlock,
    contextDataArgType,
    contextDataParameters,
} from '../../../../.storybook/story-utils';
import {SuggestBlockModel} from '../../../models/blocks';
import {BlockType} from '../../../models/common';
import {Suggest} from '../Suggest';

export default {
    title: 'Blocks/Suggest',
    component: Suggest,
    argTypes: {contextData: contextDataArgType},
    parameters: contextDataParameters,
} as Meta<StoryArgs<SuggestBlockModel>>;

const DefaultTemplate: StoryFn<StoryArgs<SuggestBlockModel>> = (args) => <StoryBlock args={args} />;

export const Default = DefaultTemplate.bind({});

Default.args = {
    type: BlockType.Suggest,
    posts: blockMockData.suggestedPosts,
    paddingTop: 'l',
    paddingBottom: 'l',
    contextData: {postPage: blockMockData},
};
