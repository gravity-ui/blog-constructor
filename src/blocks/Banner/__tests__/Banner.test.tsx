import React from 'react';

import {render, screen} from '@testing-library/react';
import {pick} from 'lodash';

import {PADDING_SIZES} from '../../../../test-utils/constants';
import {testPaddingBottom, testPaddingTop} from '../../../../test-utils/shared/common';
import {BannerProps} from '../../../models/blocks';
import {PaddingSize} from '../../../models/paddings';
import {getCommonQa} from '../../../utils/common';
import {Banner} from '../Banner';

const bannerData = {
    color: '#ff0000',
    title: 'Banner Title',
    text: 'Banner text',
    image: 'https://storage.yandexcloud.net/cloud-www-assets/constructor/storybook/images/img_6-12_light.png',
    qa: 'banner',
};

const imageSizes: Array<BannerProps['imageSize']> = ['m', 's'];

const qas = getCommonQa(bannerData.qa, ['image-container']);

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
            const imageContainer = screen.getByTestId(qas.imageContainer);
            expect(imageContainer).toHaveClass(
                `bc-banner__image-container_image-size_${imageSize}`,
            );
        },
    );

    test('Render background color', async () => {
        render(<Banner {...pick(bannerData, 'title', 'color', 'qa')} />);
        const bannerContent = screen.getByTestId(qas.content);
        expect(bannerContent).toHaveStyle({backgroundColor: bannerData.color});
    });

    test.each(new Array<PaddingSize>(...PADDING_SIZES))(
        'render with given "%s" paddingTop size',
        (size: PaddingSize) => {
            testPaddingTop<BannerProps>({
                component: Banner,
                props: {...pick(bannerData, 'title', 'qa'), paddingTop: size},
                options: {qaId: qas.wrapper},
            });
        },
    );

    test.each(new Array<PaddingSize>(...PADDING_SIZES))(
        'render with given "%s" paddingBottom size',
        (size: PaddingSize) => {
            testPaddingBottom<BannerProps>({
                component: Banner,
                props: {...pick(bannerData, 'title', 'qa'), paddingBottom: size},
                options: {qaId: qas.wrapper},
            });
        },
    );

    // TODO: import Content block common tests, when they will be in a main branch
});
