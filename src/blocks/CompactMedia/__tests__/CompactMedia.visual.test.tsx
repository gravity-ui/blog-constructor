import {test} from '../../../../playwright/core/index';

import {Default} from './helpers';

const MEDIA_DELAY = 10 * 1000;

test.describe('CompactMedia', () => {
    test.skip('render stories <Default>', async ({mount, expectScreenshot, delay}) => {
        await mount(<Default />);
        await delay(MEDIA_DELAY);
        await expectScreenshot({
            skipTheme: 'dark',
        });
    });
});
