import * as React from 'react';

import {Magnifier, Xmark} from '@gravity-ui/icons';
import {Icon, TextInput} from '@gravity-ui/uikit';
import lodashDebounce from 'lodash/debounce';

import {useIsIPhone} from '../../hooks/useIsIPhone';
import {Keyset, i18n} from '../../i18n';
import {ClassNameProps} from '../../models/common';
import {block} from '../../utils/cn';

import './Search.scss';

const b = block('search');

export type SearchSize = 's' | 'm';

interface SearchProps extends ClassNameProps {
    value?: string;
    initialValue: string;
    onSubmit: (value: string) => void;
    debounce?: number;
    placeholder?: string;
    size?: SearchSize;
    autoFocus?: boolean;
    className?: string;
}

const SEARCH_ICON_SIZE = 16;
const CLOSE_ICON_SIZE = 20;
const AUTOFOCUS_TIMEOUT = 0;

/**
 * Search component, placed on blog main page,
 * based on TextInput from uikit
 *
 * @returns {JSX|null}
 */
export const Search = ({
    className,
    initialValue,
    onSubmit,
    debounce = 300,
    placeholder = i18n(Keyset.Search),
    size = 'm',
    autoFocus = false,
    value: externalValue,
}: SearchProps) => {
    const handleChange = lodashDebounce(onSubmit, debounce);

    const [value, setValue] = React.useState<string>(initialValue);
    const inputRef = React.useRef<HTMLInputElement>(null);
    const isIPhone = useIsIPhone();

    React.useEffect(() => {
        if (externalValue !== undefined) {
            setValue(externalValue);
        }
    }, [externalValue]);

    React.useEffect(() => {
        if (autoFocus && !isIPhone) {
            setTimeout(() => inputRef?.current?.focus({preventScroll: true}), AUTOFOCUS_TIMEOUT);
        }
    }, [autoFocus, inputRef, isIPhone]);

    const rightContent = React.useMemo(() => {
        const isClose = Boolean(value);
        const iconSize = value ? CLOSE_ICON_SIZE : SEARCH_ICON_SIZE;

        const handleClick = () => {
            if (value) {
                handleChange.cancel();
                setValue('');
                onSubmit('');
                inputRef.current?.focus();
            }
        };

        return (
            <button
                className={b('input-icon', {close: isClose})}
                onClick={handleClick}
                aria-label={value ? i18n(Keyset.ClearAction) : undefined}
                aria-hidden={!value}
            >
                <Icon size={iconSize} data={isClose ? Xmark : Magnifier} />
            </button>
        );
    }, [handleChange, onSubmit, value]);

    return (
        <div className={b({size}, className)}>
            <TextInput
                className={b('search-suggest')}
                value={value}
                onUpdate={(query) => {
                    setValue(query);
                    handleChange(query);
                }}
                placeholder={placeholder}
                size={size === 'm' ? 'xl' : 'l'}
                controlRef={inputRef}
                view="clear"
                controlProps={{
                    className: b('search-suggest-control'),
                }}
                endContent={rightContent}
            />
        </div>
    );
};
