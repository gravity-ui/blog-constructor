import {validators} from '@gravity-ui/page-constructor';

import {BlockType} from '../../models/common';
import {BlogBlockBase} from '../../schema/common';

const {
    subBlocks: {ContentBase},
    components: {ImageProps},
    common: {BlockBaseProps},
} = validators;

const BackgroundProps = {
    type: 'object',
    additionalProperties: false,
    properties: {
        image: ImageProps,
        color: {
            type: 'string',
        },
        altText: {
            type: 'string',
            contentType: 'text',
        },
    },
};

export const ColoredText = {
    [BlockType.ColoredText]: {
        type: 'object',
        additionalProperties: false,
        required: ['text'],
        properties: {
            ...BlockBaseProps,
            ...BlogBlockBase,
            ...ContentBase,
            background: BackgroundProps,
        },
    },
};
