import React from 'react';

import {SelectProps, TextInput, SelectOption} from '@gravity-ui/uikit';

import {i18, Keyset} from '../../../../i18n';

import {block} from '../../../../utils/cn';

import {CustomSwitcher, CustomSwitcherProps} from '../CustomSwitcher/CustomSwitcher';
import {
    CustomSelectOption,
    CustomSelectOptionProps,
} from '../CustomSelectOption/CustomSelectOption';

import './Controls.scss';

const b = block('feed-controls');

type RenderSwitcherType = (
    initial: CustomSwitcherProps['initial'],
    list: CustomSwitcherProps['list'],
) => SelectProps['renderControl'];

export const renderTagsSwitcher: RenderSwitcherType =
    (initial, list) =>
    // eslint-disable-next-line react/display-name
    ({onClick, ref}) =>
        (
            <CustomSwitcher
                initial={initial}
                defaultLabel={i18(Keyset.AllTags)}
                list={list}
                controlRef={ref}
                onClick={onClick}
            />
        );

export const renderServicesSwitcher: RenderSwitcherType =
    (initial, list) =>
    // eslint-disable-next-line react/display-name
    ({onClick, ref}) =>
        (
            <CustomSwitcher
                initial={initial}
                defaultLabel={i18(Keyset.AllServices)}
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
