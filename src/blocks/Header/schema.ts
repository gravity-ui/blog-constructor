import {validators} from '@gravity-ui/page-constructor';

import {BlockType} from '../../models/common';
import {BlogBlockBase} from '../../schema/common';

const {
    blocks: {HeaderProperties},
    common: {BlockBaseProps},
} = validators;

export const Header = {
    [BlockType.Header]: {
        type: 'object',
        additionalProperties: false,
        properties: {
            ...BlockBaseProps,
            ...BlogBlockBase,
            ...HeaderProperties,
        },
    },
};
