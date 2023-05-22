import React, {useEffect, useRef, useState} from 'react';

import {TextInput} from '@gravity-ui/uikit';
import {debounce as lodashDebounce} from 'lodash';

import {useIsIPhone} from '../../hooks/useIsIPhone';
import {Keyset, i18} from '../../i18n';
import {Close} from '../../icons/Close';
import {SearchIcon} from '../../icons/SearchIcon';
import {ClassNameProps} from '../../models/common';
import {block} from '../../utils/cn';
import {ButtonWithIcon} from '../ButtonWithIcon/ButtonWithIcon';

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
const CLOSE_ICON_SIZE = 12;

export const Search: React.FC<SearchProps> = (props) => {
    const {
        className,
        initialValue,
        onSubmit,
        debounce = 300,
        placeholder = i18(Keyset.Search),
        size = 'm',
        autoFocus = false,
        value: externalValue,
    } = props;
    const handleChange = lodashDebounce(onSubmit, debounce);

    const [value, setValue] = useState<string>(initialValue);
    const inputRef = useRef<HTMLInputElement>(null);
    const isIPhone = useIsIPhone();

    useEffect(() => {
        if (externalValue !== undefined) {
            setValue(externalValue);
        }
    }, [externalValue]);

    useEffect(() => {
        if (autoFocus && !isIPhone) {
            setTimeout(() => inputRef?.current?.focus({preventScroll: true}), 0);
        }
    }, [autoFocus, inputRef, isIPhone]);

    return (
        <div className={b({size}, className)}>
            <div className={b('search-suggest-container')}>
                <TextInput
                    value={value}
                    onUpdate={(query) => {
                        setValue(query);
                        handleChange(query);
                    }}
                    placeholder={placeholder}
                    className={b('search-suggest')}
                    size={size === 'm' ? 'xl' : 'l'}
                    controlRef={inputRef}
                />
            </div>
            {value ? (
                <ButtonWithIcon
                    className={b('close-button')}
                    icon={Close}
                    iconSize={CLOSE_ICON_SIZE}
                    size="xs"
                    onClick={() => {
                        handleChange.cancel();
                        setValue('');
                        onSubmit('');
                    }}
                />
            ) : (
                <ButtonWithIcon
                    className={b('search-button')}
                    icon={SearchIcon}
                    iconSize={SEARCH_ICON_SIZE}
                    size="xs"
                    disabled={true}
                />
            )}
        </div>
    );
};
