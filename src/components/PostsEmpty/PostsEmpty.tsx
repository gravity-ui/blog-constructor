import {Keyset, i18n} from '../../i18n';
import {block} from '../../utils/cn';

import './PostsEmpty.scss';

const b = block('posts-empty');

export const PostsEmpty = () => (
    <div className={b('container')}>
        <div className={b('title')}>{i18n(Keyset.TitleEmptyContainer)}</div>
        <div className={b('subtitle')}>{i18n(Keyset.ContextEmptyContainer)}</div>
    </div>
);
