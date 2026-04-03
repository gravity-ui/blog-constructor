import * as React from 'react';

import {MobileProvider} from '@gravity-ui/uikit';

import {Keyset, i18n} from '../../../../i18n';
import {FetchArgs, FiltersConfig, Query, normalizeFiltersToRows} from '../../../../models/common';
import {block} from '../../../../utils/cn';
import {FilterControl} from '../FilterControl/FilterControl';

import './Controls.scss';

const b = block('feed-controls');

export type ControlsProps = {
    handleLoadData: (props: FetchArgs) => void;
    filters?: FiltersConfig;
    queryParams: Query;
    title?: string;
    resetTitleMargin?: boolean;
};

const DEFAULT_PAGE = 1;

export const Controls = ({
    handleLoadData,
    filters = [],
    queryParams,
    title = i18n(Keyset.Title),
    resetTitleMargin,
}: ControlsProps) => {
    const handleFilterChange = React.useCallback(
        (query: Query) =>
            handleLoadData({page: DEFAULT_PAGE, query: {page: DEFAULT_PAGE, ...query}}),
        [handleLoadData],
    );

    const rows = normalizeFiltersToRows(filters);

    return (
        <MobileProvider mobile={false}>
            <div className={b('header')}>
                <h1 className={b('header-item', {title: true, 'reset-margin': resetTitleMargin})}>
                    {title}
                </h1>
                {rows.map((row, rowIndex) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <div key={rowIndex} className={b('header-item', {filters: true})}>
                        {row.map((filter) => (
                            <FilterControl
                                key={filter.queryParamName}
                                filter={filter}
                                initialValue={queryParams?.[filter.queryParamName]}
                                onChange={handleFilterChange}
                            />
                        ))}
                    </div>
                ))}
            </div>
        </MobileProvider>
    );
};
