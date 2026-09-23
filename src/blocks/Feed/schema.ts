import {validators} from '@gravity-ui/page-constructor/schema';

import {BlockType} from '../../models/common';

const {
    common: {BlockBaseProps},
} = validators;

export const Feed = {
    [BlockType.Feed]: {
        additionalProperties: false,
        required: ['image'],
        properties: {
            ...BlockBaseProps,
            title: {
                type: 'string',
            },
            image: {
                type: 'string',
            },
        },
    },
};
