import {SelectOption, SelectProps, TextInput} from '@gravity-ui/uikit';

import {Keyset, i18n} from '../../../../i18n';
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
    qa?: string;
}) => SelectProps['renderControl'];

type RenderFilterType = SelectProps['renderFilter'];

export const renderSwitcher: RenderSwitcherType =
    ({initial, list, defaultLabel, qa}) =>
    // eslint-disable-next-line react/display-name
    ({ref, renderClear, triggerProps: {id, disabled, type, onClick, onKeyDown, ...a11yProps}}) => (
        <CustomSwitcher
            id={id}
            disabled={disabled}
            type={type}
            initial={initial}
            defaultLabel={defaultLabel}
            list={list}
            controlRef={ref}
            triggerProps={{
                onClick,
                onKeyDown,
            }}
            renderClear={renderClear}
            a11yProps={a11yProps}
            qa={qa}
        />
    );

export const renderFilter: RenderFilterType = ({
    ref,
    onChange,
    inputProps: {value, onKeyDown, onChange: _, size: __, placeholder: ___, ...a11yProps},
}) => (
    <TextInput
        value={value}
        view="clear"
        placeholder={i18n(Keyset.Search)}
        onUpdate={onChange}
        onKeyDown={onKeyDown}
        className={b('popup-filter')}
        controlRef={ref}
        controlProps={{size: 1, ...a11yProps}}
    />
);

export const renderOption = (option: SelectOption) => (
    <CustomSelectOption data={option as CustomSelectOptionProps['data']} />
);
