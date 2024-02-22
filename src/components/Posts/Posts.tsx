import React, {MouseEvent} from 'react';

import {CardLayoutBlock} from '@gravity-ui/page-constructor';
import {Button} from '@gravity-ui/uikit';

import {Keyset, i18n} from '../../i18n';
import {PostCardSize, PostCardTitleHeadingLevel, PostData, Query} from '../../models/common';
import {block} from '../../utils/cn';
import {Paginator} from '../Paginator/Paginator';
import {PostCard} from '../PostCard/PostCard';
import {PostsEmpty} from '../PostsEmpty/PostsEmpty';

import './Posts.scss';

const b = block('posts');

type PostCardProps = {
    containerId: string;
    currentPage: number;
    isShowMoreVisible: boolean;
    errorShowMore: boolean;
    postCountOnPage: number;
    perPageInQuery: number;
    isFetching: boolean;
    handleShowMore: (
        value?: MouseEvent<HTMLButtonElement | HTMLAnchorElement>,
    ) => Promise<void> | void;
    handlePageChange: (value: number) => Promise<void> | void;
    postsOnPage?: PostData[];
    pinnedPostOnPage?: PostData;
    pageCountForShowSupportButtons?: number;
    queryParams: Query;
};

export const Posts = ({
    containerId,
    pinnedPostOnPage,
    currentPage,
    postsOnPage,
    isShowMoreVisible,
    errorShowMore,
    postCountOnPage,
    perPageInQuery,
    isFetching,
    handleShowMore,
    handlePageChange,
    pageCountForShowSupportButtons,
    queryParams,
}: PostCardProps) => (
    <div className={b()}>
        {isFetching && <div className={b('loaderContainer')} />}
        <div id={containerId} className={b('cards-container', {isLoading: isFetching})}>
            {pinnedPostOnPage && currentPage === 1 && (
                <div className={b('pinned-container')}>
                    <PostCard
                        post={pinnedPostOnPage}
                        size={PostCardSize.MEDIUM}
                        fullWidth
                        showTag
                        titleHeadingLevel={PostCardTitleHeadingLevel.H2}
                    />
                </div>
            )}
            {postsOnPage?.length ? (
                <CardLayoutBlock
                    title={''}
                    colSizes={{
                        all: 12,
                        lg: 4,
                        md: 6,
                    }}
                >
                    {postsOnPage?.map((post) => (
                        <PostCard
                            key={post.id}
                            post={post}
                            showTag
                            titleHeadingLevel={
                                pinnedPostOnPage
                                    ? PostCardTitleHeadingLevel.H3
                                    : PostCardTitleHeadingLevel.H2
                            }
                        />
                    ))}
                </CardLayoutBlock>
            ) : (
                <PostsEmpty />
            )}
        </div>

        <div className={b('pagination')}>
            {Boolean(isShowMoreVisible && postsOnPage?.length) && (
                <Button
                    view="outlined"
                    size="xl"
                    className={b('more-button')}
                    onClick={handleShowMore}
                >
                    {i18n(Keyset.ActionLoadMore)}
                </Button>
            )}
            {errorShowMore && (
                <div className={b('error-show-more')}>
                    <div>{i18n(Keyset.ErrorTitle)}</div>
                    <div>{i18n(Keyset.PostLoadError)}</div>
                </div>
            )}
            {Boolean(currentPage && postCountOnPage) && (
                <div className={b('paginator')}>
                    <Paginator
                        onPageChange={handlePageChange}
                        page={currentPage}
                        totalItems={postCountOnPage}
                        itemsPerPage={perPageInQuery}
                        maxPages={Infinity}
                        pageCountForShowSupportButtons={pageCountForShowSupportButtons}
                        queryParams={queryParams}
                    />
                </div>
            )}
        </div>
    </div>
);
