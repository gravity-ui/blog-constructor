import * as React from 'react';

import type {AnalyticsEvent, AnalyticsEventsProp} from '@gravity-ui/page-constructor';
import {useAnalytics} from '@gravity-ui/page-constructor';

import {DefaultGoalIds} from '../../../../constants';
import {LikesContext} from '../../../../contexts/LikesContext';
import {
    FilterConfig,
    Query,
    SavedOnlyFilterConfig,
    SearchFilterConfig,
    SelectFilterCloseData,
    SelectFilterConfig,
} from '../../../../models/common';
import {createExtendedEvent} from '../../../../utils/analytics';
import {block} from '../../../../utils/cn';
import {getMergedAnalyticsEvents} from '../../../../utils/common';
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

        return selectedOption?.content || selectedValue;
    });

const compatibilityEvents: Partial<Record<string, AnalyticsEvent>> = {
    tags: createExtendedEvent(DefaultGoalIds.tag),
    service: createExtendedEvent(DefaultGoalIds.service),
    services: createExtendedEvent(DefaultGoalIds.service),
};

export type FilterControlProps = {
    filter: FilterConfig;
    initialValue: string | number | null | undefined;
    onChange: (query: Query) => void;
};

export const FilterControl = ({filter, initialValue, onChange}: FilterControlProps) => {
    const handleAnalytics = useAnalytics();
    const {hasLikes} = React.useContext(LikesContext);

    const handleFilterAnalytics = React.useCallback(
        (postfix: string, params?: Record<string, unknown>, internalEvent?: AnalyticsEvent) => {
            const customEvents = filter.analyticsEvents
                ? addAnalyticsEventPostfix(filter.analyticsEvents, postfix)
                : undefined;
            const events = internalEvent
                ? getMergedAnalyticsEvents(internalEvent, customEvents)
                : customEvents;

            if (events) {
                handleAnalytics(events, params as Record<string, string>);
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
    const compatibilityEvent = compatibilityEvents[queryParamName];

    const handleSelectClose = ({selectedValues, changesCount}: SelectFilterCloseData) => {
        const selectedOptionNames = getSelectedOptionNames(selectedValues, options);
        const params: Record<string, unknown> = {
            selected_values: selectedValues.length ? selectedOptionNames : null,
            selected_ids: selectedValues.length ? selectedValues : null,
            changes_count: changesCount,
            count_filters: selectedValues.length,
        };

        if (queryParamName === 'tags') {
            params.theme = selectedValues[0] || null;
        } else if (queryParamName === 'service' || queryParamName === 'services') {
            params.service = selectedOptionNames.join(',');
        }

        handleFilterAnalytics('CLOSE', params, changesCount > 0 ? compatibilityEvent : undefined);
    };

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
                onClose={handleSelectClose}
            />
        </div>
    );
};
