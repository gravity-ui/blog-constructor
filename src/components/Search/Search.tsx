import React, {useRef, useCallback, useEffect, useState} from 'react';
import _ from 'lodash';
import {TextInput} from '@gravity-ui/uikit';
import {ClassNameProps} from '@yandex-data-ui/cloud-components';

import {ButtonWithIcon} from '../ButtonWithIcon/ButtonWithIcon';

import {useIsIPhone} from '../../hooks/useIsIPhone';

import {Close} from '../../icons/Close';
import {SearchIcon} from '../../icons/SearchIcon';

import {i18, BlogKeyset} from '../../i18n';

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
const CLOSE_ICON_SIZE = 12;

export const Search: React.FC<SearchProps> = (props) => {
    const {
        className,
        initialValue,
        onSubmit,
        debounce = 300,
        placeholder = i18(BlogKeyset.Search),
        size = 'm',
        autoFocus = false,
        value: externalValue,
    } = props;
    const [value, setValue] = useState<string>(initialValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const onChangeDebounce = useCallback(_.debounce(onSubmit, debounce), []);
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
            <div className={b('search-suggest-container')} data-qa="search-suggest-container">
                <TextInput
                    value={value}
                    onUpdate={(query) => {
                        setValue(query);
                        onChangeDebounce(query);
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
                        onChangeDebounce.cancel();
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