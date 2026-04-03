import * as React from 'react';

import {MobileProvider} from '@gravity-ui/uikit';

import {Keyset, i18n} from '../../../../i18n';
import {FetchArgs, FilterConfig, Query} from '../../../../models/common';
import {block} from '../../../../utils/cn';
import {FilterControl} from '../FilterControl/FilterControl';

import './Controls.scss';

const b = block('feed-controls');

export type ControlsProps = {
    handleLoadData: (props: FetchArgs) => void;
    filters?: FilterConfig[];
    queryParams: Query;
    title?: string;
};

const DEFAULT_PAGE = 1;

export const Controls = ({
    handleLoadData,
    filters = [],
    queryParams,
    title = i18n(Keyset.Title),
}: ControlsProps) => {
    const handleFilterChange = React.useCallback(
        (query: Query) =>
            handleLoadData({page: DEFAULT_PAGE, query: {page: DEFAULT_PAGE, ...query}}),
        [handleLoadData],
    );

    return (
        <MobileProvider mobile={false}>
            <div className={b('header')}>
                <h1 className={b('header-item', {title: true})}>{title}</h1>
                <div className={b('header-item', {filters: true})}>
                    {filters.map((filter) => (
                        <FilterControl
                            key={filter.queryParamName}
                            filter={filter}
                            initialValue={queryParams?.[filter.queryParamName]}
                            onChange={handleFilterChange}
                        />
                    ))}
                </div>
            </div>
        </MobileProvider>
    );
};
