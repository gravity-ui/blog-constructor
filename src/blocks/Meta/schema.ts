import {BlockType} from '../../models/common';
import {BlockBase, BlogBlockBase} from '../../schema/common';

export const Meta = {
    [BlockType.Meta]: {
        type: 'object',
        additionalProperties: false,
        properties: {
            ...BlockBase,
            ...BlogBlockBase,
        },
    },
};
