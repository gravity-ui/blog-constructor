import type {Meta, StoryFn} from '@storybook/react';

import {STORY_ASSETS_PATH, StoryArgs, StoryBlock} from '../../../../.storybook/story-utils';
import {MediaBlockModel} from '../../../models/blocks';
import {BlockType} from '../../../models/common';
import {Media} from '../Media';

export default {
    title: 'Blocks/Media',
    component: Media,
} as Meta<StoryArgs<MediaBlockModel>>;

const DefaultTemplate: StoryFn<StoryArgs<MediaBlockModel>> = (args) => <StoryBlock args={args} />;
type MediaVariants = Record<number, StoryArgs<MediaBlockModel>>;

const VariantsTemplate: StoryFn<MediaVariants> = (args) => (
    <div style={{display: 'grid', gap: 32}}>
        {Object.values(args).map((block, index) => (
            <StoryBlock key={index} args={block} />
        ))}
    </div>
);

const imageArgs: StoryArgs<MediaBlockModel> = {
    type: BlockType.Media,
    image: `${STORY_ASSETS_PATH}/img_8-12_light.png`,
    text: 'Lorem ipsum dolor',
    paddingTop: 'l',
    paddingBottom: 'l',
};

const videoArgs: StoryArgs<MediaBlockModel> = {
    type: BlockType.Media,
    video: {
        src: [
            `${STORY_ASSETS_PATH}/video_8-12_white.webm`,
            `${STORY_ASSETS_PATH}/video_8-12_white.mp4`,
        ],
        loop: {start: 0},
    },
    previewImg: `${STORY_ASSETS_PATH}/img_8-12_white.png`,
    text: 'Lorem ipsum dolor',
    paddingTop: 'l',
    paddingBottom: 'l',
};

export const Default = DefaultTemplate.bind({});
export const Video = DefaultTemplate.bind({});
export const YouTube = DefaultTemplate.bind({});
export const DataLens = DefaultTemplate.bind({});
export const Variants = VariantsTemplate.bind({});

Default.args = imageArgs;
Video.args = videoArgs;
YouTube.args = {...imageArgs, image: undefined, youtube: 'https://youtu.be/0Qd3T6skprA'};
DataLens.args = {...imageArgs, image: undefined, dataLens: 'm2bzon9y39lck'};
Variants.args = [imageArgs, videoArgs] as unknown as MediaVariants;
Variants.argTypes = {
    0: {control: {type: 'object'}},
    1: {control: {type: 'object'}},
};
