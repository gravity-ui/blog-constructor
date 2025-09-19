import {ShareOptions} from '@gravity-ui/components';

import post from './post.json';
import page from './page.json';

import suggestedPosts from './suggestedPosts.json';

import {PostData} from '../src/models/common';

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

export const getDefaultStoryArgs = () => {
    return {
        paddingBottom: 'l',
        paddingTop: 'l',
        text: 'Lorem ipsum dolor',
        image: 'https://storage.yandexcloud.net/cloud-www-assets/constructor/storybook/images/img_8-12_light.png',
    };
};

export const getHeaderWithBackgroundStoryArgs = () => {
    return {
        paddingBottom: 'l',
        paddingTop: 'l',
        text: 'Lorem ipsum dolor',
        background: {
            url: 'https://storage.yandexcloud.net/cloud-www-assets/constructor/storybook/images/img_8-12_light.png',
        },
    };
};

export const getHeaderWithImageStoryArgs = () => {
    return {
        paddingBottom: 'l',
        paddingTop: 'l',
        text: 'Lorem ipsum dolor',
        image: 'https://storage.yandexcloud.net/cloud-www-assets/constructor/storybook/images/img_8-12_light.png',
    };
};

export const getHeaderWithImageOutGridStoryArgs = () => {
    return {
        paddingBottom: 'l',
        paddingTop: 'l',
        text: 'Lorem ipsum dolor',
        image: 'https://storage.yandexcloud.net/cloud-www-assets/constructor/storybook/images/img_8-12_light.png',
        background: {
            color: 'rgba(238, 242, 248, 1)',
        },
        imageInGrid: false,
    };
};

export const getVideoStoryArgs = () => {
    return {
        video: {
            src: [
                'https://storage.yandexcloud.net/cloud-www-assets/constructor/storybook/images/video_8-12_white.webm',
                'https://storage.yandexcloud.net/cloud-www-assets/constructor/storybook/images/video_8-12_white.mp4',
                'https://storage.yandexcloud.net/cloud-www-assets/constructor/storybook/images/video_8-12_white.pn',
            ],
            loop: {
                start: 0,
            },
        },
        previewImg:
            'https://storage.yandexcloud.net/cloud-www-assets/constructor/storybook/images/img_8-12_white.png',
    };
};

export const getCompactMediaStoryArgs = () => {
    return {
        paddingBottom: 'l',
        paddingTop: 'l',
        description: 'Lorem ipsum dolor sit amet lorem ipsum dolor sit amet dolor sit amet',
        image: 'https://storage.yandexcloud.net/cloud-www-assets/constructor/storybook/images/logotype-cube.svg',
    };
};

export const getTakeStoryArgs = () => {
    return {
        paddingTop: 'sm',
        paddingBottom: 'sm',
        paddingLeft: 'sm',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        author: {
            firstName: 'Lorem',
            secondName: 'Ipsum dolor',
            description: 'Lorem ipsum dolor sit amet"',
            avatar: 'https://storage.yandexcloud.net/cloud-www-assets/constructor/storybook/images/img_6-12_light.png',
        },
    };
};

export const getSideCardListStoryArgs = () => {
    return {
        title: 'Side card list',
        paddingBottom: 'l',
        paddingTop: 'l',
        items: [
            {
                image: {
                    src: 'https://storage.yandexcloud.net/cloud-www-assets/constructor/storybook/images/logotype-cube.svg',
                    alt: 'card 1',
                },
                description: 'Lorem ipsum dolor sit amet lorem ipsum dolor sit amet dolor sit amet',
                url: 'https://example.com',
            },
            {
                image: {
                    src: 'https://storage.yandexcloud.net/cloud-www-assets/constructor/storybook/images/logotype-long.svg',
                    alt: 'card 2',
                },
                description: 'Lorem ipsum dolor sit amet lorem ipsum dolor sit amet dolor sit amet',
                url: 'https://example.com',
            },
        ],
    };
};

export const youtubeSrc = 'https://youtu.be/0Qd3T6skprA';
export const dataLensSrc = 'm2bzon9y39lck';
