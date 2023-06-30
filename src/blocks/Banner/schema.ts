import {validators} from '@gravity-ui/page-constructor';

import {BlockInColumnsType} from '../../models/common';
import {BlogBlockBase} from '../../schema/common';

const {
    subBlocks: {ContentBase},
    common: {BlockBaseProps},
} = validators;

export const Banner = {
    [BlockInColumnsType.Banner]: {
        type: 'object',
        additionalProperties: false,
        required: ['title', 'text', 'image'],
        properties: {
            ...BlockBaseProps,
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
