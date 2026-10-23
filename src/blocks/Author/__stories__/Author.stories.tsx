import type {Meta, StoryFn} from '@storybook/react';

import {blockMockData} from '../../../../.mocks/utils';
import {
    STORY_ASSETS_PATH,
    StoryArgs,
    StoryBlock,
    contextDataArgType,
    contextDataParameters,
} from '../../../../.storybook/story-utils';
import {AuthorBlockModel} from '../../../models/blocks';
import {BlockType} from '../../../models/common';
import {Author} from '../Author';

export default {
    title: 'Blocks/Author',
    component: Author,
    argTypes: {contextData: contextDataArgType},
    parameters: contextDataParameters,
} as Meta<StoryArgs<AuthorBlockModel>>;

const DefaultTemplate: StoryFn<StoryArgs<AuthorBlockModel>> = (args) => <StoryBlock args={args} />;

export const Default = DefaultTemplate.bind({});

Default.args = {
    type: BlockType.Author,
    authorId: 290,
    image: `${STORY_ASSETS_PATH}/img_6-12_light.png`,
    paddingTop: 'l',
    paddingBottom: 'l',
    contextData: {postPage: blockMockData},
};
