import {BlockType} from '../../models/common';
import {BlockBase, BlogBlockBase, Children} from '../../schema/common';

export const Layout = {
    [BlockType.Layout]: {
        type: 'object',
        additionalProperties: false,
        required: ['children'],
        properties: {
            ...BlockBase,
            ...BlogBlockBase,
            children: Children,
            mobileOrder: {
                type: 'string',
                enum: ['reverse', 'straight'],
            },
        },
    },
};
