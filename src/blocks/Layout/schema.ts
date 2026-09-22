import {validators} from '@gravity-ui/page-constructor/schema';

import {BlockType} from '../../models/common';
import {BlogBlockBase} from '../../schema/common';

const {
    common: {BlockBaseProps, ChildrenProps},
} = validators;

export const Layout = {
    [BlockType.Layout]: {
        type: 'object',
        additionalProperties: false,
        required: ['children'],
        properties: {
            ...BlockBaseProps,
            ...BlogBlockBase,
            children: ChildrenProps,
            mobileOrder: {
                type: 'string',
                enum: ['reverse', 'straight'],
            },
        },
    },
};
