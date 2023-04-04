import React, {useCallback, useContext, useEffect, useMemo, useReducer} from 'react';

import {useAnalytics} from '@gravity-ui/page-constructor';
/**
 * @deprecated Metrika will be deleted after launch of analyticsEvents
 */
import {Icon} from '@gravity-ui/uikit';

import {FeedHeader} from '../../components/FeedHeader/FeedHeader';
import {Posts} from '../../components/Posts/Posts';
import {PostsError} from '../../components/PostsError/PostsError';
import {BlogMetrikaGoalIds} from '../../constants';
import {FeedContext} from '../../contexts/FeedContext';
import {RouterContext} from '../../contexts/RouterContext';
/**
 * @deprecated Metrika will be deleted after launch of analyticsEvents
 */
import metrika from '../../counters/metrika.js';
import {MetrikaCounter} from '../../counters/utils';
import {FeedProps} from '../../models/blocks';
import {DefaultEventNames, HandleChangeQueryParams} from '../../models/common';
import {getFeedQueryParams, scrollOnPageChange} from '../../utils/common';
import {DEFAULT_PAGE, DEFAULT_ROWS_PER_PAGE} from '../constants';
import {ActionTypes, reducer} from './reducer';

const CONTAINER_ID = 'blog-cards';
const PAGE_QUERY = 'page';
const FIRST_PAGE = 1;

export const Feed: React.FC<FeedProps> = ({image}) => {
    const {
        posts,
        totalCount,
        tags,
        services,
        pinnedPost,
        getPosts,
        pageCountForShowSupportButtons,
    } = useContext(FeedContext);
    const router = useContext(RouterContext);
    const handleAnalytics = useAnalytics(DefaultEventNames.ShowMore);

    const [
        {
            errorLoad,
            errorShowMore,
            isFetching,
            isShowMoreFetching,
            isShowMoreVisible,
            lastLoadedCount,
            postCountOnPage,
            postsOnPage,
            pinnedPostOnPage,
            currentPage,
            queryParams,
        },
        dispatch,
    ] = useReducer(reducer, {
        errorLoad: false,
        errorShowMore: false,
        isFetching: false,
        isShowMoreFetching: false,
        isShowMoreVisible: true,
        lastLoadedCount: posts?.length || 0,
        postCountOnPage: totalCount || 0,
        postsOnPage: posts,
        pinnedPostOnPage: pinnedPost,
        currentPage: router?.query?.page ? Number(router.query.page) : DEFAULT_PAGE,
        queryParams: router.query || {},
    });

    const perPageInQuery = queryParams?.perPage
        ? Number(queryParams.perPage)
        : DEFAULT_ROWS_PER_PAGE;

    const pageChange = (value: number) => {
        dispatch({type: ActionTypes.PageChange, payload: value});
    };

    const handleChangeQueryParams: HandleChangeQueryParams = (value) => {
        dispatch({type: ActionTypes.QueryParamsChange, payload: value});

        const hasFirstPageQuery = Object.keys(value).some(
            (queryKey) => queryKey === PAGE_QUERY && value[queryKey] === FIRST_PAGE,
        );

        if (hasFirstPageQuery) {
            value[PAGE_QUERY] = null;
        }

        router.updateQueryCallback(value);
    };

    const handlePageChange = async (value: number) => {
        pageChange(value);
        handleChangeQueryParams({page: value});
    };

    const fetchData = useCallback(
        async (pageNumber?: number) => {
            if (queryParams && getPosts) {
                const query = getFeedQueryParams(queryParams, pageNumber);
                const data = await getPosts(query);

                return data;
            } else {
                throw new Error('cant get request');
            }
        },
        [getPosts, queryParams],
    );

    const setIsFetching = (value: boolean) => {
        dispatch({type: ActionTypes.SetIsFetching, payload: value});
    };

    const fetchAndReplaceData = useCallback(
        async (pageNumber: number) => {
            try {
                dispatch({type: ActionTypes.SetErrorLoad, payload: false});
                const fetchedData = await fetchData(pageNumber);

                if (fetchedData) {
                    dispatch({
                        type: ActionTypes.SetPosts,
                        payload: {
                            posts: fetchedData.posts,
                            pinnedPost: fetchedData.pinnedPost,
                            count: fetchedData.count,
                            page: pageNumber,
                        },
                    });
                }
            } catch (err) {
                dispatch({type: ActionTypes.SetErrorLoad, payload: true});
            }

            scrollOnPageChange(CONTAINER_ID);
            setIsFetching(false);
        },
        [fetchData],
    );

    const handleShowMore = async () => {
        dispatch({type: ActionTypes.SetIsShowMoreFetching, payload: true});
        /**
         * @deprecated Metrika will be deleted after launch of analyticsEvents
         */
        metrika.reachGoal(MetrikaCounter.CrossSite, BlogMetrikaGoalIds.showMore);
        handleAnalytics();
        try {
            const fetchedData = await fetchData(currentPage + 1);

            handleChangeQueryParams({
                page: currentPage + 1,
            });

            if (fetchedData) {
                dispatch({
                    type: ActionTypes.SetShowMore,
                    payload: {
                        posts: (postsOnPage ?? []).concat(fetchedData.posts),
                        count: fetchedData.count,
                        currentPage: currentPage + 1,
                        lastLoadedCount: fetchedData.posts.length,
                    },
                });
            }
        } catch (err) {
            dispatch({type: ActionTypes.SetErrorShowMore, payload: true});
        }

        dispatch({type: ActionTypes.SetIsShowMoreFetching, payload: false});
    };

    useEffect(() => {
        if (isFetching) {
            fetchAndReplaceData(Number(queryParams.page || DEFAULT_PAGE));
        }
    }, [fetchAndReplaceData, isFetching, queryParams.page]);

    useEffect(() => {
        const loadedPostsCount = currentPage * perPageInQuery;
        dispatch({
            type: ActionTypes.SetIsShowMoreVisible,
            payload: loadedPostsCount < postCountOnPage,
        });
    }, [currentPage, lastLoadedCount, perPageInQuery, postCountOnPage]);

    const serviceItems = useMemo(
        () =>
            services?.map((service) => ({
                content: service.name,
                value: `${service.id}`,
            })),
        [services],
    );

    const tagItems = useMemo(
        () =>
            tags?.map((tag) => ({
                content: tag.name,
                value: tag.slug,
                icon: tag.icon && <Icon data={tag.icon} />,
            })),
        [tags],
    );

    return (
        <div>
            <FeedHeader
                verticalOffset="s"
                tags={tagItems}
                services={serviceItems}
                setIsFetching={setIsFetching}
                handleChangeQuery={handleChangeQueryParams}
                queryParams={queryParams}
                background={{
                    fullWidth: true,
                    url: image,
                    disableCompress: true,
                }}
            />
            {errorLoad ? (
                <PostsError
                    onButtonClick={() =>
                        fetchAndReplaceData(Number(queryParams.page || DEFAULT_PAGE))
                    }
                />
            ) : (
                <Posts
                    containerId={CONTAINER_ID}
                    currentPage={currentPage}
                    isShowMoreVisible={isShowMoreVisible}
                    errorShowMore={errorShowMore}
                    postCountOnPage={postCountOnPage}
                    perPageInQuery={perPageInQuery}
                    handleShowMore={handleShowMore}
                    handlePageChange={handlePageChange}
                    postsOnPage={postsOnPage}
                    pinnedPostOnPage={pinnedPostOnPage}
                    isFetching={isFetching}
                    isShowMoreFetching={isShowMoreFetching}
                    pageCountForShowSupportButtons={pageCountForShowSupportButtons}
                />
            )}
        </div>
    );
};
