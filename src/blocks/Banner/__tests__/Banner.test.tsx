import React from 'react';

import {
    ContentSize,
    ContentTheme,
} from '@gravity-ui/page-constructor/build/esm/models/constructor-items/common';
import {render, screen} from '@testing-library/react';
import pick from 'lodash/pick';

import {PADDING_SIZES} from '../../../../test-utils/constants';
import {testPaddingBottom, testPaddingTop} from '../../../../test-utils/shared/common';
import {
    testContentWithAdditionalInfo,
    testContentWithButtons,
    testContentWithCentered,
    testContentWithLinks,
    testContentWithList,
    testContentWithSize,
    testContentWithText,
    testContentWithTheme,
    testContentWithTitle,
} from '../../../../test-utils/shared/content';
import {BannerProps} from '../../../models/blocks';
import {PaddingSize} from '../../../models/paddings';
import {getQaAttributes} from '../../../utils/common';
import {Banner} from '../Banner';

type BannerPropsType = Omit<BannerProps, 'title' | 'qa'> & {
    title: string;
} & Required<Pick<BannerProps, 'qa'>>;

const bannerData: BannerPropsType = {
    color: '#ff0000',
    title: 'Banner Title',
    text: 'Banner text',
    image: 'https://storage.yandexcloud.net/cloud-www-assets/constructor/storybook/images/img_6-12_light.png',
    additionalInfo: 'additional info',
    links: [{url: 'https://example.com', theme: 'normal'}],
    buttons: [{url: 'https://example.com', text: 'button'}],
    centered: true,
    list: [
        {
            icon: 'https://storage.yandexcloud.net/cloud-www-assets/constructor/storybook/images/img-gray.png',
            title: 'list title',
            text: 'list text',
        },
    ],
    qa: 'banner',
};

const imageSizes: Array<BannerProps['imageSize']> = ['m', 's'];

const qaAttributes = getQaAttributes(bannerData.qa, ['image-container']);
const contentQaAttributes = getQaAttributes(qaAttributes.content, ['link', 'list']);

describe('Banner', () => {
    test('Render by default', async () => {
        render(<Banner {...pick(bannerData, 'title')} />);
        const banner = screen.getByText(bannerData.title);
        expect(banner).toBeInTheDocument();
        expect(banner).toBeVisible();
    });

    test('Render image', async () => {
        render(<Banner {...pick(bannerData, 'title', 'image')} />);
        const image = screen.getByRole('img');
        expect(image).toHaveAttribute('src', bannerData.image);
    });

    test.each(new Array<BannerProps['imageSize']>(...imageSizes))(
        'Render with given "%s" image size',
        (imageSize) => {
            render(<Banner {...pick(bannerData, 'title', 'image', 'qa')} imageSize={imageSize} />);
            const imageContainer = screen.getByTestId(qaAttributes.imageContainer);
            expect(imageContainer).toHaveClass(
                `bc-banner__image-container_image-size_${imageSize}`,
            );
        },
    );

    test('Render background color', async () => {
        render(<Banner {...pick(bannerData, 'title', 'color', 'qa')} />);
        const bannerContent = screen.getByTestId(qaAttributes.content);
        expect(bannerContent).toHaveStyle({backgroundColor: bannerData.color});
    });

    test.each(new Array<PaddingSize>(...PADDING_SIZES))(
        'render with given "%s" paddingTop size',
        (size: PaddingSize) => {
            testPaddingTop<BannerPropsType>({
                component: Banner,
                props: {...pick(bannerData, 'title', 'qa'), paddingTop: size},
                options: {qaId: qaAttributes.wrapper},
            });
        },
    );

    test.each(new Array<PaddingSize>(...PADDING_SIZES))(
        'render with given "%s" paddingBottom size',
        (size: PaddingSize) => {
            testPaddingBottom<BannerProps>({
                component: Banner,
                props: {...pick(bannerData, 'title', 'qa'), paddingBottom: size},
                options: {qaId: qaAttributes.wrapper},
            });
        },
    );

    test('Render with title', async () => {
        testContentWithTitle<BannerProps>({
            component: Banner,
            props: bannerData,
        });
    });

    test('Render with text', async () => {
        testContentWithText<BannerProps>({
            component: Banner,
            props: bannerData,
        });
    });

    test('Render with additionalInfo', async () => {
        testContentWithAdditionalInfo<BannerProps>({
            component: Banner,
            props: bannerData,
        });
    });

    test.each(new Array<ContentSize>('s', 'l'))('Render with given "%s" size', (size) => {
        testContentWithSize<BannerProps>({
            component: Banner,
            props: {...bannerData, size},
            options: {qaId: contentQaAttributes.container},
        });
    });

    test('Render with links', async () => {
        const linkQa = getQaAttributes(contentQaAttributes.link, ['normal']);
        testContentWithLinks<BannerProps>({
            component: Banner,
            props: bannerData,
            options: {qaId: linkQa.normal},
        });
    });

    test('Render with buttons', async () => {
        testContentWithButtons<BannerProps>({
            component: Banner,
            props: bannerData,
            options: {qaId: contentQaAttributes.button},
        });
    });

    test('Render with centered', async () => {
        testContentWithCentered<BannerProps>({
            component: Banner,
            props: bannerData,
            options: {qaId: contentQaAttributes.container},
        });
    });

    test.each(new Array<ContentTheme>('default', 'dark', 'light'))(
        'Render with given "%s" theme',
        (theme) => {
            testContentWithTheme<BannerProps>({
                component: Banner,
                props: {...bannerData, theme},
                options: {qaId: contentQaAttributes.container},
            });
        },
    );

    test('Render with list', async () => {
        testContentWithList<BannerProps>({
            component: Banner,
            props: bannerData,
            options: {qaId: contentQaAttributes.list},
        });
    });
});
