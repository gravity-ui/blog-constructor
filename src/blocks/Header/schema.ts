import {validators} from '@gravity-ui/page-constructor';

import {BlockType} from '../../models/common';
import {BlockBase, BlogBlockBase} from '../../schema/common';

const {
    blocks: {HeaderProperties},
} = validators;

export const Header = {
    [BlockType.Header]: {
        type: 'object',
        additionalProperties: false,
        properties: {
            ...BlockBase,
            ...BlogBlockBase,
            ...HeaderProperties,
        },
    },
};
