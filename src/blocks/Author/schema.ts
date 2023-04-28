import {BlockType} from '../../models/common';
import {BlockBase, BlogBlockBase} from '../../schema/common';

export const Author = {
    [BlockType.Author]: {
        type: 'object',
        additionalProperties: false,
        required: ['authorId'],
        properties: {
            ...BlockBase,
            ...BlogBlockBase,
            authorId: {
                type: 'number',
            },
        },
    },
};
