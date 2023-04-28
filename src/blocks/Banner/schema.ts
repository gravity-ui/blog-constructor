import {validators} from '@gravity-ui/page-constructor';

import {BlockType} from '../../models/common';
import {BlockBase, BlogBlockBase} from '../../schema/common';

const {
    subBlocks: {ContentBase},
} = validators;

export const Banner = {
    [BlockType.Banner]: {
        type: 'object',
        additionalProperties: false,
        required: ['title', 'text', 'image'],
        properties: {
            ...BlockBase,
            ...BlogBlockBase,
            ...ContentBase,
            color: {
                type: 'string',
            },
            image: {
                type: 'string',
            },
            imageSize: {
                type: 'string',
                enum: ['s', 'm'],
            },
        },
    },
};
