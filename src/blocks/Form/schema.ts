import {validators} from '@gravity-ui/page-constructor';

import {BlockType} from '../../models/common';
import {BlogBlockBase} from '../../schema/common';

const {
    common: {BlockBaseProps},
    blocks: {FormBlock},
} = validators;

export const Form = {
    [BlockType.Form]: {
        type: 'object',
        additionalProperties: false,
        properties: {
            ...BlockBaseProps,
            ...BlogBlockBase,
            formData: FormBlock['form-block'].properties.formData,
            border: {
                type: 'string',
                enum: ['shadow', 'line', 'none'],
            },
        },
    },
};
