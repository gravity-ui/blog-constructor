import {test} from '../../../../playwright/core/index';

import {Default} from './helpers';

test.describe('SideCardList', () => {
    test('render stories <Default>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<Default />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });
});
