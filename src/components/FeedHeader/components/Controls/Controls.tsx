import * as React from 'react';

import {Bookmark} from '@gravity-ui/icons';
import {useAnalytics} from '@gravity-ui/page-constructor';
import {Button, Icon, MobileProvider} from '@gravity-ui/uikit';

import {LikesContext} from '../../../../contexts/LikesContext';
import {Keyset, i18n} from '../../../../i18n';
import {DefaultEventNames, FetchArgs, FilterConfig, Query} from '../../../../models/common';
import {block} from '../../../../utils/cn';
import {Search} from '../../../Search/Search';
import {Filter} from '../Filters/Filter';

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

    const handleFilterSelect = React.useCallback(
        (query: Query) =>
            handleLoadData({page: DEFAULT_PAGE, query: {page: DEFAULT_PAGE, ...query}}),
        [handleLoadData],
    );

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

                    {filters.map((filter) => (
                        <Filter
                            key={filter.queryParamName}
                            filter={filter}
                            initialValue={queryParams?.[filter.queryParamName]}
                            onSelect={handleFilterSelect}
                            className={b('filter-item')}
                        />
                    ))}

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
