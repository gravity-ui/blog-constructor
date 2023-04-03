import React from 'react';

import {SelectOption, SelectProps, TextInput} from '@gravity-ui/uikit';

import {Keyset, i18} from '../../../../i18n';
import {block} from '../../../../utils/cn';
import {
    CustomSelectOption,
    CustomSelectOptionProps,
} from '../CustomSelectOption/CustomSelectOption';
import {CustomSwitcher, CustomSwitcherProps} from '../CustomSwitcher/CustomSwitcher';

import './Controls.scss';

const b = block('feed-controls');

type RenderSwitcherType = ({
    initial,
    list,
    defaultLabel,
}: {
    initial: CustomSwitcherProps['initial'];
    list: CustomSwitcherProps['list'];
    defaultLabel: string;
}) => SelectProps['renderControl'];

export const renderSwitcher: RenderSwitcherType =
    ({initial, list, defaultLabel}) =>
    // eslint-disable-next-line react/display-name
    ({onClick, ref}) =>
        (
            <CustomSwitcher
                initial={initial}
                defaultLabel={defaultLabel}
                list={list}
                controlRef={ref}
                onClick={onClick}
            />
        );

export const renderFilter: SelectProps['renderFilter'] = ({value, ref, onChange, onKeyDown}) => (
    <div className={b('popup-filter')}>
        <TextInput
            controlRef={ref}
            controlProps={{size: 1}}
            value={value}
            placeholder={i18(Keyset.Search)}
            onUpdate={onChange}
            onKeyDown={onKeyDown}
        />
    </div>
);

export const renderOption = (option: SelectOption) => (
    <CustomSelectOption data={option as CustomSelectOptionProps['data']} />
);
