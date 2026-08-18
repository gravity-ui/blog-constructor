import transform from '@diplodoc/transform';
import {Block, PageConstructor} from '@gravity-ui/page-constructor';
import {Meta, StoryFn} from '@storybook/react';

import {blockMockData, getTakeStoryArgs} from '../../../../.mocks/utils';
import customBlocks from '../../../constructor/blocksMap';
import {PostPageContext} from '../../../contexts/PostPageContext';
import {TakeProps} from '../../../models/blocks';
import {BlockType} from '../../../models/common';
import {Take} from '../Take';

export default {
    title: 'Blocks/Take',
    component: Take,
    args: {
        theme: 'light',
    },
} as Meta;

type TakeModel = {
    type: BlockType.Take;
} & TakeProps;

const DefaultTemplate: StoryFn<TakeModel> = (args) => (
    <PostPageContext.Provider value={blockMockData}>
        <PageConstructor content={{blocks: [args] as unknown as Block[]}} custom={customBlocks} />
    </PostPageContext.Provider>
);

export const Default = DefaultTemplate.bind({});

Default.args = {
    type: BlockType.Take,
    ...getTakeStoryArgs(),
} as TakeModel;

export const CustomColor = DefaultTemplate.bind({});

CustomColor.args = {
    type: BlockType.Take,
    color: '#FF5F5E',
    ...getTakeStoryArgs(),
} as TakeModel;

export const NoBackground = DefaultTemplate.bind({});

NoBackground.args = {
    type: BlockType.Take,
    noBackground: true,
    ...getTakeStoryArgs(),
} as TakeModel;

export const CustomColorNoBackground = DefaultTemplate.bind({});

CustomColorNoBackground.args = {
    type: BlockType.Take,
    color: '#A87CEF',
    noBackground: true,
    ...getTakeStoryArgs(),
} as TakeModel;

export const LinkAndSections = DefaultTemplate.bind({});

LinkAndSections.args = {
    type: BlockType.Take,
    ...getTakeStoryArgs(),
    text: transform(
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. [Read more](https://example.com).\n\n' +
            'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        {lang: 'en'},
    ).result.html,
} as TakeModel;
