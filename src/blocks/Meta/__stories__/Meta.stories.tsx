import type {Meta, StoryFn} from '@storybook/react';

import {blockMockData} from '../../../../.mocks/utils';
import {
    StoryArgs,
    StoryBlock,
    contextDataArgType,
    contextDataParameters,
} from '../../../../.storybook/story-utils';
import {MetaBlockModel} from '../../../models/blocks';
import {BlockType} from '../../../models/common';
import {Meta as MetaBlock} from '../Meta';

export default {
    title: 'Blocks/Meta',
    component: MetaBlock,
    argTypes: {contextData: contextDataArgType},
    parameters: contextDataParameters,
} as Meta<StoryArgs<MetaBlockModel>>;

const DefaultTemplate: StoryFn<StoryArgs<MetaBlockModel>> = (args) => <StoryBlock args={args} />;

export const Default = DefaultTemplate.bind({});

Default.args = {
    type: BlockType.Meta,
    locale: 'en',
    theme: 'light',
    paddingTop: 'l',
    paddingBottom: 'l',
    contextData: {postPage: blockMockData},
};
