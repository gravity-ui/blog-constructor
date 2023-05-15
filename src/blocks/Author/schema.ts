import {validators} from '@gravity-ui/page-constructor';

const {
    common: {BlockBaseProps},
} = validators;

import {BlockType} from '../../models/common';
import {BlogBlockBase} from '../../schema/common';

export const Author = {
    [BlockType.Author]: {
        type: 'object',
        additionalProperties: false,
        required: ['authorId'],
        properties: {
            ...BlockBaseProps,
            ...BlogBlockBase,
            authorId: {
                type: 'number',
            },
        },
    },
};
