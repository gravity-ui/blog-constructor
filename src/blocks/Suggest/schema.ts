import {BlockType} from '../../models/common';
import {BlockBase, BlogBlockBase} from '../../schema/common';

export const Suggest = {
    [BlockType.Suggest]: {
        type: 'object',
        additionalProperties: false,
        properties: {
            ...BlockBase,
            ...BlogBlockBase,
        },
    },
};
