import {validators} from '@gravity-ui/page-constructor';

import {BlockType} from '../../models/common';
import {BlockBase, BlogBlockBase} from '../../schema/common';

const {
    common: {DataLensProps, VideoProps},
    components: {ImageProps},
} = validators;

export const Media = {
    [BlockType.Media]: {
        type: 'object',
        additionalProperties: false,
        properties: {
            ...BlockBase,
            ...BlogBlockBase,
            text: {
                type: 'string',
                contentType: 'text',
            },
            image: {
                anyOf: [ImageProps, {type: 'array', items: ImageProps}],
            },
            video: VideoProps,
            dataLens: DataLensProps,
            youtube: {
                type: 'string',
            },
            previewImg: {
                type: 'string',
            },
        },
    },
};
