import React, {useContext, useMemo} from 'react';

import {CardBase, HTML, MetrikaGoal, YFMWrapper} from '@gravity-ui/page-constructor';

import {LikesContext} from '../../contexts/LikesContext';
import {PostData} from '../../models/common';
import {block} from '../../utils/cn';
import {SuggestPostInfo} from '../PostInfo/SuggestPostInfo';

import './PostCard.scss';

const b = block('post-card');

type PostCardProps = {
    post: PostData;
    fullWidth?: boolean;
    showTag?: boolean;
    size?: 's' | 'm';
    /**
     * @deprecated Metrika will be deleted after launch of analyticsEvents
     */
    metrikaGoals?: MetrikaGoal;
};

export const PostCard: React.FC<PostCardProps> = ({
    post,
    metrikaGoals,
    fullWidth = false,
    size = 's',
    showTag = false,
}) => {
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
                {title && (
                    <h4 className={b('title', {size})}>
                        <span>
                            <HTML>{title}</HTML>
                        </span>
                    </h4>
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
