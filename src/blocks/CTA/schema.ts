import {validators} from '@gravity-ui/page-constructor';

import {BlockType} from '../../models/common';
import {BlockBase, BlogBlockBase} from '../../schema/common';

const {
    subBlocks: {ContentBase},
} = validators;

export const CTA = {
    [BlockType.CTA]: {
        type: 'object',
        additionalProperties: false,
        required: ['items'],
        properties: {
            ...BlockBase,
            ...BlogBlockBase,
            items: {
                type: 'array',
                items: {
                    type: 'object',
                    additionalProperties: false,
                    required: ['title', 'links'],
                    properties: {
                        ...ContentBase,
                    },
                },
            },
        },
    },
};
