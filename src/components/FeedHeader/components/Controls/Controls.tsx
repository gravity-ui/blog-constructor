import React, {ReactNode, useContext, useMemo, useState} from 'react';

import {useAnalytics} from '@gravity-ui/page-constructor';
import {Button, Icon, Select} from '@gravity-ui/uikit';

import {DefaultGoalIds} from '../../../../constants';
import {LikesContext} from '../../../../contexts/LikesContext';
import {MobileContext} from '../../../../contexts/MobileContext';
import {AnalyticsCounter} from '../../../../counters/utils';
import {Keyset, i18n} from '../../../../i18n';
import {Save} from '../../../../icons/Save';
import {DefaultEventNames, FetchArgs, Query} from '../../../../models/common';
import {block} from '../../../../utils/cn';
import {Search} from '../../../Search/Search';
import {prepareAnalyticsEvent} from '../../../../utils/common';

import {renderFilter, renderOption, renderSwitcher} from './customRenders';

import './Controls.scss';

const b = block('feed-controls');

export type SelectItem = {
    content: string;
    value: string;
    icon?: ReactNode;
};

export type ControlsProps = {
    handleLoadData: (props: FetchArgs) => void;
    tags?: SelectItem[];
    services?: SelectItem[];
    queryParams: Query;
};

const ICON_SIZE = 16;
const DEFAULT_PAGE = 1;
const VIRTUALIZATION_THRESHOLD = 1000;

export const Controls = ({
    handleLoadData,
    tags = [],
    services = [],
    queryParams,
}: ControlsProps) => {
    const {hasLikes} = useContext(LikesContext);
    const handleAnalyticsTag = useAnalytics(DefaultEventNames.Tag);
    const handleAnalyticsService = useAnalytics(DefaultEventNames.Service);
    const handleAnalyticsSaveOnly = useAnalytics(DefaultEventNames.SaveOnly);

    const {
        savedOnly: savedOnlyInitial,
        search: searchInitial,
        tags: tagInitial,
        services: servicesInitial,
    } = queryParams || {};

    const [savedOnly, setSavedOnly] = useState<boolean>(savedOnlyInitial === 'true');
    const [search, setSearch] = useState<string>(searchInitial as string);

    const isMobile = useContext(MobileContext);

    const handleSavedOnly = () => {
        handleAnalyticsSaveOnly();
        setSavedOnly(!savedOnly);
        handleLoadData({
            page: DEFAULT_PAGE,
            query: {
                savedOnly: savedOnly ? '' : 'true',
                search: '',
                tags: '',
                page: DEFAULT_PAGE,
                services: '',
            },
        });
    };

    const handleSearch = (searchValue: string) => {
        setSearch(searchValue);

        handleLoadData({
            page: DEFAULT_PAGE,
            query: {search: searchValue, page: DEFAULT_PAGE},
        });
    };

    const handleTagSelect = (selectedTags: string[]) => {
        const event = prepareAnalyticsEvent({
            name: DefaultGoalIds.tag,
            counter: AnalyticsCounter.CrossSite,
        });
        handleAnalyticsTag(event, {
            theme: selectedTags[0],
        });

        const isEmptyTag = selectedTags.some((tag) => tag === 'empty');

        handleLoadData({
            page: DEFAULT_PAGE,
            query: {
                tags: isEmptyTag ? '' : selectedTags[0],
                page: DEFAULT_PAGE,
            },
        });
    };

    const handleServicesSelect = (selectedServices: string[]) => {
        const forAnalyticsServices = services.filter((service) => {
            return selectedServices.includes(service.value);
        });

        const servicesAsStringForAnalytics = forAnalyticsServices
            .map((service) => service.content)
            .join(',');

        const event = prepareAnalyticsEvent({
            name: DefaultGoalIds.service,
            counter: AnalyticsCounter.CrossSite,
        });
        handleAnalyticsService(event, {
            service: servicesAsStringForAnalytics,
        });

        const servicesAsString = selectedServices.join(',');

        handleLoadData({
            page: DEFAULT_PAGE,
            query: {services: servicesAsString, page: DEFAULT_PAGE},
        });
    };

    const tagsItems = useMemo(
        () => [{value: 'empty', content: i18n(Keyset.AllTags)} as unknown as SelectItem, ...tags],
        [tags],
    );

    const servicesItems = useMemo(
        () => (servicesInitial ? [...(servicesInitial as string).split(',')] : []),
        [servicesInitial],
    );

    return (
        <div className={b('header')}>
            <h1 className={b('header-item', {title: true})}>{i18n(Keyset.Title)}</h1>
            <div className={b('header-item', {filters: true})}>
                <div className={b('filter-item')}>
                    <Search
                        className={b('search')}
                        placeholder={i18n(Keyset.Search)}
                        initialValue={search && typeof search === 'string' ? search : ''}
                        onSubmit={handleSearch}
                    />
                </div>
                <div className={b('filter-item')}>
                    <Select
                        className={b('select')}
                        size="xl"
                        options={tagsItems}
                        defaultValue={[tagInitial] as string[]}
                        onUpdate={handleTagSelect}
                        placeholder={i18n(Keyset.AllTags)}
                        popupClassName={b('popup', {isMobile})}
                        renderControl={renderSwitcher({
                            initial: [tagInitial],
                            list: tagsItems,
                            defaultLabel: i18n(Keyset.AllTags),
                        })}
                        disablePortal
                        virtualizationThreshold={VIRTUALIZATION_THRESHOLD}
                        renderOption={renderOption}
                    />
                </div>

                {services.length > 0 ? (
                    <div className={b('filter-item')}>
                        <Select
                            className={b('select')}
                            size="xl"
                            multiple
                            filterable
                            hasClear
                            disablePortal
                            options={services}
                            defaultValue={servicesItems}
                            popupClassName={b('popup', {isMobile})}
                            onUpdate={handleServicesSelect}
                            placeholder={i18n(Keyset.AllServices)}
                            renderControl={renderSwitcher({
                                initial: servicesItems,
                                list: services,
                                defaultLabel: i18n(Keyset.AllServices),
                            })}
                            virtualizationThreshold={VIRTUALIZATION_THRESHOLD}
                            renderOption={renderOption}
                            renderFilter={renderFilter}
                        />
                    </div>
                ) : null}
                {hasLikes ? (
                    <div className={b('filter-item', {'width-auto': true})}>
                        <Button
                            view={'outlined'}
                            className={b('saved-only-button', {savedOnly})}
                            size="xl"
                            onClick={handleSavedOnly}
                        >
                            <Icon data={Save} size={ICON_SIZE} className={b('icon', {savedOnly})} />
                            {i18n(Keyset.ActionSavedOnly)}
                        </Button>
                    </div>
                ) : null}
            </div>
        </div>
    );
};
