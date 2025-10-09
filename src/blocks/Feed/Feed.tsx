import * as React from 'react';

import {useAnalytics} from '@gravity-ui/page-constructor';
import {Icon} from '@gravity-ui/uikit';

import {FeedHeader} from '../../components/FeedHeader/FeedHeader';
import {Posts} from '../../components/Posts/Posts';
import {PostsError} from '../../components/PostsError/PostsError';
import {DefaultGoalIds} from '../../constants';
import {FeedContext} from '../../contexts/FeedContext';
import {RouterContext} from '../../contexts/RouterContext';
import {AnalyticsCounter} from '../../counters/utils';
import {FeedProps} from '../../models/blocks';
import {DefaultEventNames, FetchArgs, HandleChangeQueryParams} from '../../models/common';
import {getFeedQueryParams, prepareAnalyticsEvent, scrollOnPageChange} from '../../utils/common';
import {DEFAULT_PAGE, DEFAULT_ROWS_PER_PAGE} from '../constants';

import {ActionTypes, reducer} from './reducer';

const CONTAINER_ID = 'blog-cards';
const PAGE_QUERY = 'page';
const FIRST_PAGE = 1;

export const Feed = ({image, title}: FeedProps) => {
    const {
        posts,
        totalCount,
        tags,
        services,
        pinnedPost,
        getPosts,
        pageCountForShowSupportButtons,
    } = React.useContext(FeedContext);
    const router = React.useContext(RouterContext);
    const handleAnalytics = useAnalytics(DefaultEventNames.ShowMore);
    const additionalAnalyticsEvent = prepareAnalyticsEvent({
        name: DefaultGoalIds.showMore,
        counter: AnalyticsCounter.CrossSite,
    });

    const [
        {
            errorLoad,
            errorShowMore,
            isFetching,
            isShowMoreVisible,
            lastLoadedCount,
            postCountOnPage,
            postsOnPage,
            pinnedPostOnPage,
            currentPage,
            queryParams,
        },
        dispatch,
    ] = React.useReducer(reducer, {
        errorLoad: false,
        errorShowMore: false,
        isFetching: false,
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

    const setIsFetching = (value: boolean) => {
        dispatch({type: ActionTypes.SetIsFetching, payload: value});
    };

    const setErrorLoad = (value: boolean) => {
        dispatch({type: ActionTypes.SetErrorLoad, payload: value});
    };

    const handleChangeQueryParams: HandleChangeQueryParams = React.useCallback(
        (value) => {
            dispatch({type: ActionTypes.QueryParamsChange, payload: value});

            const hasFirstPageQuery = Object.keys(value).some(
                (queryKey) => queryKey === PAGE_QUERY && value[queryKey] === FIRST_PAGE,
            );

            const result = hasFirstPageQuery
                ? {
                      ...value,
                      [PAGE_QUERY]: null,
                  }
                : {
                      ...value,
                  };

            router.updateQueryCallback(result);
        },
        [router],
    );

    const fetchData = React.useCallback(
        async ({page, query}: FetchArgs) => {
            if (query && getPosts) {
                const queryParamsForRequest = getFeedQueryParams({...queryParams, ...query}, page);
                const data = await getPosts(queryParamsForRequest);

                return data;
            } else {
                throw new Error('cant get request');
            }
        },
        [getPosts, queryParams],
    );

    const handleLoad = React.useCallback(
        async ({page, query}: FetchArgs) => {
            const pageNumber = Number(page || queryParams.page || DEFAULT_PAGE);

            handleChangeQueryParams(query);

            try {
                setErrorLoad(false);
                setIsFetching(true);

                const fetchedData = await fetchData({page: pageNumber, query});

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
                setErrorLoad(true);
            }

            scrollOnPageChange(CONTAINER_ID);

            setIsFetching(false);
        },
        [fetchData, handleChangeQueryParams, queryParams],
    );

    const handlePageChange = async (value: number) => {
        pageChange(value);
        handleLoad({
            page: value,
            query: {...queryParams, page: value},
        });
    };

    const handleShowMore = async () => {
        handleAnalytics(additionalAnalyticsEvent);

        const nextPage = currentPage + 1;

        try {
            setIsFetching(true);
            const fetchedData = await fetchData({
                page: nextPage,
                query: {
                    page: nextPage,
                },
            });

            handleChangeQueryParams({
                page: nextPage,
            });

            if (fetchedData) {
                dispatch({
                    type: ActionTypes.SetShowMore,
                    payload: {
                        posts: (postsOnPage ?? []).concat(fetchedData.posts),
                        count: fetchedData.count,
                        currentPage: nextPage,
                        lastLoadedCount: fetchedData.posts.length,
                    },
                });
            }
        } catch (err) {
            dispatch({type: ActionTypes.SetErrorShowMore, payload: true});
        }

        setIsFetching(false);
    };

    const handleOnErrorReload = React.useCallback(() => {
        handleLoad({page: currentPage, query: queryParams});
    }, [currentPage, handleLoad, queryParams]);

    React.useEffect(() => {
        const loadedPostsCount = currentPage * perPageInQuery;
        dispatch({
            type: ActionTypes.SetIsShowMoreVisible,
            payload: loadedPostsCount < postCountOnPage,
        });
    }, [currentPage, lastLoadedCount, perPageInQuery, postCountOnPage]);

    const serviceItems = React.useMemo(
        () =>
            services?.map((service) => ({
                content: service.name,
                value: `${service.id}`,
            })),
        [services],
    );

    const tagItems = React.useMemo(
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
                handleLoadData={handleLoad}
                queryParams={queryParams}
                background={{
                    fullWidth: true,
                    url: image,
                    disableCompress: true,
                }}
                title={title}
            />
            {errorLoad ? (
                <PostsError onButtonClick={handleOnErrorReload} />
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
                    queryParams={queryParams}
                    pageCountForShowSupportButtons={pageCountForShowSupportButtons}
                />
            )}
        </div>
    );
};
