import React from 'react';

import {Meta, Story} from '@storybook/react/types-6-0';

import {
    dataLensSrc,
    getDefaultStoryArgs,
    getVideoStoryArgs,
    youtubeSrc,
} from '../../../../.mocks/utils';
import {BLOCKS} from '../../../demo/constants';
import {MediaProps} from '../../../models/blocks';
import {BlockInColumnsType} from '../../../models/common';
import {Media} from '../Media';

export default {
    title: `${BLOCKS}/Media`,
    component: Media,
    args: {
        theme: 'light',
    },
} as Meta;

type MediaModel = {
    type: BlockInColumnsType.Media;
} & MediaProps;

const DefaultTemplate: Story<MediaModel> = (args) => (
    <div style={{maxWidth: '500px', padding: '0 40px', margin: '0 auto'}}>
        <Media {...args} />
        <Media {...args} {...getVideoStoryArgs()} />
        <Media {...args} youtube={youtubeSrc} />
        <Media {...args} dataLens={dataLensSrc} />
    </div>
);

export const Default = DefaultTemplate.bind({});

Default.args = {
    type: BlockInColumnsType.Media,
    ...getDefaultStoryArgs(),
};
