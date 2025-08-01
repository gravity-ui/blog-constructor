import * as React from 'react';

import {AnalyticsEventsProp, CardBase, YFMWrapper} from '@gravity-ui/page-constructor';
import {useUniqId} from '@gravity-ui/uikit';

import {LikesContext} from '../../contexts/LikesContext';
import {useAriaAttributes} from '../../hooks/useAriaAttributes';
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
    analyticsEvents?: AnalyticsEventsProp;
};

const b = block('post-card');

export const PostCard = ({
    post,
    fullWidth = false,
    size = PostCardSize.SMALL,
    showTag = false,
    titleHeadingLevel = PostCardTitleHeadingLevel.H3,
    analyticsEvents,
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

    const {toggleLike, hasLikes} = React.useContext(LikesContext);

    const likesProps = React.useMemo(
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
    const titleId = useUniqId();
    const descriptionId = useUniqId();
    const dateId = useUniqId();
    const tagId = useUniqId();
    const readingTimeId = useUniqId();
    const isTagVisible = showTag && tags?.[0]?.name;
    const ariaAttributes = useAriaAttributes({
        labelIds: [isTagVisible && tagId, title && titleId],
        descriptionIds: [
            description && descriptionId,
            date && dateId,
            readingTime && readingTimeId,
        ],
    });

    return (
        <CardBase
            url={url}
            analyticsEvents={analyticsEvents}
            className={b('card', {fullWidth})}
            extraProps={ariaAttributes}
        >
            <CardBase.Header image={image} className={b('header', {fullWidth})}>
                <div className={b('image-container')} data-qa="blog-suggest-header" />
            </CardBase.Header>
            <CardBase.Content>
                {isTagVisible && (
                    <div id={tagId} className={b('tag', {size})}>
                        {tags[0].name}
                    </div>
                )}
                {title && (
                    <YFMWrapper
                        className={b('title', {size})}
                        tagName={titleHeadingLevel}
                        content={title}
                        contentClassName={b('title', {size})}
                        modifiers={{
                            blog: true,
                            blogCard: true,
                            heading: true,
                        }}
                        id={titleId}
                    />
                )}
                {description && (
                    <YFMWrapper
                        className={b('description')}
                        content={description}
                        modifiers={{
                            blog: size === 'm',
                            blogCard: true,
                        }}
                        id={descriptionId}
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
                    dateId={dateId}
                    readingTimeId={readingTimeId}
                />
            </CardBase.Footer>
        </CardBase>
    );
};
