import * as React from 'react';

import type {AnalyticsEvent, AnalyticsEventsProp} from '@gravity-ui/page-constructor';
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

const addAnalyticsEventPostfix = (
    analyticsEvents: AnalyticsEventsProp,
    postfix: string,
): AnalyticsEventsProp => {
    const addPostfix = (event: AnalyticsEvent): AnalyticsEvent => ({
        ...event,
        name: `${event.name}_${postfix}`,
    });

    return Array.isArray(analyticsEvents)
        ? analyticsEvents.map(addPostfix)
        : addPostfix(analyticsEvents);
};

const getSelectedOptionNames = (selectedValues: string[], options: SelectFilterConfig['options']) =>
    selectedValues.map((selectedValue) => {
        const selectedOption = options.find((option) => option.value === selectedValue);

        return typeof selectedOption?.content === 'string' ? selectedOption.content : selectedValue;
    });

export type FilterControlProps = {
    filter: FilterConfig;
    initialValue: string | number | null | undefined;
    onChange: (query: Query) => void;
};

export const FilterControl = ({filter, initialValue, onChange}: FilterControlProps) => {
    const handleAnalytics = useAnalytics();
    const {hasLikes} = React.useContext(LikesContext);

    const handleFilterAnalytics = React.useCallback(
        (postfix: string, params?: Record<string, unknown>) => {
            if (filter.analyticsEvents) {
                handleAnalytics(
                    addAnalyticsEventPostfix(filter.analyticsEvents, postfix),
                    params as Record<string, string>,
                );
            }
        },
        [filter.analyticsEvents, handleAnalytics],
    );

    const handleChange = React.useCallback((query: Query) => onChange(query), [onChange]);

    if (filter.type === 'search') {
        const {queryParamName, placeholder} = filter as SearchFilterConfig;

        return (
            <div className={b()}>
                <SearchFilter
                    placeholder={placeholder}
                    initialValue={initialValue as string | undefined}
                    onChange={(value) => handleChange({[queryParamName]: value} as Query)}
                    onClick={() => handleFilterAnalytics('CLICK')}
                />
            </div>
        );
    }

    if (filter.type === 'savedOnly') {
        const {queryParamName} = filter as SavedOnlyFilterConfig;

        if (!hasLikes) {
            return null;
        }

        const handleSavedOnlyChange = (value: boolean) => {
            handleFilterAnalytics('CLICK', {state: value ? 'on' : 'off'});
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

    const {queryParamName, multiple, filterable, hasClear, placeholder, options, allLabel, qa} =
        filter as SelectFilterConfig;

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
                onOpen={() => handleFilterAnalytics('CLICK')}
                onClose={({selectedValues, changesCount}) =>
                    handleFilterAnalytics('CLOSE', {
                        selected_values: selectedValues.length
                            ? getSelectedOptionNames(selectedValues, options)
                            : null,
                        changes_count: changesCount,
                        count_filters: selectedValues.length,
                    })
                }
            />
        </div>
    );
};
