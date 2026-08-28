import {validators} from '@gravity-ui/page-constructor';

import {BlockType} from '../../models/common';
import {BlogBlockBase, PaddingSize} from '../../schema/common';

const {
    common: {BlockBaseProps},
} = validators;

export const Take = {
    [BlockType.Take]: {
        type: 'object',
        additionalProperties: false,
        required: ['text', 'author'],
        properties: {
            ...BlockBaseProps,
            ...BlogBlockBase,
            paddingRight: PaddingSize,
            paddingLeft: PaddingSize,
            text: {type: 'string', contentType: 'text'},
            author: {
                type: 'object',
                additionalProperties: false,
                required: ['firstName', 'secondName'],
                properties: {
                    firstName: {type: 'string', contentType: 'text'},
                    secondName: {type: 'string', contentType: 'text'},
                    description: {type: 'string', contentType: 'yfm'},
                    avatar: {type: 'string'},
                },
            },
            color: {type: 'string'},
            noBackground: {type: 'boolean'},
        },
    },
};
