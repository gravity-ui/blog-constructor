import React from 'react';

import {test} from '../../../../playwright/core/index';

import {Default, WithNavigation} from './helpers';

const BLOG_POST_DALAY = 10 * 1000;

test.describe('BlogPage', () => {
    test('render stories <Default>', async ({mount, expectScreenshot, delay}) => {
        await mount(<Default />);
        await delay(BLOG_POST_DALAY);
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <WithNavigation>', async ({mount, expectScreenshot, delay}) => {
        await mount(<WithNavigation />);
        await delay(BLOG_POST_DALAY);
        await expectScreenshot({skipTheme: 'dark'});
    });
});
