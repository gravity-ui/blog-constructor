import React from 'react';

import {Icon} from '@gravity-ui/uikit';

import {Keyset, i18n} from '../../../i18n';
import {Time} from '../../../icons/Time';
import {block} from '../../../utils/cn';

import {QAProps} from '../../../models/common';
import '../PostInfo.scss';

const b = block('post-info');

const ICON_SIZE = 16;

type ReadingTimeProps = QAProps & {
    readingTime: number;
    size?: 's' | 'm';
    id?: string;
};

export const ReadingTime = ({readingTime, size = 's', id, qa}: ReadingTimeProps) => (
    <div className={b('item', {size})} id={id} data-qa={qa}>
        <span className={b('icon')}>
            <Icon data={Time} size={ICON_SIZE} className={b('icon-color')} />
        </span>
        {i18n(Keyset.ContextReadingTime, {count: readingTime})}
    </div>
);
