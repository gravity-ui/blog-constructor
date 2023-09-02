import {format, parse} from 'url';

import {
    ContentBlockProps,
    HeaderBreadCrumbsProps,
    MetrikaGoal,
    NewMetrikaGoal,
    isNewMetrikaFormat,
} from '@gravity-ui/page-constructor';
import {camelCase, debounce, memoize} from 'lodash';

import {
    CONTENT_DEFAULT_COL_SIZES,
    CONTENT_DEFAULT_SIZE,
    CONTENT_DEFAULT_THEME,
    DEFAULT_PAGE,
    DEFAULT_ROWS_PER_PAGE,
} from '../blocks/constants';
import {RouterContextProps} from '../contexts/RouterContext';
import {Keyset, i18} from '../i18n';
import {GetPostsRequest, Query, Tag} from '../models/common';

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

export const getTags = memoize((tags: Tag[], prefix?: string) => {
    return tags.map(({slug, ...tag}) => {
        const queryParams = new URLSearchParams();
        queryParams.set('tags', slug);

        return {
            ...tag,
            id: slug,
            url: `${prefix}blog?${queryParams}`,
        } as CloudListTagStub;
    });
});

const stub = (postId: number) => postId;

export const postLikeStatus = debounce((postId: number, hasUserLike: boolean) => {
    (hasUserLike ? stub : stub)(postId);
}, 300);

export const getTagFilterUrl = (tagId: string | number, prefix: string) => {
    return `${prefix}blog?tags=` + tagId;
};

export const updateContentSizes = ({size, colSizes, theme, ...contentData}: ContentBlockProps) => ({
    ...contentData,
    size: size || CONTENT_DEFAULT_SIZE,
    colSizes: colSizes || CONTENT_DEFAULT_COL_SIZES,
    theme: theme || CONTENT_DEFAULT_THEME,
});

type GetBreadcrumbsProps = {
    tags?: Tag[];
    pathPrefix?: string;
};

export const getBlogPath = (pathPrefix: string) => {
    const prefix = pathPrefix ? `/${pathPrefix}/` : '/';
    return `${prefix}blog`;
};

export const getBreadcrumbs = ({tags, pathPrefix}: GetBreadcrumbsProps) => {
    const prefix = pathPrefix ? `/${pathPrefix}/` : '/';

    const breadcrumbs: HeaderBreadCrumbsProps = {
        items: [{text: i18(Keyset.TitleBreadcrumbs), url: `${prefix}blog`}],
        theme: 'light',
    };

    if (tags?.length) {
        const localizedTags = getTags(tags, prefix);
        const tag = localizedTags[0];
        // @ts-ignore todo fix
        breadcrumbs.items.push({text: tag.name, url: getTagFilterUrl(tag.id, prefix)});
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

export const getCommonQa = (qa?: string, customKeys: Array<string> = []) => {
    const qaObject: Record<string, string> = {};

    if (qa) {
        const commonKeys = ['container', 'content', 'wrapper', 'image', 'button'];
        const keys = commonKeys.concat(customKeys);

        keys.forEach((key) => {
            qaObject[camelCase(key)] = `${qa}-${key}`;
        });
    }

    return qaObject;
};
