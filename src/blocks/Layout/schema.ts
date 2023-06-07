import {validators} from '@gravity-ui/page-constructor';

const {
    common: {BlockBaseProps, ChildrenProps},
} = validators;

import {BlockStandsAloneType} from '../../models/common';
import {BlogBlockBase} from '../../schema/common';

export const Layout = {
    [BlockStandsAloneType.Layout]: {
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
