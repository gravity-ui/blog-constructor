import React, {useContext} from 'react';

import {SharePopover} from '@gravity-ui/uikit';

import {MobileContext} from '../../../contexts/MobileContext';
import {PostPageContext} from '../../../contexts/PostPageContext';
import {RouterContext} from '../../../contexts/RouterContext';
import metrika from '../../../counters/metrika.js';
import {MetrikaCounter} from '../../../counters/utils';
import {Keyset, i18} from '../../../i18n';
import {ShareArrowUp} from '../../../icons/ShareArrowUp';
import {block} from '../../../utils/cn';
import {getAbsolutePath} from '../../../utils/common';

// @ts-ignore

import '../PostInfo.scss';

const b = block('post-info');

type SharingProps = {
    theme?: 'light' | 'dark';
    metrikaGoal?: string;
};

export const Sharing: React.FC<SharingProps> = ({theme, metrikaGoal}) => {
    const router = useContext(RouterContext);
    const isMobile = useContext(MobileContext);
    const {shareOptions} = useContext(PostPageContext);

    const handleMetrika = () => {
        metrika.reachGoal(MetrikaCounter.CrossSite, metrikaGoal);
    };

    return (
        <div className={b('item')}>
            <span className={b('icon')}>
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
                    handleMetrika={handleMetrika}
                />
            </span>
        </div>
    );
};
