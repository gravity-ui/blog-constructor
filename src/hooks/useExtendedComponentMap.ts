import {useMemo} from 'react';

import {CustomConfig} from '@gravity-ui/page-constructor';

import componentMap from '../constructor/blocksMap';

export const useExtendedComponentMap = (custom: CustomConfig | undefined) =>
    useMemo(
        () =>
            custom
                ? {
                      ...custom,
                      blocks: custom.blocks
                          ? {...componentMap.blocks, ...custom.blocks}
                          : componentMap.blocks,
                      headers: custom.headers
                          ? {...componentMap.headers, ...custom.headers}
                          : componentMap.headers,
                  }
                : componentMap,
        [custom],
    );
