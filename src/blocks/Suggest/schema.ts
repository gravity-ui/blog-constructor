import {validators} from '@gravity-ui/page-constructor';

const {
    common: {BlockBaseProps},
} = validators;

import {BlockStandsAloneType} from '../../models/common';
import {BlogBlockBase} from '../../schema/common';

export const Suggest = {
    [BlockStandsAloneType.Suggest]: {
        type: 'object',
        additionalProperties: false,
        properties: {
            ...BlockBaseProps,
            ...BlogBlockBase,
        },
    },
};
