import {validators} from '@gravity-ui/page-constructor';

const {
    common: {TitleProps, BlockBaseProps},
} = validators;

import {BlockStandsAloneType} from '../../models/common';

export const Feed = {
    [BlockStandsAloneType.Feed]: {
        additionalProperties: false,
        required: [],
        properties: {
            ...BlockBaseProps,
            title: TitleProps,
            image: {
                type: 'string',
            },
            description: {
                type: 'string',
                contentType: 'text',
            },
            size: {
                type: 'string',
                enum: ['s', 'm'],
            },
        },
    },
};
