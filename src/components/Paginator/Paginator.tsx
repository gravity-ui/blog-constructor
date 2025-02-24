import * as React from 'react';

import {useAnalytics} from '@gravity-ui/page-constructor';

import {DefaultGoalIds} from '../../constants';
import {AnalyticsCounter} from '../../counters/utils';
import {DefaultEventNames} from '../../models/common';
import {block} from '../../utils/cn';

import {NavigationButton} from './components/NavigationButton';
import {PaginatorItem} from './components/PaginatorItem';
import {ArrowType, PaginatorItemProps, PaginatorProps} from './types';
import {getPageConfigs, getPagesCount} from './utils';
import {prepareAnalyticsEvent} from '../../utils/common';

import _ from 'lodash';

import './Paginator.scss';

const b = block('paginator');

const DEFAULT_PAGE_COUNT_FOR_SHOW_SUPPORT_BUTTONS = 6;

export const Paginator = ({
    itemsPerPage,
    totalItems,
    maxPages,
    page,
    className,
    onPageChange,
    queryParams,
    pageCountForShowSupportButtons = DEFAULT_PAGE_COUNT_FOR_SHOW_SUPPORT_BUTTONS,
}: PaginatorProps) => {
    const [pagesCount, setPagesCount] = React.useState(
        getPagesCount({itemsPerPage, totalItems, maxPages}),
    );

    const nonPagedQuery = React.useMemo(() => {
        return _.omit(queryParams, ['page']);
    }, [queryParams]);

    React.useEffect(() => {
        const count = getPagesCount({itemsPerPage, totalItems, maxPages});
        setPagesCount(count);
    }, [itemsPerPage, totalItems, maxPages]);

    const handlePageChange = (pageIndex: number) => onPageChange?.(pageIndex);

    const isShowSupportButtons = React.useMemo(
        () => pagesCount > pageCountForShowSupportButtons,
        [pageCountForShowSupportButtons, pagesCount],
    );

    const handleAnalyticsHome = useAnalytics(DefaultEventNames.PaginatorHome);
    const handleAnalyticsNext = useAnalytics(DefaultEventNames.PaginatorNext);
    const handleAnalyticsPage = useAnalytics(DefaultEventNames.PaginatorPage);

    if (pagesCount <= 1) {
        return null;
    }

    const handleArrowClick = (type: ArrowType | number) => {
        let newPage = page;

        if (type === 'prev' && page > 1) {
            const event = prepareAnalyticsEvent({
                name: DefaultGoalIds.home,
                counter: AnalyticsCounter.CrossSite,
            });
            handleAnalyticsHome(event);
            newPage = 1;
        } else if (type === 'next' && page < pagesCount) {
            const event = prepareAnalyticsEvent({
                name: DefaultGoalIds.next,
                counter: AnalyticsCounter.CrossSite,
            });
            handleAnalyticsNext(event);
            newPage = page + 1;
        }

        if (newPage !== page) {
            handlePageChange(newPage);
        }
    };

    const handlePageClick = (index: number | ArrowType) => {
        if (index !== page && typeof index === 'number') {
            const event = prepareAnalyticsEvent({
                name: DefaultGoalIds.page,
                counter: AnalyticsCounter.CrossSite,
            });
            handleAnalyticsPage(event, {page: String(index)});
            handlePageChange(index);
        }
    };

    const paginatorItems = getPageConfigs({
        page,
        pagesCount,
        queryParams: nonPagedQuery,
        handlePageClick,
    });

    if (page > 1 && isShowSupportButtons) {
        paginatorItems.unshift({
            key: ArrowType.Prev,
            dataKey: ArrowType.Prev,
            queryParams: nonPagedQuery,
            mods: {type: ArrowType.Prev},
            onClick: handleArrowClick,
            index: 0,
            content: <NavigationButton arrowType={ArrowType.Prev} />,
        });
    }

    if (page < pagesCount && isShowSupportButtons) {
        paginatorItems.push({
            key: ArrowType.Next,
            queryParams: nonPagedQuery,
            dataKey: ArrowType.Next,
            mods: {type: ArrowType.Next},
            index: page + 1,
            onClick: handleArrowClick,
            content: <NavigationButton arrowType={ArrowType.Next} />,
        });
    }

    const renderPaginatorItem = (item: PaginatorItemProps) => {
        const {key, ...rest} = item;
        return <PaginatorItem key={`page_${key}`} {...rest} />;
    };

    return (
        <div className={b('pagination')}>
            {page > 1 && (
                <div className={b('pagination-block')}>
                    <ul className={b(null, className)}>
                        {paginatorItems.slice(0, 1).map(renderPaginatorItem)}
                    </ul>
                </div>
            )}
            <div className={b('pagination-block')}>
                <ul className={b(null, className)}>
                    {paginatorItems
                        .slice(
                            page > 1 ? 1 : 0,
                            page < pagesCount ? paginatorItems.length - 1 : paginatorItems.length,
                        )
                        .map(renderPaginatorItem)}
                </ul>
            </div>
            {page < pagesCount && (
                <div className={b('pagination-block')}>
                    <ul className={b(null, className)}>
                        {paginatorItems
                            .slice(paginatorItems.length - 1, paginatorItems.length)
                            .map(renderPaginatorItem)}
                    </ul>
                </div>
            )}
        </div>
    );
};
