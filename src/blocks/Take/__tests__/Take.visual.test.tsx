import {test} from '../../../../playwright/core/index';

import {CustomColor, CustomColorNoBackground, Default, NoBackground} from './helpers';

test.describe('Take', () => {
    test('render stories <Default>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<Default />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <CustomColor>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<CustomColor />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <NoBackground>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<NoBackground />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <CustomColorNoBackground>', async ({
        mount,
        expectScreenshot,
        defaultDelay,
    }) => {
        await mount(<CustomColorNoBackground />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });
});
