import React from 'react';

import {Icon} from '@gravity-ui/uikit';

import {Keyset, i18} from '../../../i18n';
import {Time} from '../../../icons/Time';
import {block} from '../../../utils/cn';

import '../PostInfo.scss';

const b = block('post-info');

const ICON_SIZE = 16;

type ReadingTimeProps = {
    readingTime: number;
    size?: 's' | 'm';
};

export const ReadingTime = ({readingTime, size = 's'}: ReadingTimeProps) => (
    <div className={b('item', {size})}>
        <span className={b('icon')}>
            <Icon data={Time} size={ICON_SIZE} className={b('icon-color')} />
        </span>
        {i18(Keyset.ContextReadingTime, {count: readingTime})}
    </div>
);
