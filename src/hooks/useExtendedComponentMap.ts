import * as React from 'react';

import {CustomConfig, getCustomItems} from '@gravity-ui/page-constructor';

import componentMap from '../constructor/blocksMap';

export const useExtendedComponentMap = (custom: CustomConfig | undefined) =>
    React.useMemo(
        () => ({
            ...custom,
            blocks: {...componentMap.blocks, ...getCustomItems(['blocks'], custom)},
            headers: {...componentMap.headers, ...getCustomItems(['headers'], custom)},
        }),
        [custom],
    );
