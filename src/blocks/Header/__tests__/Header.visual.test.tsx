import {test} from '../../../../playwright/core/index';

import {BgImage, Default, ImageOutGrid} from './helpers';

test.describe('Header', () => {
    test('render stories <Default>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<Default />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });
    test('render stories <BgImage>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<BgImage />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });
    test('render stories <ImageOutGrid>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<ImageOutGrid />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });
});
