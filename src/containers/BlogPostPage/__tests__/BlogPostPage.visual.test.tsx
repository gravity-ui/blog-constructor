import {test} from '../../../../playwright/core/index';

import {Default, WithNavigation} from './helpers';

const BLOG_POST_PAGE_DALAY = 10 * 1000;

test.describe('BlogPostPage', () => {
    test('render stories <Default>', async ({mount, expectScreenshot, delay, page}) => {
        await mount(<Default />);
        await delay(BLOG_POST_PAGE_DALAY);
        await expectScreenshot({skipTheme: 'dark', mask: [page.locator('.pc-Media__youtube')]});
    });

    test('render stories <WithNavigation>', async ({mount, expectScreenshot, delay, page}) => {
        await mount(<WithNavigation />);
        await delay(BLOG_POST_PAGE_DALAY);
        await expectScreenshot({skipTheme: 'dark', mask: [page.locator('.pc-Media__youtube')]});
    });
});
