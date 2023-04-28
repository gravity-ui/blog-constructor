import {BlockType} from '../../models/common';
import {BlockBase, Title} from '../../schema/common';

export const Feed = {
    [BlockType.Feed]: {
        additionalProperties: false,
        required: [],
        properties: {
            ...BlockBase,
            title: Title,
            image: {
                type: 'string',
            },
            description: {
                type: 'string',
                contentType: 'text',
            },
            size: {
                type: 'string',
                enum: ['s', 'm'],
            },
        },
    },
};
