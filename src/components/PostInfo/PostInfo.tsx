import React, {useContext} from 'react';

import {PostPageContext} from '../../contexts/PostPageContext';
import {PostData, QAProps} from '../../models/common';
import {block} from '../../utils/cn';

import {Date} from './components/Date';
import {ReadingTime} from './components/ReadingTime';
import {Save} from './components/Save';
import {Sharing} from './components/Sharing';

import './PostInfo.scss';

const b = block('post-info');

export type BlogMetrikaGoals = {
    sharing?: string;
    save?: string;
};

type PostInfoProps = QAProps & {
    postId: PostData['id'];
    readingTime: PostData['readingTime'];
    date: PostData['date'];
    theme?: 'light' | 'dark';
    /**
     * @deprecated Metrika will be deleted after launch of analyticsEvents
     */
    metrikaGoals?: BlogMetrikaGoals;
    dateId?: string;
    readingTimeId?: string;
};

/**
 *  Blog post info panel component
 *
 * @param postId - post id
 * @param readingTime - post reading time
 * @param date - post create date
 * @param theme - theme name
 * @param metrikaGoals - metrika goals name
 * @param qa - test-attr
 *
 * @returns jsx
 */
export const PostInfo = ({
    date,
    readingTime,
    postId,
    theme = 'light',
    metrikaGoals,
    qa,
}: PostInfoProps) => {
    const {likes} = useContext(PostPageContext);

    return (
        <div className={b('container', {theme})}>
            {date && <Date date={date} />}
            {readingTime && <ReadingTime readingTime={readingTime} />}
            <Sharing metrikaGoal={metrikaGoals?.sharing} theme={theme} />
            {likes && (
                <Save
                    postId={postId}
                    title={likes.likesCount}
                    hasUserLike={likes.hasUserLike}
                    handleUserLike={likes.handleUserLike}
                    metrikaGoal={metrikaGoals?.save}
                    theme={theme}
                    qa={qa}
                />
            )}
        </div>
    );
};
