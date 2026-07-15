import {Keyset, i18n} from '../../../../i18n';
import {block} from '../../../../utils/cn';
import {Search} from '../../../Search/Search';

import './SearchFilter.scss';

const b = block('search-filter');

export type SearchFilterProps = {
    placeholder?: string;
    initialValue: string | undefined;
    onChange: (value: string) => void;
    onClick?: () => void;
    className?: string;
};

export const SearchFilter = ({
    placeholder,
    initialValue,
    onChange,
    onClick,
    className,
}: SearchFilterProps) => {
    return (
        <div className={className}>
            <Search
                className={b('search')}
                placeholder={placeholder ?? i18n(Keyset.Search)}
                initialValue={initialValue && typeof initialValue === 'string' ? initialValue : ''}
                onSubmit={onChange}
                onClick={onClick}
            />
        </div>
    );
};
