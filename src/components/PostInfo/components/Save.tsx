import * as React from 'react';

import {AnalyticsEventsProp, useAnalytics} from '@gravity-ui/page-constructor';
import {Icon, useUniqId} from '@gravity-ui/uikit';
import {Bookmark, BookmarkFill} from '@gravity-ui/icons';

import {LikesContext} from '../../../contexts/LikesContext';
import {DefaultEventNames, QAProps} from '../../../models/common';
import {block} from '../../../utils/cn';
import {postLikeStatus} from '../../../utils/common';
import {Keyset, i18n} from '../../../i18n';

import '../PostInfo.scss';

const ICON_SIZE = 16;

const b = block('post-info');

type SaveProps = QAProps & {
    title: string | number;
    postId: number | string;
    hasUserLike: boolean;
    handleUserLike: () => void;
    theme?: 'light' | 'dark';
    size?: 's' | 'm';
    analyticsEvents?: AnalyticsEventsProp;
};

/**
 * Components for 'save' blog UI-component
 *
 * @param title - post title
 * @param postId - post id
 * @param hasUserLike - flag what blog has like from current user
 * @param qa - test-attr
 * @param size - text size
 * @param analyticsEvents - a single or collection of objects detailing analytics events
 *
 * @returns jsx
 */
export const Save = ({
    title,
    postId,
    hasUserLike,
    handleUserLike,
    size,
    theme,
    qa,
    analyticsEvents,
}: SaveProps) => {
    const {toggleLike, isSignedInUser, requireSignIn} = React.useContext(LikesContext);
    const handleAnalytics = useAnalytics(DefaultEventNames.SaveButton);
    const isLikeable = Boolean(toggleLike);

    const titleElementId = useUniqId();
    const isNumericTitle = typeof title === 'number';

    return (
        <button
            className={b('item', {size, save: true})}
            onClick={(event) => {
                // both preventDefault and stopImmediatePropagation required to work properly
                // https://stackoverflow.com/questions/24415631/reactjs-syntheticevent-stoppropagation-only-works-with-react-events
                event.preventDefault();
                event.nativeEvent.stopImmediatePropagation();

                if (!isLikeable) {
                    return;
                }

                // Open Popup to ask the User to sign in first
                if (!isSignedInUser && requireSignIn) {
                    requireSignIn(event);
                    return;
                }

                postLikeStatus(postId, Boolean(hasUserLike));
                handleUserLike();
                handleAnalytics(analyticsEvents);
            }}
            data-qa={qa}
            aria-pressed={hasUserLike}
            aria-label={isNumericTitle ? i18n(Keyset.Save) : undefined}
            aria-describedby={isNumericTitle ? titleElementId : undefined}
        >
            <div className={b('content', {cursor: isLikeable, theme})}>
                <span className={b('icon')}>
                    <Icon
                        data={hasUserLike ? BookmarkFill : Bookmark}
                        size={ICON_SIZE}
                        className={b({filled: Boolean(hasUserLike)})}
                    />
                </span>
                <span id={titleElementId} className={b('title', {cursor: isLikeable})}>
                    {title}
                </span>
            </div>
        </button>
    );
};
