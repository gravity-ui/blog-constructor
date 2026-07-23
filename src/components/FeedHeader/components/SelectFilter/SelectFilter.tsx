import * as React from 'react';

import {Select, SelectOption} from '@gravity-ui/uikit';

import {MobileContext} from '../../../../contexts/MobileContext';
import {SelectFilterCloseData} from '../../../../models/common';
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
    onOpen?: () => void;
    onClose?: (data: SelectFilterCloseData) => void;
    className?: string;
};

const getSelectedValuesChangesCount = (initial: string[], current: string[]) => {
    const initialValues = new Set(initial);
    const currentValues = new Set(current);

    const removedValuesCount = initial.filter((value) => !currentValues.has(value)).length;
    const addedValuesCount = current.filter((value) => !initialValues.has(value)).length;

    return removedValuesCount + addedValuesCount;
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
    onOpen,
    onClose,
    className,
}: SelectFilterProps) => {
    const isMobile = React.useContext(MobileContext);

    let defaultValue: string[];
    if (multiple) {
        defaultValue = initialValue ? (initialValue as string).split(',') : [];
    } else {
        defaultValue =
            initialValue === null || initialValue === undefined ? [] : [`${initialValue}`];
    }

    const selectedValuesRef = React.useRef(defaultValue);
    const selectedValuesOnOpenRef = React.useRef(defaultValue);
    const isOpenRef = React.useRef(false);

    const optionsWithEmpty: SelectOption[] = multiple
        ? options
        : [{value: 'empty', content: allLabel}, ...options];

    const handleChange = (selectedValues: string[]) => {
        if (multiple) {
            selectedValuesRef.current = selectedValues;
            onChange(selectedValues.join(','));
        } else {
            const isEmpty = selectedValues.some((v) => v === 'empty');
            selectedValuesRef.current = isEmpty ? [] : selectedValues;
            onChange(isEmpty ? '' : selectedValues[0]);
        }
    };

    const handleOpenChange = (isOpen: boolean) => {
        if (isOpen) {
            selectedValuesOnOpenRef.current = [...selectedValuesRef.current];
            isOpenRef.current = true;
            onOpen?.();
            return;
        }

        if (isOpenRef.current) {
            const selectedValues = [...selectedValuesRef.current];
            onClose?.({
                selectedValues,
                changesCount: getSelectedValuesChangesCount(
                    selectedValuesOnOpenRef.current,
                    selectedValues,
                ),
            });
        }

        isOpenRef.current = false;
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
                onOpenChange={handleOpenChange}
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
