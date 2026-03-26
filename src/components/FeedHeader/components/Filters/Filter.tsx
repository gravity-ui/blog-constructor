import * as React from 'react';

import {useAnalytics} from '@gravity-ui/page-constructor';
import {Flex, Select, SelectOptions, Switch} from '@gravity-ui/uikit';

import {MobileContext} from '../../../../contexts/MobileContext';
import {FilterConfig, Query} from '../../../../models/common';
import {block} from '../../../../utils/cn';

import {renderFilter, renderOption, renderSwitcher} from './customRenders';

import './Filter.scss';

const b = block('feed-filter');

const VIRTUALIZATION_THRESHOLD = 1000;

export type FilterProps = {
    filter: FilterConfig;
    initialValue: string | number | null | undefined;
    onSelect: (query: Query) => void;
    className?: string;
};

export const Filter = ({filter, initialValue, onSelect, className}: FilterProps) => {
    const isMobile = React.useContext(MobileContext);
    const handleAnalyticsFilter = useAnalytics();

    const {queryParamName, qa, analyticsEvents, type} = filter;

    const handleSwitchToggle = (checked: boolean) => {
        if (analyticsEvents) {
            handleAnalyticsFilter(analyticsEvents);
        }

        onSelect({[queryParamName]: checked ? 'true' : ''});
    };

    if (type === 'boolean') {
        const {label} = filter;

        return (
            <Flex className={b('switch')} alignItems="center">
                <Switch
                    size="l"
                    qa={qa}
                    defaultChecked={Boolean(initialValue)}
                    onUpdate={handleSwitchToggle}
                >
                    {label}
                </Switch>
            </Flex>
        );
    }

    const {multiple, filterable, hasClear, options, placeholder, allLabel} = filter;

    const handleFilterSelect = (selectedValues: string[]) => {
        if (analyticsEvents) {
            handleAnalyticsFilter(analyticsEvents);
        }

        const query: Query = {};

        if (multiple) {
            query[queryParamName] = selectedValues.join(',');
        } else {
            const isEmpty = selectedValues.some((v) => v === 'empty');
            query[queryParamName] = isEmpty ? '' : selectedValues[0];
        }

        onSelect(query);
    };

    let defaultValue: string[];
    if (multiple) {
        defaultValue = initialValue ? (initialValue as string).split(',') : [];
    } else {
        defaultValue = [initialValue] as string[];
    }

    const optionsWithEmpty: SelectOptions = multiple
        ? options
        : [{value: 'empty', content: allLabel}, ...options];

    return (
        <div className={className}>
            <Select
                className={b('select')}
                size="xl"
                multiple={multiple}
                filterable={filterable}
                hasClear={hasClear ?? multiple}
                disablePortal
                options={optionsWithEmpty}
                defaultValue={defaultValue}
                popupClassName={b('popup', {isMobile})}
                onUpdate={handleFilterSelect}
                placeholder={placeholder ?? allLabel}
                renderControl={renderSwitcher({
                    initial: defaultValue,
                    list: optionsWithEmpty,
                    defaultLabel: allLabel,
                    qa,
                })}
                virtualizationThreshold={VIRTUALIZATION_THRESHOLD}
                renderOption={renderOption}
                renderFilter={filterable ? renderFilter({className: b('popup-filter')}) : undefined}
            />
        </div>
    );
};
