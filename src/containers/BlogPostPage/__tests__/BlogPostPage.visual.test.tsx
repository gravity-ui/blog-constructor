import {test} from '../../../../playwright/core/index';
import {BlockType} from '../../../models/common';

import {Default, WithNavigation} from './helpers';

import pageData from '../../../../.mocks/page.json';

const BLOG_POST_PAGE_DALAY = 10 * 1000;

const contentWithoutExternalForms = {
    ...pageData.content,
    blocks: pageData.content.blocks.map((block) =>
        block.children
            ? {
                  ...block,
                  children: block.children.filter((child) => child.type !== BlockType.Form),
              }
            : block,
    ),
};

test.describe('BlogPostPage', () => {
    test('render stories <Default>', async ({mount, expectScreenshot, delay, page}) => {
        await mount(<Default content={contentWithoutExternalForms} />);
        await delay(BLOG_POST_PAGE_DALAY);
        await expectScreenshot({skipTheme: 'dark', mask: [page.locator('.pc-Media__youtube')]});
    });

    test('render stories <WithNavigation>', async ({mount, expectScreenshot, delay, page}) => {
        await mount(<WithNavigation content={contentWithoutExternalForms} />);
        await delay(BLOG_POST_PAGE_DALAY);
        await expectScreenshot({skipTheme: 'dark', mask: [page.locator('.pc-Media__youtube')]});
    });
});
