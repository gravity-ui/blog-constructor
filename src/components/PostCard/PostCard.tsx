import React, {useContext, useMemo} from 'react';

import {CardBase, HTML, MetrikaGoal, YFMWrapper} from '@gravity-ui/page-constructor';

import {LikesContext} from '../../contexts/LikesContext';
import {PostCardSize, PostCardTitleHeadingLevel, PostData} from '../../models/common';
import {block} from '../../utils/cn';
import {SuggestPostInfo} from '../PostInfo/SuggestPostInfo';

import './PostCard.scss';

type PostCardProps = {
    post: PostData;
    fullWidth?: boolean;
    showTag?: boolean;
    size?: PostCardSize;
    titleHeadingLevel?: PostCardTitleHeadingLevel;
    /**
     * @deprecated Metrika will be deleted after launch of analyticsEvents
     */
    metrikaGoals?: MetrikaGoal;
};

const b = block('post-card');

export const PostCard = ({
    post,
    metrikaGoals,
    fullWidth = false,
    size = PostCardSize.SMALL,
    showTag = false,
    titleHeadingLevel = PostCardTitleHeadingLevel.H3,
}: PostCardProps) => {
    const {
        title: postTitle,
        htmlTitle,
        textTitle,
        blogPostId,
        id,
        date,
        readingTime,
        hasUserLike,
        likes,
        image,
        description,
        tags,
        url,
    } = post;

    const title = postTitle || textTitle || htmlTitle;

    const {toggleLike, hasLikes} = useContext(LikesContext);

    const likesProps = useMemo(
        () =>
            hasLikes
                ? {
                      hasUserLike,
                      likesCount: likes,
                      toggleLike,
                  }
                : undefined,
        [hasUserLike, likes, toggleLike, hasLikes],
    );

    return (
        <CardBase url={url} metrikaGoals={metrikaGoals} className={b('card', {fullWidth})}>
            <CardBase.Header image={image} className={b('header', {fullWidth})}>
                <div className={b('image-container')} data-qa="blog-suggest-header" />
            </CardBase.Header>
            <CardBase.Content>
                {showTag && tags?.[0]?.name && (
                    <div className={b('tag', {size})}>{tags[0].name}</div>
                )}
                {title &&
                    React.createElement(
                        titleHeadingLevel,
                        {className: b('title', {size})},
                        <span>
                            <HTML>{title}</HTML>
                        </span>,
                    )}
                {description && (
                    <YFMWrapper
                        className={b('description')}
                        content={description}
                        modifiers={{
                            blog: size === 'm',
                            blogCard: true,
                        }}
                    />
                )}
            </CardBase.Content>
            <CardBase.Footer>
                <SuggestPostInfo
                    postId={blogPostId || id}
                    date={date}
                    readingTime={readingTime}
                    hasUserLike={hasUserLike}
                    likes={likesProps}
                    size={size}
                    qa="blog-suggest-block"
                />
            </CardBase.Footer>
        </CardBase>
    );
};
