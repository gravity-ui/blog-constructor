import React, {useCallback, useContext} from 'react';

import {ShareLayoutDirection, SharePopover} from '@gravity-ui/components';
import {AnalyticsEventsProp, useAnalytics} from '@gravity-ui/page-constructor';

import {MobileContext} from '../../../contexts/MobileContext';
import {PostPageContext} from '../../../contexts/PostPageContext';
import {RouterContext} from '../../../contexts/RouterContext';
import {Keyset, i18n} from '../../../i18n';
import {ShareArrowUp} from '../../../icons/ShareArrowUp';
import {DefaultEventNames} from '../../../models/common';
import {block} from '../../../utils/cn';
import {getAbsolutePath} from '../../../utils/common';

import '../PostInfo.scss';

const b = block('post-info');

type SharingProps = {
    theme?: 'light' | 'dark';
    analyticsEvents?: AnalyticsEventsProp;
};

export const Sharing = ({theme, analyticsEvents}: SharingProps) => {
    const router = useContext(RouterContext);
    const isMobile = useContext(MobileContext);
    const {shareOptions} = useContext(PostPageContext);
    const handleAnalyticsGlobal = useAnalytics(DefaultEventNames.ShareButton);

    const handleAnalytics = useCallback(() => {
        handleAnalyticsGlobal(analyticsEvents);
    }, [analyticsEvents, handleAnalyticsGlobal]);

    return (
        <div className={b('item')}>
            <div className={b('icon')}>
                <SharePopover
                    url={getAbsolutePath(router)}
                    className={b('share')}
                    iconClass={b('share-icon')}
                    switcherClassName={b('switcher', {theme})}
                    tooltipClassName={b('popup')}
                    useWebShareApi={isMobile}
                    direction={ShareLayoutDirection.Column}
                    buttonTitle={i18n(Keyset.ActionShare)}
                    customIcon={ShareArrowUp}
                    placement="bottom"
                    openByHover={false}
                    shareOptions={shareOptions}
                    onClick={handleAnalytics}
                />
            </div>
        </div>
    );
};
