import React, {useCallback, useContext} from 'react';

import {SharePopover} from '@gravity-ui/components';
import {useAnalytics} from '@gravity-ui/page-constructor';

import {MobileContext} from '../../../contexts/MobileContext';
import {PostPageContext} from '../../../contexts/PostPageContext';
import {RouterContext} from '../../../contexts/RouterContext';
import metrika from '../../../counters/metrika.js';
import {MetrikaCounter} from '../../../counters/utils';
import {Keyset, i18} from '../../../i18n';
import {ShareArrowUp} from '../../../icons/ShareArrowUp';
import {DefaultEventNames} from '../../../models/common';
import {block} from '../../../utils/cn';
import {getAbsolutePath} from '../../../utils/common';

import '../PostInfo.scss';

const b = block('post-info');

type SharingProps = {
    theme?: 'light' | 'dark';
    /**
     * @deprecated Metrika will be deleted after launch of analyticsEvents
     */
    metrikaGoal?: string;
};

export const Sharing: React.FC<SharingProps> = ({theme, metrikaGoal}) => {
    const router = useContext(RouterContext);
    const isMobile = useContext(MobileContext);
    const {shareOptions} = useContext(PostPageContext);
    const handleAnalyticsGlobal = useAnalytics(DefaultEventNames.ShareButton);

    const handleMetrika = useCallback(() => {
        metrika.reachGoal(MetrikaCounter.CrossSite, metrikaGoal);
    }, [metrikaGoal]);

    const handleAnalytics = useCallback(() => {
        handleAnalyticsGlobal();

        handleMetrika();
    }, [handleAnalyticsGlobal, handleMetrika]);

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
                    direction={'column' as SharePopover['props']['direction']}
                    buttonTitle={i18(Keyset.ActionShare)}
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
