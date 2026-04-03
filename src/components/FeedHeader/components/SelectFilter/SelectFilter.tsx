import * as React from 'react';

import {Select, SelectOption} from '@gravity-ui/uikit';

import {MobileContext} from '../../../../contexts/MobileContext';
import {block} from '../../../../utils/cn';

import {renderFilter, renderOption, renderSwitcher} from './customRenders';

import './SelectFilter.scss';

const b = block('feed-filter');

const VIRTUALIZATION_THRESHOLD = 1000;

export type SelectFilterProps = {
    multiple?: boolean;
    filterable?: boolean;
    hasClear?: boolean;
    placeholder?: string;
    options: SelectOption[];
    allLabel: string;
    qa?: string;
    initialValue: string | number | null | undefined;
    onChange: (value: string) => void;
    className?: string;
};

export const SelectFilter = ({
    multiple,
    filterable,
    hasClear,
    placeholder,
    options,
    allLabel,
    qa,
    initialValue,
    onChange,
    className,
}: SelectFilterProps) => {
    const isMobile = React.useContext(MobileContext);

    let defaultValue: string[];
    if (multiple) {
        defaultValue = initialValue ? (initialValue as string).split(',') : [];
    } else {
        defaultValue = [initialValue] as string[];
    }

    const optionsWithEmpty: SelectOption[] = multiple
        ? options
        : [{value: 'empty', content: allLabel}, ...options];

    const handleChange = (selectedValues: string[]) => {
        if (multiple) {
            onChange(selectedValues.join(','));
        } else {
            const isEmpty = selectedValues.some((v) => v === 'empty');
            onChange(isEmpty ? '' : selectedValues[0]);
        }
    };

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
                onUpdate={handleChange}
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
