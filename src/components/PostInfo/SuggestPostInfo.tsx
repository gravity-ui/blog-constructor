import React from 'react';

import {useLikes} from '../../hooks/useLikes';
import {PostData, QAProps, ToggleLikeCallbackType} from '../../models/common';
import {block} from '../../utils/cn';

import {Date} from './components/Date';
import {ReadingTime} from './components/ReadingTime';
import {Save} from './components/Save';

import './PostInfo.scss';

const b = block('post-info');

export interface SuggestPostInfoProps
    extends Pick<PostData, 'date' | 'readingTime' | 'hasUserLike'>,
        QAProps {
    postId: PostData['blogPostId'];
    size?: 's' | 'm';
    likes?: {
        likesCount?: number;
        hasUserLike?: boolean;
        toggleLike?: ToggleLikeCallbackType;
    };
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
 *
 * @returns jsx
 */
export const SuggestPostInfo: React.FC<SuggestPostInfoProps> = ({
    postId,
    date,
    readingTime,
    likes,
    size = 's',
    qa,
}) => {
    const {hasUserLike, likesCount, handleLike} = useLikes({
        hasLike: likes?.hasUserLike,
        count: likes?.likesCount,
        toggleLikeCallback: likes?.toggleLike,
        postId: postId,
    });

    return (
        <div className={b('container')}>
            <div className={b('suggest-container')}>
                {date && <Date date={date} size={size} />}
                {readingTime && <ReadingTime readingTime={readingTime} size={size} />}
            </div>
            {likes && postId && (
                <Save
                    postId={postId}
                    title={likesCount}
                    hasUserLike={hasUserLike}
                    handleUserLike={handleLike}
                    size={size}
                    qa={qa}
                />
            )}
        </div>
    );
};
