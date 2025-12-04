import {MobileProvider} from '@gravity-ui/uikit';

import {test} from '../../../../playwright/core/index';

import {Default, WithNavigation} from './helpers';

const BLOG_POST_DALAY = 10 * 1000;

// TODO: Restore visual tests when releasing major versions
// Skip is needed for quick alpha release and functionality testing
test.describe.skip('BlogPage', () => {
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

    test('render stories <Default> with opened select', async ({
        mount,
        expectScreenshot,
        delay,
        page,
    }) => {
        await mount(
            <MobileProvider mobile={true}>
                <Default />{' '}
            </MobileProvider>,
        );
        await delay(BLOG_POST_DALAY);
        await page.click('[data-qa="service-select"]');
        await expectScreenshot({skipTheme: 'dark'});
    });
});
