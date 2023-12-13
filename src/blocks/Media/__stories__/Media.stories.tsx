import React from 'react';

import {Meta, StoryFn} from '@storybook/react';

import {
    dataLensSrc,
    getDefaultStoryArgs,
    getVideoStoryArgs,
    iframeForm,
    iframeMap,
    youtubeSrc,
} from '../../../../.mocks/utils';
import {MediaProps} from '../../../models/blocks';
import {BlockType} from '../../../models/common';
import {Media} from '../Media';

export default {
    title: 'Blocks/Media',
    component: Media,
    args: {
        theme: 'light',
    },
} as Meta;

type MediaModel = {
    type: BlockType.Media;
} & MediaProps;

const DefaultTemplate: StoryFn<MediaModel> = (args) => (
    <div style={{maxWidth: '1500px', padding: '0 40px', margin: '0 auto'}}>
        <Media {...args} />
        <Media {...args} {...getVideoStoryArgs()} />
        <Media {...args} youtube={youtubeSrc} />
        <Media {...args} dataLens={dataLensSrc} />
        <Media {...args} iframe={iframeForm} />
        <Media {...args} iframe={iframeMap} margins={false} />
    </div>
);

export const Default = DefaultTemplate.bind({});

Default.args = {
    type: BlockType.Media,
    ...getDefaultStoryArgs(),
} as MediaModel;
