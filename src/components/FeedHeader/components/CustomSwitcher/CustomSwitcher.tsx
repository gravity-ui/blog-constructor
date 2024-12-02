import React, {LegacyRef, useMemo} from 'react';

import {Icon, SelectProps, useUniqId} from '@gravity-ui/uikit';

import {DropdownArrow} from '../../../../icons/DropdownArrow';
import {Close} from '../../../../icons/Close';
import {block} from '../../../../utils/cn';
import {SelectItem} from '../Controls/Controls';

import './CustomSwitcher.scss';

const b = block('feed-custom-switcher');

type RenderControlParameters = Partial<Parameters<Required<SelectProps>['renderControl']>[0]>;
type TriggerProps = Required<RenderControlParameters>['triggerProps'];

type A11yKeys = {
    [K in keyof TriggerProps]-?: K extends `aria-${string}` | 'role' ? K : never;
}[keyof TriggerProps];

type RenderControlA11yProps = Pick<TriggerProps, A11yKeys>;

export type CustomSwitcherProps = {
    initial: (string | number | null)[];
    defaultLabel: string;
    list: SelectItem[];
    controlRef: RenderControlParameters['ref'];
    a11yProps: RenderControlA11yProps;
} & Omit<RenderControlParameters, 'ref'> &
    Pick<TriggerProps, 'id' | 'disabled' | 'type'>;

const ICON_SIZE = 12;
const CLEAR_ICON_SIZE = 11;

export const CustomSwitcher = ({
    id,
    disabled,
    type,
    initial,
    defaultLabel,
    list,
    onClick,
    controlRef,
    onKeyDown,
    renderClear,
    a11yProps,
}: CustomSwitcherProps) => {
    const itemsNames = useMemo(() => {
        const items = list
            .filter((item) => initial.includes(item.value))
            .map((item) => item.content);

        return items.length ? items : [defaultLabel];
    }, [defaultLabel, initial, list]);
    const hasCounter = itemsNames.length > 1;

    const contentElementId = useUniqId();

    return (
        <div className={b('custom-switcher')} ref={controlRef as LegacyRef<HTMLDivElement>}>
            {/* eslint-disable-next-line jsx-a11y/role-supports-aria-props */}
            <button
                id={id}
                disabled={disabled}
                type={type}
                onClick={onClick}
                className={b('custom-switcher-element', {overlay: true})}
                onKeyDown={onKeyDown}
                {...a11yProps}
                aria-labelledby={contentElementId}
            />
            <div
                id={contentElementId}
                className={b('custom-switcher-element', {content: true})}
                aria-hidden
            >
                {itemsNames?.join(', ')}
            </div>
            {renderClear &&
                renderClear({
                    renderIcon: () => (
                        <Icon data={Close} size={CLEAR_ICON_SIZE} className={b('clear')} />
                    ),
                })}
            {hasCounter && (
                <div className={b('custom-switcher-element', {counter: true})}>
                    {itemsNames.length}
                </div>
            )}
            <div className={b('custom-switcher-element', {arrow: true})}>
                <Icon data={DropdownArrow} size={ICON_SIZE} className={b('switcher-arrow')} />
            </div>
        </div>
    );
};
