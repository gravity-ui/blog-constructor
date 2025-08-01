import {DefaultGoalIds} from '../../constants';
import {useLikes} from '../../hooks/useLikes';
import {PostCardSize, PostData, QAProps, ToggleLikeCallbackType} from '../../models/common';
import {block} from '../../utils/cn';
import {prepareAnalyticsEvent} from '../../utils/common';

import {Date} from './components/Date';
import {ReadingTime} from './components/ReadingTime';
import {Save} from './components/Save';

import './PostInfo.scss';

const b = block('post-info');

const saveEvents = prepareAnalyticsEvent({name: DefaultGoalIds.saveSuggest});

export interface SuggestPostInfoProps
    extends Pick<PostData, 'date' | 'readingTime' | 'hasUserLike'>,
        QAProps {
    postId: PostData['blogPostId'];
    size?: PostCardSize;
    likes?: {
        likesCount?: number;
        hasUserLike?: boolean;
        toggleLike?: ToggleLikeCallbackType;
    };
    dateId?: string;
    readingTimeId?: string;
}

/**
 * Suggest blog card info component
 *
 * @param postId - post id
 * @param date - post create date
 * @param readingTime - post reading time
 * @param hasUserLike - flag that the user liked the post
 * @param likes - likes count
 * @param qa - test-attr
 * @param size - text size
 * @param isModernIcon - flag what we need render 'bookmark' icon
 * @param dateId - id value for element with post date. Useful when providing accessible description
 * @param readingTimeId - id value for element with reading time. Useful when providing accessible description
 *
 * @returns jsx
 */
export const SuggestPostInfo = ({
    postId,
    date,
    readingTime,
    likes,
    size = PostCardSize.SMALL,
    qa,
    dateId,
    readingTimeId,
}: SuggestPostInfoProps) => {
    const {hasUserLike, likesCount, handleLike} = useLikes({
        hasLike: likes?.hasUserLike,
        count: likes?.likesCount,
        toggleLikeCallback: likes?.toggleLike,
        postId: postId,
    });

    return (
        <div className={b('container')}>
            <div className={b('suggest-container')}>
                {date && <Date date={date} size={size} id={dateId} />}
                {readingTime && (
                    <ReadingTime readingTime={readingTime} size={size} id={readingTimeId} />
                )}
            </div>
            {likes && postId && (
                <Save
                    postId={postId}
                    title={likesCount}
                    analyticsEvents={saveEvents}
                    hasUserLike={hasUserLike}
                    handleUserLike={handleLike}
                    size={size}
                    qa={qa}
                />
            )}
        </div>
    );
};
