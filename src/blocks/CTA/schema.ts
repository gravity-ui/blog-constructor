import {Theme, validators} from '@gravity-ui/page-constructor';

import {BlockType} from '../../models/common';
import {BlogBlockBase} from '../../schema/common';
import {DEFAULT_THEME} from '../../constants';

const {
    subBlocks: {ContentBase},
    common: {BlockBaseProps},
} = validators;

export const CTA = {
    [BlockType.CTA]: {
        type: 'object',
        additionalProperties: false,
        required: ['items'],
        properties: {
            ...BlockBaseProps,
            ...BlogBlockBase,
            items: {
                type: 'array',
                items: {
                    type: 'object',
                    additionalProperties: false,
                    required: ['title', 'links'],
                    properties: {
                        ...ContentBase,
                    },
                },
            },
            // fix after withTheme is added to PC exports https://github.com/gravity-ui/page-constructor/issues/1119
            cardBackgroundColor: {
                oneOf: [
                    {
                        type: 'string',
                        optionName: 'no theme',
                    },
                    {
                        type: 'object',
                        additionalProperties: false,
                        required: DEFAULT_THEME,
                        properties: Object.values(Theme).reduce(
                            (result, themeName) => ({
                                ...result,
                                [themeName]: {
                                    type: 'string',
                                },
                            }),
                            {},
                        ),
                        optionName: 'themes',
                    },
                ],
            },
        },
    },
};
