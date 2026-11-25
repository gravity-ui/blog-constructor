import {GetPageConfigParams, PaginatorItemProps, PaginatorProps} from './types';

const DEFAULT_VISIBLE_PAGES_COUNT = 5;

export const getPageConfigs = ({
    page,
    queryParams,
    pagesCount,
    visiblePagesCount = DEFAULT_VISIBLE_PAGES_COUNT,
    handlePageClick,
}: GetPageConfigParams) => {
    const paginatorItems: Array<PaginatorItemProps> = [];
    const visibleCount =
        Number.isFinite(visiblePagesCount) && visiblePagesCount >= 1
            ? Math.floor(visiblePagesCount)
            : DEFAULT_VISIBLE_PAGES_COUNT;
    const pageOffset = Math.floor((visibleCount - 1) / 2);
    const startPage = Math.max(1, Math.min(page - pageOffset, pagesCount - visibleCount + 1));
    const endPage = Math.min(startPage + visibleCount - 1, pagesCount);

    for (let i = startPage; i <= endPage; i++) {
        paginatorItems.push({
            key: String(i),
            dataKey: String(i),
            index: i,
            mods: {type: 'page', active: page === i},
            queryParams,
            onClick: handlePageClick,
            content: i,
        });
    }

    return paginatorItems;
};

export const getPagesCount = (
    props: Pick<PaginatorProps, 'totalItems' | 'itemsPerPage' | 'maxPages'>,
) => {
    const totalPages = Math.ceil(props.totalItems / props.itemsPerPage);

    return Math.min(totalPages, props.maxPages);
};
