import {validators} from '@gravity-ui/page-constructor';

import {BlockInColumnsType} from '../../models/common';
import {BlogBlockBase} from '../../schema/common';

const {
    subBlocks: {ContentBase},
    common: {BlockBaseProps},
} = validators;

export const CTA = {
    [BlockInColumnsType.CTA]: {
        type: 'object',
        additionalProperties: false,
        required: ['items'],
        properties: {
            ...BlockBaseProps,
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
