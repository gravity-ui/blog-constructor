import React, {MouseEvent} from 'react';

import {CardLayoutBlock} from '@gravity-ui/page-constructor';
import {Button} from '@gravity-ui/uikit';

import {Keyset, i18} from '../../i18n';
import {PostData} from '../../models/common';
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
    isShowMoreFetching: boolean;
    handleShowMore: (
        value?: MouseEvent<HTMLButtonElement | HTMLAnchorElement>,
    ) => Promise<void> | void;
    handlePageChange: (value: number) => Promise<void> | void;
    postsOnPage?: PostData[];
    pinnedPostOnPage?: PostData;
    pageCountForShowSupportButtons?: number;
};

export const Posts: React.FC<PostCardProps> = ({
    containerId,
    pinnedPostOnPage,
    currentPage,
    postsOnPage,
    isShowMoreVisible,
    errorShowMore,
    postCountOnPage,
    perPageInQuery,
    isFetching,
    isShowMoreFetching,
    handleShowMore,
    handlePageChange,
    pageCountForShowSupportButtons,
}) => (
    <div className={b()}>
        <div id={containerId} className={b('cards-container')}>
            {pinnedPostOnPage && currentPage === 1 && (
                <div className={b('pinned-container')}>
                    <PostCard post={pinnedPostOnPage} size="m" fullWidth showTag />
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
                        <PostCard key={post.id} post={post} showTag />
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
                    loading={isShowMoreFetching}
                >
                    {i18(Keyset.ActionLoadMore)}
                </Button>
            )}
            {errorShowMore && (
                <div className={b('error-show-more')}>
                    <div>{i18(Keyset.ErrorTitle)}</div>
                    <div>{i18(Keyset.PostLoadError)}</div>
                </div>
            )}
            {Boolean(currentPage && postCountOnPage) && (
                <div className={b('paginator')}>
                    <Paginator
                        onPageChange={handlePageChange}
                        page={currentPage}
                        totalItems={postCountOnPage}
                        itemsPerPage={perPageInQuery}
                        loading={isFetching}
                        maxPages={Infinity}
                        pageCountForShowSupportButtons={pageCountForShowSupportButtons}
                    />
                </div>
            )}
        </div>
    </div>
);
