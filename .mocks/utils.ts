import {ShareOptions} from '@gravity-ui/components';

import post from './post.json';
import page from './page.json';
import forms from './forms.json';

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

export const getFormsData = () => forms;
export const youtubeSrc = 'https://youtu.be/0Qd3T6skprA';
export const dataLensSrc = 'm2bzon9y39lck';
