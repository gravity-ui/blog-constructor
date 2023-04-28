import {BlockType} from '../../models/common';
import {BlockBase, BlogBlockBase} from '../../schema/common';

export const YFM = {
    [BlockType.YFM]: {
        type: 'object',
        additionalProperties: false,
        required: ['text'],
        properties: {
            ...BlockBase,
            ...BlogBlockBase,
            text: {
                type: 'string',
                contentType: 'yfm',
            },
        },
    },
};
