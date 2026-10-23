import {Icon} from '@gravity-ui/uikit';
import {ShareOptions} from '@gravity-ui/components';

import post from './post.json';
import page from './page.json';
import services from './services.json';
import suggestedPosts from './suggestedPosts.json';
import tags from './tags.json';

import {DefaultGoalIds} from '../src/constants';
import {AnalyticsCounter} from '../src/counters/utils';
import {FilterConfig, FiltersConfig, PostData} from '../src/models/common';
import {Keyset, i18n} from '../src/i18n';
import {prepareAnalyticsEvent} from '../src/utils/common';

/**
 * function for generate post page data,
 * example how to use data utils
 */
export const postPageMockData = {
    suggestedPosts,
    content: page.content,
    post,
    shareOptions: [
        ShareOptions.Twitter,
        ShareOptions.Facebook,
        ShareOptions.Telegram,
        ShareOptions.VK,
        ShareOptions.LinkedIn,
    ],
    likes: {
        hasUserLike: post.hasUserLike,
        likesCount: post.likes,
        toggleLike: ({postId}: {postId?: number}) => {
            console.log('toggle like on post --->', postId);
        },
    },
};

export const blockMockData = {
    post: post as unknown as PostData,
    suggestedPosts: suggestedPosts as unknown as PostData[],
};

export function getFiltersConfig(): FilterConfig[] {
    return [
        {
            type: 'search',
            queryParamName: 'search',
        },
        {
            queryParamName: 'tags',
            options: tags.map((tag) => ({
                content: tag.name,
                value: tag.slug,
                icon: tag.icon ? <Icon data={tag.icon} /> : undefined,
            })),
            allLabel: i18n(Keyset.AllTags),
            analyticsEvents: prepareAnalyticsEvent({
                name: DefaultGoalIds.tag,
                counter: AnalyticsCounter.CrossSite,
            }),
        },
        {
            queryParamName: 'services',
            options: services.map((service) => ({
                content: service.name,
                value: `${service.id}`,
            })),
            allLabel: i18n(Keyset.AllServices),
            multiple: true,
            filterable: true,
            hasClear: true,
            qa: 'service-select',
            analyticsEvents: prepareAnalyticsEvent({
                name: DefaultGoalIds.service,
                counter: AnalyticsCounter.CrossSite,
            }),
        },
        {
            type: 'savedOnly',
            queryParamName: 'savedOnly',
        },
    ];
}

export function getMultiRowFiltersConfig(): FiltersConfig {
    return [
        [
            {
                type: 'search',
                queryParamName: 'search',
            },
            {
                type: 'select',
                queryParamName: 'other',
                options: tags.map((tag) => ({
                    content: tag.name,
                    value: tag.slug,
                    icon: tag.icon ? <Icon data={tag.icon} /> : undefined,
                })),
                allLabel: i18n(Keyset.AllOptions),
            },
            {
                type: 'select',
                queryParamName: 'another',
                options: tags.map((tag) => ({
                    content: tag.name,
                    value: tag.slug,
                    icon: tag.icon ? <Icon data={tag.icon} /> : undefined,
                })),
                allLabel: i18n(Keyset.AllOptions),
            },
        ],
        [
            {
                type: 'select',
                queryParamName: 'tags',
                options: tags.map((tag) => ({
                    content: tag.name,
                    value: tag.slug,
                    icon: tag.icon ? <Icon data={tag.icon} /> : undefined,
                })),
                allLabel: i18n(Keyset.AllTags),
            },
            {
                type: 'select',
                queryParamName: 'services',
                options: services.map((service) => ({
                    content: service.name,
                    value: `${service.id}`,
                })),
                allLabel: i18n(Keyset.AllServices),
                multiple: true,
                filterable: true,
                hasClear: true,
                qa: 'service-select',
            },
        ],
    ];
}
