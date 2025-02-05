import * as React from 'react';

import {LocaleContext} from '../../../contexts/LocaleContext';
import {PostCardSize, QAProps} from '../../../models/common';
import {block} from '../../../utils/cn';
import {format} from '../../../utils/date';

import '../PostInfo.scss';

const b = block('post-info');

type DateProps = QAProps & {
    date: string | number;
    size?: PostCardSize;
    id?: string;
};

export const Date = ({date, size = PostCardSize.SMALL, id, qa}: DateProps) => {
    const {locale} = React.useContext(LocaleContext);

    return (
        <div className={b('item', {size})} id={id} data-qa={qa}>
            {format(date, 'longDate', locale?.code)}
        </div>
    );
};
