import {validators} from '@gravity-ui/page-constructor';

const {
    common: {BlockBaseProps},
} = validators;

import {BlockInColumnsType} from '../../models/common';
import {BlogBlockBase} from '../../schema/common';

export const Author = {
    [BlockInColumnsType.Author]: {
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
