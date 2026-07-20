import * as React from 'react';

import {useAnalytics} from '@gravity-ui/page-constructor';

import {LikesContext} from '../../../../contexts/LikesContext';
import {
    FilterConfig,
    Query,
    SavedOnlyFilterConfig,
    SearchFilterConfig,
    SelectFilterConfig,
} from '../../../../models/common';
import {block} from '../../../../utils/cn';
import {SavedOnlyFilter} from '../SavedOnlyFilter/SavedOnlyFilter';
import {SearchFilter} from '../SearchFilter/SearchFilter';
import {SelectFilter} from '../SelectFilter/SelectFilter';

import './FilterControl.scss';

const b = block('filter-control');

export type FilterControlProps = {
    filter: FilterConfig;
    initialValue: string | number | null | undefined;
    onChange: (query: Query) => void;
};

export const FilterControl = ({filter, initialValue, onChange}: FilterControlProps) => {
    const handleAnalytics = useAnalytics();
    const {hasLikes} = React.useContext(LikesContext);

    const handleChange = React.useCallback(
        (query: Query) => {
            if (filter.analyticsEvents) {
                handleAnalytics(filter.analyticsEvents);
            }
            onChange(query);
        },
        [filter.analyticsEvents, handleAnalytics, onChange],
    );

    if (filter.type === 'search') {
        const {queryParamName, placeholder, clickAnalyticsEvents} = filter as SearchFilterConfig;

        return (
            <div className={b()}>
                <SearchFilter
                    placeholder={placeholder}
                    initialValue={initialValue as string | undefined}
                    onChange={(value) => handleChange({[queryParamName]: value} as Query)}
                    onClick={
                        clickAnalyticsEvents
                            ? () => handleAnalytics(clickAnalyticsEvents)
                            : undefined
                    }
                />
            </div>
        );
    }

    if (filter.type === 'savedOnly') {
        const {queryParamName, clickAnalyticsEvents} = filter as SavedOnlyFilterConfig;

        if (!hasLikes) {
            return null;
        }

        const handleSavedOnlyChange = (value: boolean) => {
            if (clickAnalyticsEvents) {
                handleAnalytics(clickAnalyticsEvents, {state: value ? 'on' : 'off'});
            }
            handleChange({[queryParamName]: value ? 'true' : '', search: ''} as Query);
        };

        return (
            <div className={b({'width-auto': true})}>
                <SavedOnlyFilter
                    initialValue={initialValue === 'true'}
                    onChange={handleSavedOnlyChange}
                />
            </div>
        );
    }

    const {
        queryParamName,
        multiple,
        filterable,
        hasClear,
        placeholder,
        options,
        allLabel,
        qa,
        openAnalyticsEvents,
        closeAnalyticsEvents,
    } = filter as SelectFilterConfig;

    return (
        <div className={b()}>
            <SelectFilter
                multiple={multiple}
                filterable={filterable}
                hasClear={hasClear}
                placeholder={placeholder as string | undefined}
                options={options}
                allLabel={allLabel}
                qa={qa}
                initialValue={initialValue}
                onChange={(value) => handleChange({[queryParamName]: value} as Query)}
                onOpen={
                    openAnalyticsEvents ? () => handleAnalytics(openAnalyticsEvents) : undefined
                }
                onClose={
                    closeAnalyticsEvents
                        ? ({selectedValues, changesCount}) =>
                              handleAnalytics(closeAnalyticsEvents, {
                                  selected_values: selectedValues.length ? selectedValues : null,
                                  changes_count: changesCount,
                                  count_filters: selectedValues.length,
                              } as unknown as Record<string, string>)
                        : undefined
                }
            />
        </div>
    );
};
