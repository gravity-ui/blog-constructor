import {test} from '../../../../playwright/core/index';

import {Default} from './helpers';

const FORM_DEALAY = 15 * 1000;

test.describe('Form', () => {
    // skip because yandex forms falls shows Captcha
    test.skip('render stories <Default>', async ({mount, expectScreenshot, delay}) => {
        await mount(<Default />);
        await delay(FORM_DEALAY);
        await expectScreenshot({skipTheme: 'dark'});
    });
});
