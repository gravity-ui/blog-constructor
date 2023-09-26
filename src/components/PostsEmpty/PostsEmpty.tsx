import React from 'react';

import {Keyset, i18} from '../../i18n';
import {block} from '../../utils/cn';

import './PostsEmpty.scss';

const b = block('posts-empty');

export const PostsEmpty = () => (
    <div className={b('container')}>
        <div className={b('title')}>{i18(Keyset.TitleEmptyContainer)}</div>
        <div className={b('subtitle')}>{i18(Keyset.ContextEmptyContainer)}</div>
    </div>
);
