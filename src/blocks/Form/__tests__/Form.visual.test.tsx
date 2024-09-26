import React from 'react';

import {test} from '../../../../playwright/core/index';

import {Default, FormData} from './helpers';

const FORM_DEALAY = 15 * 1000;

test.describe('Form', () => {
    test('render stories <Default>', async ({mount, expectScreenshot, delay}) => {
        await mount(<Default />);
        await delay(FORM_DEALAY);
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <FormData>', async ({mount, expectScreenshot, delay}) => {
        await mount(<FormData />);
        await delay(FORM_DEALAY);
        await expectScreenshot({skipTheme: 'dark'});
    });
});
