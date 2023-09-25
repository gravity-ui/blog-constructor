import React, {useContext} from 'react';

import {LocaleContext} from '../../../contexts/LocaleContext';
import {PostCardSize} from '../../../models/common';
import {block} from '../../../utils/cn';
import {format} from '../../../utils/date';

import '../PostInfo.scss';

const b = block('post-info');

type DateProps = {
    date: string | number;
    size?: PostCardSize;
};

export const Date: React.FC<DateProps> = ({date, size = PostCardSize.SMALL}) => {
    const {locale} = useContext(LocaleContext);

    return <div className={b('item', {size})}>{format(date, 'longDate', locale?.code)}</div>;
};
