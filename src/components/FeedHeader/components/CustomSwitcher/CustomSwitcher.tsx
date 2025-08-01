import * as React from 'react';

import {ChevronDown, Xmark} from '@gravity-ui/icons';
import {Icon, SelectProps, useUniqId} from '@gravity-ui/uikit';

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
    qa?: string;
} & Omit<RenderControlParameters, 'ref'> &
    Pick<TriggerProps, 'id' | 'disabled' | 'type'>;

const ICON_SIZE = 12;

export const CustomSwitcher = ({
    id,
    disabled,
    type,
    initial,
    defaultLabel,
    list,
    triggerProps,
    controlRef,
    renderClear,
    a11yProps,
    qa,
}: CustomSwitcherProps) => {
    const itemsNames = React.useMemo(() => {
        const items = list
            .filter((item) => initial.includes(item.value))
            .map((item) => item.content);

        return items.length ? items : [defaultLabel];
    }, [defaultLabel, initial, list]);
    const hasCounter = itemsNames.length > 1;

    const contentElementId = useUniqId();

    return (
        <div className={b('custom-switcher')} ref={controlRef as React.LegacyRef<HTMLDivElement>}>
            {/* eslint-disable-next-line jsx-a11y/role-supports-aria-props */}
            <button
                data-qa={qa}
                id={id}
                disabled={disabled}
                type={type}
                onClick={triggerProps?.onClick}
                className={b('custom-switcher-element', {overlay: true})}
                onKeyDown={triggerProps?.onKeyDown}
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
                    renderIcon: () => <Icon data={Xmark} className={b('clear')} />,
                })}
            {hasCounter && (
                <div className={b('custom-switcher-element', {counter: true})}>
                    {itemsNames.length}
                </div>
            )}
            <div className={b('custom-switcher-element', {arrow: true})}>
                <Icon data={ChevronDown} size={ICON_SIZE} className={b('switcher-arrow')} />
            </div>
        </div>
    );
};
