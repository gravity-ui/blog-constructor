import React from 'react';

import {ClassNameProps} from '../../models/common';
import {
    Media as PCMedia,
    MediaProps as PCMediaProps,
    YFMWrapper,
} from '@gravity-ui/page-constructor';

import {Wrapper} from '../../components/Wrapper/Wrapper';

import {PaddingsDirections, PaddingsYFMProps} from '../../models/paddings';

import {block} from '../../utils/cn';

import './Media.scss';

const b = block('media');

type MediaProps = Partial<
    Pick<PCMediaProps, 'youtube' | 'previewImg' | 'image' | 'video' | 'dataLens'>
> & {
    text?: string;
} & PaddingsYFMProps;

export type MediaFullProps = MediaProps & ClassNameProps;

export const Media: React.FC<MediaFullProps> = ({
    text,
    paddingTop,
    paddingBottom,
    ...mediaProps
}) => (
    <Wrapper
        paddings={{
            [PaddingsDirections.top]: paddingTop,
            [PaddingsDirections.bottom]: paddingBottom,
        }}
        className={b('container')}
    >
        <div className={b('border')} data-qa="blog-media-content">
            <PCMedia
                className={b('content')}
                videoClassName={b('video')}
                imageClassName={b('image')}
                {...mediaProps}
            />
        </div>
        {text && (
            <div className={b('text-content')}>
                <YFMWrapper
                    content={text}
                    modifiers={{
                        blogMedia: true,
                        resetPaddings: true,
                    }}
                />
            </div>
        )}
    </Wrapper>
);
