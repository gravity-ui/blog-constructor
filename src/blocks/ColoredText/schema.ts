import {validators} from '@gravity-ui/page-constructor';

import {BlockType} from '../../models/common';
import {BlockBase, BlogBlockBase} from '../../schema/common';

const {
    subBlocks: {ContentBase},
    components: {ImageProps},
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
            ...BlockBase,
            ...BlogBlockBase,
            ...ContentBase,
            background: BackgroundProps,
        },
    },
};
