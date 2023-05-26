import React, {useContext} from 'react';

import {useAnalytics} from '@gravity-ui/page-constructor';
import {Icon} from '@gravity-ui/uikit';

import {LikesContext} from '../../../contexts/LikesContext';
import metrika from '../../../counters/metrika.js';
import {MetrikaCounter} from '../../../counters/utils';
import {Save as SaveIcon} from '../../../icons/Save';
import {SaveFilled} from '../../../icons/SaveFilled';
import {DefaultEventNames} from '../../../models/common';
import {block} from '../../../utils/cn';
import {postLikeStatus} from '../../../utils/common';

import '../PostInfo.scss';

const ICON_SIZE = 16;

const b = block('post-info');

type SaveProps = {
    title: string | number;
    postId: number;
    hasUserLike: boolean;
    handleUserLike: () => void;
    theme?: 'light' | 'dark';
    /**
     * @deprecated Metrika will be deleted after launch of analyticsEvents
     */
    metrikaGoal?: string;
    dataQa?: string;
    size?: 's' | 'm';
};

/**
 * Components for 'save' blog UI-component
 *
 * @param title - post title
 * @param postId - post id
 * @param hasUserLike - flag what blog has like from current user
 * @param metrikaGoal - metrika goal name
 * @param dataQa - test-attr
 * @param size - text size
 *
 * @returns jsx
 */
export const Save: React.FC<SaveProps> = ({
    title,
    postId,
    hasUserLike,
    handleUserLike,
    metrikaGoal,
    size,
    theme,
    dataQa,
}) => {
    const {toggleLike, isSignedInUser, requireSignIn} = useContext(LikesContext);
    const handleAnalytics = useAnalytics(DefaultEventNames.SaveButton);
    const isLikeable = Boolean(toggleLike);

    return (
        <div
            className={b('item', {size})}
            onClick={(event) => {
                // both preventDefault and stopImmediatePropagation required to work properly
                // https://stackoverflow.com/questions/24415631/reactjs-syntheticevent-stoppropagation-only-works-with-react-events
                event.preventDefault();
                event.nativeEvent.stopImmediatePropagation();

                if (!isLikeable) {
                    return;
                }

                // Open Popup to ask the User to sign in first
                if (!isSignedInUser && requireSignIn) return requireSignIn(event);

                postLikeStatus(postId, Boolean(hasUserLike));
                handleUserLike();
                metrika.reachGoal(MetrikaCounter.CrossSite, metrikaGoal);
                handleAnalytics();
            }}
            data-qa={`${dataQa ? dataQa + '-' : ''}save`}
        >
            <div className={b('content', {cursor: isLikeable, theme})}>
                <span className={b('icon')}>
                    <Icon
                        data={hasUserLike ? SaveFilled : SaveIcon}
                        size={ICON_SIZE}
                        className={b({filled: Boolean(hasUserLike)})}
                    />
                </span>
                <span className={b('title', {cursor: isLikeable})}>{title}</span>
            </div>
        </div>
    );
};
