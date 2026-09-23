import {validators} from '@gravity-ui/page-constructor/schema';

import {BlockType} from '../../models/common';
import {BlogBlockBase} from '../../schema/common';

const {
    common: {BlockBaseProps},
} = validators;

export const Meta = {
    [BlockType.Meta]: {
        type: 'object',
        additionalProperties: false,
        properties: {
            ...BlockBaseProps,
            ...BlogBlockBase,
        },
    },
};
