import * as React from 'react';

import {AnalyticsEventsProp} from '@gravity-ui/page-constructor';
import {PostPageContext} from '../../contexts/PostPageContext';
import {PostData, QAProps} from '../../models/common';
import {block} from '../../utils/cn';

import {Date} from './components/Date';
import {ReadingTime} from './components/ReadingTime';
import {Save} from './components/Save';
import {Sharing} from './components/Sharing';
import {getQaAttributes} from '../../utils/common';

import './PostInfo.scss';
import {SettingsContext} from '../../contexts/SettingsContext';

const b = block('post-info');

export type CustomInfoItemComponent = React.ComponentType<{post: PostData}>;

type PostInfoProps = QAProps & {
    postId: PostData['id'];
    readingTime: PostData['readingTime'];
    date: PostData['date'];
    theme?: 'light' | 'dark';
    analyticsEventsContainer?: Record<string, AnalyticsEventsProp>;
};

/**
 *  Blog post info panel component
 *
 * @param postId - post id
 * @param readingTime - post reading time
 * @param date - post create date
 * @param theme - theme name
 * @param qa - test-attr
 * @param analyticsEventsContainer - a map of records with a single or collection of objects detailing analytics events
 *
 * @returns jsx
 */
export const PostInfo = ({
    date,
    readingTime,
    postId,
    theme = 'light',
    qa,
    analyticsEventsContainer,
}: PostInfoProps) => {
    const {post, likes} = React.useContext(PostPageContext);
    const {extraInfoItems} = React.useContext(SettingsContext);
    const qaAttributes = getQaAttributes(qa, 'date', 'reading-time', 'save');

    return (
        <div className={b('container', {theme})}>
            {date && <Date date={date} qa={qaAttributes.date} />}
            {readingTime && <ReadingTime readingTime={readingTime} qa={qaAttributes.readingTime} />}
            <Sharing theme={theme} analyticsEvents={analyticsEventsContainer?.sharing} />
            {likes && (
                <Save
                    postId={postId}
                    title={likes.likesCount}
                    hasUserLike={likes.hasUserLike}
                    handleUserLike={likes.handleUserLike}
                    analyticsEvents={analyticsEventsContainer?.save}
                    theme={theme}
                    qa={qaAttributes.save}
                />
            )}
            {extraInfoItems?.map((Component, index) => (
                <div key={index} className={b('item', {extra: true})}>
                    <Component post={post} />
                </div>
            ))}
        </div>
    );
};
