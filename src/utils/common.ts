import {format, parse} from 'url';

import {
    AnalyticsEvent,
    AnalyticsEventsProp,
    ContentBlockProps,
    HeaderBreadCrumbsProps,
} from '@gravity-ui/page-constructor';
import camelCase from 'lodash/camelCase';
import debounce from 'lodash/debounce';
import flatten from 'lodash/flatten';
import memoize from 'lodash/memoize';

import {
    CONTENT_DEFAULT_COL_SIZES,
    CONTENT_DEFAULT_SIZE,
    CONTENT_DEFAULT_THEME,
    DEFAULT_PAGE,
    DEFAULT_ROWS_PER_PAGE,
} from '../blocks/constants';
import {RouterContextProps} from '../contexts/RouterContext';
import {Keyset, i18n} from '../i18n';
import {GetPostsRequest, Query, Tag} from '../models/common';
import {AnalyticsCounter} from '../counters/utils';

const QA_ATTRIBUTES_KEYS = ['container', 'content', 'wrapper', 'image', 'button'];

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

export const getTags = memoize((tags: Tag[], blogPath: string) => {
    return tags.map(({slug, ...tag}) => {
        const queryParams = new URLSearchParams();
        queryParams.set('tags', slug);

        return {
            ...tag,
            id: slug,
            url: `${blogPath}?${queryParams}`,
        } as CloudListTagStub;
    });
});

const stub = (postId: number) => postId;

export const postLikeStatus = debounce((postId: number, hasUserLike: boolean) => {
    (hasUserLike ? stub : stub)(postId);
}, 300);

export const updateContentSizes = ({size, colSizes, theme, ...contentData}: ContentBlockProps) => ({
    ...contentData,
    size: size || CONTENT_DEFAULT_SIZE,
    colSizes: colSizes || CONTENT_DEFAULT_COL_SIZES,
    theme: theme || CONTENT_DEFAULT_THEME,
});

type GetBreadcrumbsProps = {
    tags?: Tag[];
    blogPath: string;
};

export const getBlogPath = (pathPrefix: string) => {
    const prefix = pathPrefix ? `/${pathPrefix}` : '';
    return `${prefix}/blog`;
};

export const getBreadcrumbs = ({tags, blogPath}: GetBreadcrumbsProps) => {
    const breadcrumbs: HeaderBreadCrumbsProps = {
        items: [{text: i18n(Keyset.TitleBreadcrumbs), url: blogPath}],
        theme: 'light',
    };

    if (tags?.length) {
        const localizedTags = getTags(tags, blogPath);
        const tag = localizedTags[0];
        // @ts-ignore todo fix
        breadcrumbs.items.push({text: tag.name, url: tag.url});
    }

    return breadcrumbs;
};

const getArrayOfEvents = (events?: AnalyticsEventsProp) => {
    if (!events) {
        return [];
    }

    if (Array.isArray(events)) {
        return events;
    }

    return [events];
};

export const getMergedAnalyticsEvents = (
    analyticEvents: AnalyticsEventsProp,
    existringEvents?: AnalyticsEventsProp,
) => {
    const eventsAsArray = getArrayOfEvents(analyticEvents);
    const existingAsArray = getArrayOfEvents(existringEvents);

    return eventsAsArray.concat(existingAsArray);
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

export const getQaAttributes = (qa?: string, ...customKeys: (string | Array<string>)[]) => {
    const attributes: Record<string, string> = {};

    if (qa) {
        const keys = QA_ATTRIBUTES_KEYS.concat(flatten(customKeys));

        keys.forEach((key) => {
            attributes[camelCase(key)] = `${qa}-${key}`;
        });

        attributes.default = qa;
    }

    return attributes;
};

type PrepareAnalyticsEventArgs = {
    name: string;
    counter?: AnalyticsCounter;
    options?: Record<string, string | number>;
};

export const prepareAnalyticsEvent = ({
    name,
    counter = AnalyticsCounter.Main,
    options = {},
}: PrepareAnalyticsEventArgs): AnalyticsEvent => ({
    ...options,
    name,
    counters: {
        include: [counter],
    },
});
