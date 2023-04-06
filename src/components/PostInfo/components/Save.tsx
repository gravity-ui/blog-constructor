import React, {useContext} from 'react';

import {Icon} from '@gravity-ui/uikit';

import {UserContext} from '../../../contexts/UserContext';
import metrika from '../../../counters/metrika.js';
import {MetrikaCounter} from '../../../counters/utils';
import {Save as SaveIcon} from '../../../icons/Save';
import {SaveFilled} from '../../../icons/SaveFilled';
import {block} from '../../../utils/cn';
import {postLikeStatus} from '../../../utils/common';

// @ts-ignore

import '../PostInfo.scss';

const ICON_SIZE = 16;

const b = block('post-info');

type SaveProps = {
    title: string | number;
    postId: number;
    hasUserLike: boolean;
    handleUserLike: () => void;
    theme?: 'light' | 'dark';
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
    const {uid} = useContext(UserContext);

    return (
        <div
            className={b('item', {size})}
            onClick={(event) => {
                // both preventDefault and stopImmediatePropagation required to work properly
                // https://stackoverflow.com/questions/24415631/reactjs-syntheticevent-stoppropagation-only-works-with-react-events
                event.preventDefault();
                event.nativeEvent.stopImmediatePropagation();

                if (!uid) {
                    return;
                }

                postLikeStatus(postId, Boolean(hasUserLike));
                handleUserLike();
                metrika.reachGoal(MetrikaCounter.CrossSite, metrikaGoal);
            }}
            data-qa={`${dataQa ? dataQa + '-' : ''}save`}
        >
            <div className={b('content', {cursor: Boolean(uid), theme})}>
                <span className={b('icon')}>
                    <Icon
                        data={hasUserLike ? SaveFilled : SaveIcon}
                        size={ICON_SIZE}
                        className={b({filled: Boolean(hasUserLike)})}
                    />
                </span>
                <span className={b('title', {cursor: Boolean(uid)})}>{title}</span>
            </div>
        </div>
    );
};
