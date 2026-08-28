import {validators} from '@gravity-ui/page-constructor';

import {BlockType} from '../../models/common';
import {BlogBlockBase} from '../../schema/common';

const {
    common: {BlockBaseProps, MediaProps},
} = validators;

const SideCard = {
    type: 'object',
    required: ['image', 'description', 'url'],
    properties: {
        image: MediaProps.image,
        description: {
            type: 'string',
        },
        url: {
            type: 'string',
        },
    },
};

export const SideCardList = {
    [BlockType.SideCardList]: {
        type: 'object',
        additionalProperties: false,
        required: ['items'],
        properties: {
            ...BlockBaseProps,
            ...BlogBlockBase,
            title: {
                type: 'string',
            },
            items: {
                type: 'array',
                items: SideCard,
            },
        },
    },
};
