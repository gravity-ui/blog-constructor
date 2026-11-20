import {resolve} from 'path';

import type {Page} from '@playwright/test';

import {expect, test} from '../../../../playwright/core/index';

import {Default, WithNavigation} from './helpers';

const BLOG_POST_PAGE_DALAY = 10 * 1000;

async function waitForArticleAssets(page: Page) {
    await expect(page.locator('form[aria-label="Contact form"]')).toBeVisible();
    await page
        .locator('.pc-header-block__background-media img')
        .evaluate((image: HTMLImageElement) => image.decode());
}

test.describe('BlogPostPage', () => {
    test.beforeEach(async ({page}) => {
        await page.route(/^https?:\/\/js-eu1\.hsforms\.net\/forms\/v2\.js$/, (route) =>
            route.fulfill({
                path: resolve(__dirname, 'fixtures/hubspot-form.js'),
                contentType: 'application/javascript',
            }),
        );
        await page.route('**/story-assets/img_8-12_dark.png', (route) =>
            route.fulfill({
                path: resolve(
                    __dirname,
                    '../../../../.storybook/public/story-assets/img_8-12_dark.png',
                ),
                contentType: 'image/png',
            }),
        );
    });

    test('render stories <Default>', async ({mount, expectScreenshot, delay, page}) => {
        await mount(<Default />);
        await delay(BLOG_POST_PAGE_DALAY);
        await waitForArticleAssets(page);
        await expectScreenshot({skipTheme: 'dark', mask: [page.locator('.pc-Media__youtube')]});
    });

    test('render stories <WithNavigation>', async ({mount, expectScreenshot, delay, page}) => {
        await mount(<WithNavigation />);
        await delay(BLOG_POST_PAGE_DALAY);
        await waitForArticleAssets(page);
        await expectScreenshot({skipTheme: 'dark', mask: [page.locator('.pc-Media__youtube')]});
    });
});
