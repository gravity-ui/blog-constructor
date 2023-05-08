import React, {useContext} from 'react';

import {Button} from '@gravity-ui/uikit';

import {LocaleContext} from '../../../contexts/LocaleContext';
import {block} from '../../../utils/cn';
import {getBlogPath} from '../../../utils/common';
import {ArrowType, PaginatorItemProps} from '../types';

import '../Paginator.scss';

const b = block('paginator');

export const PaginatorItem = ({
    dataKey,
    mods,
    content,
    onClick,
    loading = false,
    index,
}: PaginatorItemProps) => {
    const {locale} = useContext(LocaleContext);
    const urlPath = getBlogPath(locale?.pathPrefix || '');

    const itemKey = Number(dataKey) > 0 ? Number(dataKey) : (dataKey as ArrowType);
    const navTag = index > 1 ? `?page=${index}` : '';
    const navigationLink = `${urlPath || ''}${navTag}`;

    return (
        <Button
            view="flat"
            size="xl"
            className={b('item', mods)}
            onClick={() => onClick?.(itemKey)}
            loading={loading && Boolean(mods.active)}
        >
            <a
                href={navigationLink}
                className={b('link')}
                onClick={(event) => event.preventDefault()}
            >
                {content}
            </a>
        </Button>
    );
};
