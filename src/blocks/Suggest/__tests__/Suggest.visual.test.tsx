import {test} from '../../../../playwright/core/index';

import {Default} from './helpers';

// TODO: Restore visual tests when releasing major versions
// Skip is needed for quick alpha release and functionality testing
test.describe.skip('Suggest', () => {
    test('render stories <Default>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<Default />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });
});
