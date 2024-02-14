import React, {LegacyRef, useMemo} from 'react';

import {Icon, SelectProps} from '@gravity-ui/uikit';

import {DropdownArrow} from '../../../../icons/DropdownArrow';
import {Close} from '../../../../icons/Close';
import {block} from '../../../../utils/cn';
import {SelectItem} from '../Controls/Controls';

import './CustomSwitcher.scss';

const b = block('feed-custom-switcher');

type RenderControlParameters = Partial<Parameters<Required<SelectProps>['renderControl']>[0]>;

export type CustomSwitcherProps = {
    initial: (string | number | null)[];
    defaultLabel: string;
    list: SelectItem[];
    controlRef: RenderControlParameters['ref'];
} & Omit<RenderControlParameters, 'ref'>;

const ICON_SIZE = 12;
const CLEAR_ICON_SIZE = 11;

export const CustomSwitcher = ({
    initial,
    defaultLabel,
    list,
    onClick,
    controlRef,
    onKeyDown,
    open,
    renderClear,
}: CustomSwitcherProps) => {
    const itemsNames = useMemo(() => {
        const items = list
            .filter((item) => initial.includes(item.value))
            .map((item) => item.content);

        return items.length ? items : [defaultLabel];
    }, [defaultLabel, initial, list]);
    const hasCounter = itemsNames.length > 1;

    return (
        <button
            className={b('custom-switcher')}
            ref={controlRef as LegacyRef<HTMLButtonElement>}
            onKeyDown={onKeyDown}
            aria-expanded={open}
        >
            <div onClick={onClick} className={b('custom-switcher-element', {overlay: true})} />
            <div className={b('custom-switcher-element', {content: true})}>
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
        </button>
    );
};
