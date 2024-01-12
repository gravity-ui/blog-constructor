import {validators} from '@gravity-ui/page-constructor';

import {BlockType} from '../../models/common';
import {BlogBlockBase} from '../../schema/common';

const {
    common: {BlockBaseProps},
    components: {YandexFormProps},
    subBlocks: {HubspotFormProps},
} = validators;

export const Media = {
    [BlockType.Media]: {
        type: 'object',
        additionalProperties: false,
        properties: {
            ...BlockBaseProps,
            ...BlogBlockBase,
            formData: {
                oneOf: [
                    {
                        type: 'object',
                        optionName: 'yandex',
                        properties: {
                            yandex: YandexFormProps,
                        },
                    },
                    {
                        type: 'object',
                        optionName: 'hubspot',
                        properties: {
                            hubspot: HubspotFormProps,
                        },
                    },
                ],
            },
            border: {
                type: 'string',
                enum: ['shadow', 'line', 'none'],
            },
        },
    },
};
