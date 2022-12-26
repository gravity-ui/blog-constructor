import {format, parse} from 'url';
import _ from 'lodash';

import {
    ContentBlockProps,
    HeaderBreadCrumbsProps,
    isNewMetrikaFormat,
    MetrikaGoal,
    NewMetrikaGoal,
} from '@gravity-ui/page-constructor';

import {i18, Keyset} from '../i18n';

import {RouterContextProps} from '../contexts/RouterContext';

import {Tag, GetPostsRequest, Query} from '../models/common';

import {
    CONTENT_DEFAULT_COL_SIZES,
    CONTENT_DEFAULT_SIZE,
    CONTENT_DEFAULT_THEME,
    DEFAULT_ROWS_PER_PAGE,
    DEFAULT_PAGE,
} from '../blocks/constants';

export interface QueryParam {
    name: string;
    value?: string | number | null;
}

export interface RouterActionOptions {
    shallow?: boolean;
}

export function getAbsolutePath(router: RouterContextProps, url?: string) {
    if (!router || !router.pathname) {
        return url ?? '';
    }

    const parsed = parse(url || router.as || '');

    return format({
        ...parsed,
        protocol: parsed.protocol || 'https',
        hostname: parsed.hostname || router.hostname,
        pathname: parsed.pathname || router.pathname,
    });
}

export const getPageSearchParams = (query: Query = {}) => {
    const searchParams = new URLSearchParams();

    Object.entries(query).forEach(([key, value]) => {
        searchParams.set(key, String(value));
    });

    return searchParams;
};

export const scrollToHash = (hash: string, browser?: string) => {
    if (!hash) {
        return;
    }

    const element = document.getElementById(hash);

    if (!element) {
        return;
    }

    setTimeout(
        () => element.scrollIntoView({behavior: browser === 'Yandex' ? 'auto' : 'smooth'}),
        0,
    );
};

type CloudListTagStub = {};

export const getTags = _.memoize((tags: Tag[]) => {
    return tags.map(({slug, ...tag}) => {
        const queryParams = new URLSearchParams();
        queryParams.set('tags', slug);

        return {
            ...tag,
            id: slug,
            url: `/blog?${queryParams}`,
        } as CloudListTagStub;
    });
});

const stub = (postId: number) => postId;

export const postLikeStatus = _.debounce((postId: number, hasUserLike: boolean) => {
    (hasUserLike ? stub : stub)(postId);
}, 300);

export const getTagFilterUrl = (tagId: string | number) => {
    return '/blog?tags=' + tagId;
};

export const updateContentSizes = ({size, colSizes, theme, ...contentData}: ContentBlockProps) => ({
    ...contentData,
    size: size || CONTENT_DEFAULT_SIZE,
    colSizes: colSizes || CONTENT_DEFAULT_COL_SIZES,
    theme: theme || CONTENT_DEFAULT_THEME,
});

type GetBreadcrumbsProps = {
    tags?: Tag[];
};

export const getBreadcrumbs = ({tags}: GetBreadcrumbsProps) => {
    const breadcrumbs: HeaderBreadCrumbsProps = {
        items: [{text: i18(Keyset.TitleBreadcrumbs), url: '/blog'}],
        theme: 'light',
    };

    if (tags?.length) {
        const localizedTags = getTags(tags);
        const tag = localizedTags[0];
        // @ts-ignore todo fix https://st.yandex-team.ru/ORION-1447
        breadcrumbs.items.push({text: tag.name, url: getTagFilterUrl(tag.id)});
    }

    return breadcrumbs;
};

export const isMetrikaExist = (goal: NewMetrikaGoal, existGoals: NewMetrikaGoal[]) => {
    return Boolean(existGoals.find((existGoal) => goal.name === existGoal.name));
};

export const getBlogElementMetrika = (
    blogCustomGoal: NewMetrikaGoal,
    existingGoals?: MetrikaGoal,
) => {
    if (existingGoals) {
        if (isNewMetrikaFormat(existingGoals) && !isMetrikaExist(blogCustomGoal, existingGoals)) {
            const goals = [...existingGoals];
            goals.push(blogCustomGoal);

            return goals;
        }

        return existingGoals;
    } else {
        return [blogCustomGoal];
    }
};

export const getFeedQueryParams = (queryString: Query, pageNumber?: number): GetPostsRequest => {
    const queryParams = getPageSearchParams(queryString);
    const tags = queryParams.get('tags') || undefined;
    const page = pageNumber || Number(queryParams.get('page') || DEFAULT_PAGE);
    const perPage = Number(queryParams.get('perPage') || DEFAULT_ROWS_PER_PAGE);
    const savedOnly = queryParams.get('savedOnly') === 'true';
    const search = queryParams.get('search') || undefined;
    const serviceIds = queryParams.get('services') || undefined;

    return {tags, page, perPage, savedOnly, search, services: serviceIds};
};

export const scrollOnPageChange = (containerId: string) => {
    const cardsContainerEl = document.getElementById(containerId);
    const y = cardsContainerEl?.getBoundingClientRect()?.y || 0;

    if (y < 0) {
        scrollToHash(containerId);
    }
};
