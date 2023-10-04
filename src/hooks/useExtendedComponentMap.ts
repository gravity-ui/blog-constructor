import {useMemo} from 'react';

import {CustomConfig} from '@gravity-ui/page-constructor';

import componentMap from '../constructor/blocksMap';

export const useExtendedComponentMap = (custom: CustomConfig | undefined) =>
    useMemo(
        () =>
            custom
                ? {
                      ...custom,
                      blocks:
                          componentMap.blocks || custom.blocks
                              ? {...componentMap.blocks, ...custom.blocks}
                              : undefined,
                      headers:
                          componentMap.headers || custom.headers
                              ? {...componentMap.headers, ...custom.headers}
                              : undefined,
                  }
                : componentMap,
        [custom],
    );
