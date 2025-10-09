import {validators} from '@gravity-ui/page-constructor';

const {
    common: {BlockBaseProps},
} = validators;

import {BlockType} from '../../models/common';

export const Feed = {
    [BlockType.Feed]: {
        additionalProperties: false,
        required: 'image',
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
