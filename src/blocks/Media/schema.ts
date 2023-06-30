import {validators} from '@gravity-ui/page-constructor';

import {BlockInColumnsType} from '../../models/common';
import {BlogBlockBase} from '../../schema/common';

const {
    common: {BlockBaseProps, MediaProps},
} = validators;

export const Media = {
    [BlockInColumnsType.Media]: {
        type: 'object',
        additionalProperties: false,
        properties: {
            ...BlockBaseProps,
            ...BlogBlockBase,
            ...MediaProps,
            text: {
                type: 'string',
                contentType: 'text',
            },
        },
    },
};
