import {Meta, StoryFn} from '@storybook/react';

import {getCompactMediaStoryArgs} from '../../../../.mocks/utils';
import {MediaProps} from '../../../models/blocks';
import {BlockType} from '../../../models/common';
import {CompactMedia} from '../CompactMedia';

export default {
    title: 'Blocks/CompactMedia',
    component: CompactMedia,
    args: {
        theme: 'light',
    },
} as Meta;

type CompactMediaModel = {
    type: BlockType.CompactMedia;
} & MediaProps;

const DefaultTemplate: StoryFn<CompactMediaModel> = (args) => <CompactMedia {...args} />;

export const Default = DefaultTemplate.bind({});

Default.args = {
    type: BlockType.CompactMedia,
    ...getCompactMediaStoryArgs(),
} as CompactMediaModel;
