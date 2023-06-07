import {validators} from '@gravity-ui/page-constructor';

const {
    common: {BlockBaseProps},
} = validators;

import {BlockInColumnsType} from '../../models/common';
import {BlogBlockBase} from '../../schema/common';

export const Meta = {
    [BlockInColumnsType.Meta]: {
        type: 'object',
        additionalProperties: false,
        properties: {
            ...BlockBaseProps,
            ...BlogBlockBase,
        },
    },
};
