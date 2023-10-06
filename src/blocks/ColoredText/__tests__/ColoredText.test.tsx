import React from 'react';

import {
    ContentSize,
    ContentTheme,
} from '@gravity-ui/page-constructor/build/esm/models/constructor-items/common';
import {render, screen} from '@testing-library/react';
import omit from 'lodash/omit';
import pick from 'lodash/pick';

import {PADDING_SIZES} from '../../../../test-utils/constants';
import {testPaddingBottom, testPaddingTop} from '../../../../test-utils/shared/common';
import {
    testContentWithAdditionalInfo,
    testContentWithCentered,
    testContentWithList,
    testContentWithSize,
    testContentWithText,
    testContentWithTheme,
    testContentWithTitle,
} from '../../../../test-utils/shared/content';
import {ColoredTextProps} from '../../../models/blocks';
import {PaddingSize} from '../../../models/paddings';
import {getQaAttributes} from '../../../utils/common';
import {ColoredText} from '../ColoredText';

const coloredTextData = {
    title: 'ColoredText Title',
    text: 'ColoredText text',
    background: {
        color: '#ff0000',
        image: 'https://storage.yandexcloud.net/cloud-www-assets/constructor/storybook/images/img_6-12_light.png',
        altText: 'alt text',
    },
    additionalInfo: 'additional info',
    centered: true,
    list: [
        {
            icon: 'https://storage.yandexcloud.net/cloud-www-assets/constructor/storybook/images/img-gray.png',
            title: 'list title',
            text: 'list text',
        },
    ],
    qa: 'colored-text',
};

const qaAttributes = getQaAttributes(coloredTextData.qa);
const contentQaAttributes = getQaAttributes(qaAttributes.content, 'list');

describe('ColoredText', () => {
    test('Render by default', async () => {
        render(<ColoredText {...pick(coloredTextData, 'title')} />);
        const coloredText = screen.getByText(coloredTextData.title);
        expect(coloredText).toBeInTheDocument();
        expect(coloredText).toBeVisible();
    });

    test('Render image', async () => {
        render(
            <ColoredText
                {...pick(coloredTextData, 'title')}
                background={omit(coloredTextData.background, 'color')}
            />,
        );
        const image = screen.getByRole('img');
        expect(image).toHaveAttribute('src', coloredTextData.background.image);
    });

    test('Render background color', async () => {
        render(
            <ColoredText
                {...pick(coloredTextData, 'title', 'qa')}
                background={pick(coloredTextData.background, 'color')}
            />,
        );
        const coloredTextContent = screen.getByTestId(qaAttributes.container);
        expect(coloredTextContent).toHaveStyle({backgroundColor: coloredTextData.background.color});
    });

    test.each(new Array<PaddingSize>(...PADDING_SIZES))(
        'render with given "%s" paddingTop size',
        (size: PaddingSize) => {
            testPaddingTop<ColoredTextProps>({
                component: ColoredText,
                props: {...pick(coloredTextData, 'title', 'qa'), paddingTop: size},
                options: {qaId: qaAttributes.wrapper},
            });
        },
    );

    test.each(new Array<PaddingSize>(...PADDING_SIZES))(
        'render with given "%s" paddingBottom size',
        (size: PaddingSize) => {
            testPaddingBottom<ColoredTextProps>({
                component: ColoredText,
                props: {...pick(coloredTextData, 'title', 'qa'), paddingBottom: size},
                options: {qaId: qaAttributes.wrapper},
            });
        },
    );

    test('Render with title', async () => {
        testContentWithTitle<ColoredTextProps>({
            component: ColoredText,
            props: pick(coloredTextData, 'title'),
        });
    });

    test('Render with text', async () => {
        testContentWithText<ColoredTextProps>({
            component: ColoredText,
            props: pick(coloredTextData, 'text'),
        });
    });

    test('Render with additionalInfo', async () => {
        testContentWithAdditionalInfo<ColoredTextProps>({
            component: ColoredText,
            props: pick(coloredTextData, 'additionalInfo'),
        });
    });

    test.each(new Array<ContentSize>('s', 'l'))('Render with given "%s" size', (size) => {
        testContentWithSize<ColoredTextProps>({
            component: ColoredText,
            props: {qa: coloredTextData.qa, size},
            options: {qaId: contentQaAttributes.container},
        });
    });

    test('Render with centered', async () => {
        testContentWithCentered<ColoredTextProps>({
            component: ColoredText,
            props: {...pick(coloredTextData, 'centered', 'qa')},
            options: {qaId: contentQaAttributes.container},
        });
    });

    test.each(new Array<ContentTheme>('default', 'dark', 'light'))(
        'Render with given "%s" theme',
        (theme) => {
            testContentWithTheme<ColoredTextProps>({
                component: ColoredText,
                props: {qa: coloredTextData.qa, theme},
                options: {qaId: contentQaAttributes.container},
            });
        },
    );

    test('Render with list', async () => {
        testContentWithList<ColoredTextProps>({
            component: ColoredText,
            props: pick(coloredTextData, 'list', 'qa'),
            options: {qaId: contentQaAttributes.list},
        });
    });
});
