import type {ReactNode} from 'react';

import type {NoStrictEntityMods} from '@bem-react/classname';

import type {ClassNameProps, Query} from '../../models/common';

export interface PaginatorItemProps {
    key: string | ArrowType;
    dataKey: string | ArrowType;
    mods: NoStrictEntityMods;
    content: ReactNode;
    queryParams: Query;
    onClick?: (key: number | ArrowType) => void;
    loading?: boolean;
    index: number;
}

export type PaginatorProps = {
    page: number;
    totalItems: number;
    itemsPerPage: number;
    maxPages: number;
    onPageChange: (page: number) => void;
    pageCountForShowSupportButtons?: number;
    queryParams: Query;
} & ClassNameProps;

export enum ArrowType {
    Prev = 'prev',
    Next = 'next',
}

export type GetPageConfigParams = {
    page: number;
    pagesCount: number;
    queryParams: Query;
    handlePageClick: (key: number | ArrowType) => void;
};
