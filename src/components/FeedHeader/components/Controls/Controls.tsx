import * as React from 'react';

import {Bookmark} from '@gravity-ui/icons';
import {useAnalytics} from '@gravity-ui/page-constructor';
import {Button, Icon, MobileProvider, Select} from '@gravity-ui/uikit';

import {LikesContext} from '../../../../contexts/LikesContext';
import {MobileContext} from '../../../../contexts/MobileContext';
import {Keyset, i18n} from '../../../../i18n';
import {
    DefaultEventNames,
    FetchArgs,
    FilterConfig,
    Query,
    SelectItem,
} from '../../../../models/common';
import {block} from '../../../../utils/cn';
import {Search} from '../../../Search/Search';

import {renderFilter, renderOption, renderSwitcher} from './customRenders';

import './Controls.scss';

const b = block('feed-controls');

export type ControlsProps = {
    handleLoadData: (props: FetchArgs) => void;
    filters?: FilterConfig[];
    queryParams: Query;
    title?: string;
};

const ICON_SIZE = 16;
const DEFAULT_PAGE = 1;
const VIRTUALIZATION_THRESHOLD = 1000;

export const Controls = ({
    handleLoadData,
    filters = [],
    queryParams,
    title = i18n(Keyset.Title),
}: ControlsProps) => {
    const {hasLikes} = React.useContext(LikesContext);
    const handleAnalyticsSaveOnly = useAnalytics(DefaultEventNames.SaveOnly);

    const {savedOnly: savedOnlyInitial, search: searchInitial} = queryParams || {};

    const [savedOnly, setSavedOnly] = React.useState<boolean>(savedOnlyInitial === 'true');
    const [search, setSearch] = React.useState<string>(searchInitial as string);

    const isMobile = React.useContext(MobileContext);

    const handleSavedOnly = () => {
        handleAnalyticsSaveOnly();
        setSavedOnly(!savedOnly);
        handleLoadData({
            page: DEFAULT_PAGE,
            query: {
                savedOnly: savedOnly ? '' : 'true',
                search: '',
                page: DEFAULT_PAGE,
            },
        });
    };

    const handleSearch = React.useCallback(
        (searchValue: string) => {
            setSearch(searchValue);

            handleLoadData({
                page: DEFAULT_PAGE,
                query: {search: searchValue, page: DEFAULT_PAGE},
            });
        },
        [handleLoadData],
    );

    const makeHandleFilterSelect = (filter: FilterConfig) => (selectedValues: string[]) => {
        const query: Query = {page: DEFAULT_PAGE};

        if (filter.multiple) {
            query[filter.queryParamName] = selectedValues.join(',');
        } else {
            const isEmpty = selectedValues.some((v) => v === 'empty');
            query[filter.queryParamName] = isEmpty ? '' : selectedValues[0];
        }

        handleLoadData({page: DEFAULT_PAGE, query});
    };

    return (
        <MobileProvider mobile={false}>
            <div className={b('header')}>
                <h1 className={b('header-item', {title: true})}>{title}</h1>
                <div className={b('header-item', {filters: true})}>
                    <div className={b('filter-item')}>
                        <Search
                            className={b('search')}
                            placeholder={i18n(Keyset.Search)}
                            initialValue={search && typeof search === 'string' ? search : ''}
                            onSubmit={handleSearch}
                        />
                    </div>

                    {filters.map((filter) => {
                        const initialRaw = queryParams?.[filter.queryParamName];

                        const defaultValue = filter.multiple
                            ? initialRaw
                                ? (initialRaw as string).split(',')
                                : []
                            : ([initialRaw] as string[]);

                        const itemsWithEmpty: SelectItem[] = filter.multiple
                            ? filter.items
                            : [
                                  {value: 'empty', content: filter.allLabel} as SelectItem,
                                  ...filter.items,
                              ];

                        return (
                            <div key={filter.queryParamName} className={b('filter-item')}>
                                <Select
                                    className={b('select')}
                                    size="xl"
                                    multiple={filter.multiple}
                                    filterable={filter.filterable}
                                    hasClear={filter.hasClear ?? filter.multiple}
                                    disablePortal
                                    options={itemsWithEmpty}
                                    defaultValue={defaultValue}
                                    popupClassName={b('popup', {isMobile})}
                                    onUpdate={makeHandleFilterSelect(filter)}
                                    placeholder={filter.placeholder ?? filter.allLabel}
                                    renderControl={renderSwitcher({
                                        initial: defaultValue,
                                        list: itemsWithEmpty,
                                        defaultLabel: filter.allLabel,
                                        qa: filter.qa,
                                    })}
                                    virtualizationThreshold={VIRTUALIZATION_THRESHOLD}
                                    renderOption={renderOption}
                                    renderFilter={filter.filterable ? renderFilter : undefined}
                                />
                            </div>
                        );
                    })}

                    {hasLikes ? (
                        <div className={b('filter-item', {'width-auto': true})}>
                            <Button
                                view={'outlined'}
                                className={b('saved-only-button', {savedOnly})}
                                size="xl"
                                onClick={handleSavedOnly}
                                selected={savedOnly}
                            >
                                <Icon
                                    data={Bookmark}
                                    size={ICON_SIZE}
                                    className={b('icon', {savedOnly})}
                                />
                                {i18n(Keyset.ActionSavedOnly)}
                            </Button>
                        </div>
                    ) : null}
                </div>
            </div>
        </MobileProvider>
    );
};
