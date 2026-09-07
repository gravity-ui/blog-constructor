import {LinkTheme, PageConstructorProvider} from '@gravity-ui/page-constructor';
import {fireEvent, render, screen} from '@testing-library/react';

import {PADDING_SIZES} from '../../../../test-utils/constants';
import {testPaddingBottom, testPaddingTop} from '../../../../test-utils/shared/common';
import {testContentWithLinks, testContentWithTitle} from '../../../../test-utils/shared/content';
import {CTAProps} from '../../../models/blocks';
import {PaddingSize} from '../../../models/paddings';
import {getQaAttributes} from '../../../utils/common';
import {CTA} from '../CTA';

const ctaData = {
    items: [
        {
            title: 'CTA Title',
            text: 'CTA text',
            additionalInfo: 'additional info',
            centered: true,
            links: [{url: 'https://example.com', theme: 'normal' as LinkTheme}],
            list: [
                {
                    icon: 'https://storage.yandexcloud.net/cloud-www-assets/constructor/storybook/images/img-gray.png',
                    title: 'list title',
                    text: 'list text',
                },
            ],
        },
    ],

    qa: 'colored-text',
};

const qaAttributes = getQaAttributes(ctaData.qa);
const contentQaAttributes = getQaAttributes(qaAttributes.content, 'link');

describe('CTA', () => {
    test('Render by default', async () => {
        render(<CTA {...ctaData} />);
        const coloredText = screen.getByText(ctaData.items[0].title);
        expect(coloredText).toBeInTheDocument();
        expect(coloredText).toBeVisible();
    });

    test.each(new Array<PaddingSize>(...PADDING_SIZES))(
        'render with given "%s" paddingTop size',
        (size: PaddingSize) => {
            testPaddingTop<CTAProps>({
                component: CTA,
                props: {...ctaData, paddingTop: size},
                options: {qaId: qaAttributes.wrapper},
            });
        },
    );

    test.each(new Array<PaddingSize>(...PADDING_SIZES))(
        'render with given "%s" paddingBottom size',
        (size: PaddingSize) => {
            testPaddingBottom<CTAProps>({
                component: CTA,
                props: {...ctaData, paddingBottom: size},
                options: {qaId: qaAttributes.wrapper},
            });
        },
    );

    test('Render with title', async () => {
        testContentWithTitle<CTAProps>({
            component: CTA,
            props: ctaData,
            options: {
                textToFind: ctaData.items[0].title,
            },
        });
    });

    test('Render with links', async () => {
        const linkQa = getQaAttributes(contentQaAttributes.link, ['normal']);
        testContentWithLinks<CTAProps>({
            component: CTA,
            props: ctaData,
            options: {qaId: linkQa.normal},
        });
    });

    test('emits default, extended, and custom link events without mutating content', () => {
        const sendEvents = jest.fn();
        const customEvent = {name: 'custom-cta-event'};
        const links = [
            {
                url: 'https://example.com/cta',
                text: 'Analytics link',
                analyticsEvents: customEvent,
            },
        ];
        const items = [{title: 'CTA', links}];

        render(
            <PageConstructorProvider
                analytics={{
                    sendEvents,
                    autoEvents: {
                        enabled: true,
                        extendedEvents: {prefix: 'TEST_PREFIX_', counter: 'test-counter'},
                    },
                }}
            >
                <CTA items={items} />
            </PageConstructorProvider>,
        );
        fireEvent.click(screen.getByRole('link', {name: 'Analytics link'}));

        expect(sendEvents).toHaveBeenCalledTimes(1);
        expect(sendEvents).toHaveBeenCalledWith([
            expect.objectContaining({name: 'link-click', type: 'default-event'}),
            {
                name: 'TEST_PREFIX_CTA_CLICK',
                type: 'extended-event',
                counters: {include: ['test-counter']},
            },
            customEvent,
        ]);
        expect(links[0].analyticsEvents).toBe(customEvent);
    });
});
