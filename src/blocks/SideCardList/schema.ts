import {validators} from '@gravity-ui/page-constructor';

import {BlockType} from '../../models/common';
import {BlogBlockBase} from '../../schema/common';

const {
    common: {BlockBaseProps},
} = validators;

export const SideCardList = {
    [BlockType.SideCardList]: {
        type: 'object',
        additionalProperties: false,
        required: ['items'],
        properties: {
            ...BlockBaseProps,
            ...BlogBlockBase,
            className: {
                type: 'string',
            },
            title: {
                type: 'string',
            },
            items: {
                type: 'array',
                items: {
                    type: 'object',
                    required: ['image', 'description', 'url'],
                    properties: {
                        image: {
                            type: 'string',
                        },
                        description: {
                            type: 'string',
                        },
                        url: {
                            type: 'string',
                        },
                    },
                },
            },
        },
    },
};
