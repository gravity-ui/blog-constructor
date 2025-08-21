import {validators} from '@gravity-ui/page-constructor';

import {BlockType} from '../../models/common';
import {BlogBlockBase} from '../../schema/common';

const {
    common: {BlockBaseProps, MediaProps},
} = validators;

export const CompactMedia = {
    [BlockType.CompactMedia]: {
        type: 'object',
        additionalProperties: false,
        properties: {
            ...BlockBaseProps,
            ...BlogBlockBase,
            image: MediaProps['image'],
            description: {
                type: 'string',
                contentType: 'text',
            },
        },
    },
};
