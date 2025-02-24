import {test} from '../../../../playwright/core/index';

import {Default} from './helpers';

const MEDIA_DELAY = 10 * 1000;

test.describe('Media', () => {
    test.skip('render stories <Default>', async ({mount, expectScreenshot, delay, page}) => {
        await mount(<Default />);
        await delay(MEDIA_DELAY);
        await expectScreenshot({
            skipTheme: 'dark',
            mask: [
                page.locator('.bc-media__video'),
                page.locator('.pc-media-component-data-lens__wrap'),
            ],
        });
    });
});
