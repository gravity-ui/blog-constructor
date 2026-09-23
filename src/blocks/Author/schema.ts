import {validators} from '@gravity-ui/page-constructor/schema';

import {BlockType} from '../../models/common';
import {BlogBlockBase} from '../../schema/common';

const {
    common: {BlockBaseProps},
} = validators;

export const Author = {
    [BlockType.Author]: {
        type: 'object',
        additionalProperties: false,
        required: ['authorId'],
        properties: {
            ...BlockBaseProps,
            ...BlogBlockBase,
            authorId: {
                oneOf: [{type: 'number'}, {type: 'string'}],
            },
        },
    },
};
