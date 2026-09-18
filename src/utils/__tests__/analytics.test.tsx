import {
    AnalyticsContextProps,
    AnalyticsEventsProp,
    DefaultEventNames,
    PageConstructorProvider,
    useAnalytics,
} from '@gravity-ui/page-constructor';
import {fireEvent, render, screen} from '@testing-library/react';

import {DefaultGoalIds} from '../../constants';
import {createExtendedEvent} from '../analytics';

const REGISTERED_PREFIX = 'TEST_PREFIX_';
const REGISTERED_COUNTER = 'test-counter';
const TARGET = 'https://example.com';

const registeredGoals = [
    [DefaultGoalIds.shareTop, 'TEST_PREFIX_SHARE-TOP_CLICK'],
    [DefaultGoalIds.shareBottom, 'TEST_PREFIX_SHARE-BOTTOM_CLICK'],
    [DefaultGoalIds.breadcrumbsTop, 'TEST_PREFIX_BREADCRUMBS-TOP_CLICK'],
    [DefaultGoalIds.breadcrumbsBottom, 'TEST_PREFIX_BREADCRUMBS-BOTTOM_CLICK'],
    [DefaultGoalIds.saveTop, 'TEST_PREFIX_SAVE-TOP_CLICK'],
    [DefaultGoalIds.saveBottom, 'TEST_PREFIX_SAVE-BOTTOM_CLICK'],
    [DefaultGoalIds.saveSuggest, 'TEST_PREFIX_SAVE-SUGGEST_CLICK'],
    [DefaultGoalIds.suggest, 'TEST_PREFIX_INTERESTING-CARD_CLICK'],
    [DefaultGoalIds.bannerCommon, 'TEST_PREFIX_TEXT-BANNER_CLICK'],
    [DefaultGoalIds.cta, 'TEST_PREFIX_CTA_CLICK'],
    [DefaultGoalIds.tag, 'TEST_PREFIX_THEME-SELECTOR_CLCK'],
    [DefaultGoalIds.service, 'TEST_PREFIX_SERVICE-SELECTOR_CLCK'],
    [DefaultGoalIds.showMore, 'TEST_PREFIX_PAGINATION_SHOW-MORE_CLCK'],
    [DefaultGoalIds.next, 'TEST_PREFIX_PAGINATION_NEXT_CLCK'],
    [DefaultGoalIds.home, 'TEST_PREFIX_PAGINATION_HOME_CLCK'],
    [DefaultGoalIds.page, 'TEST_PREFIX_PAGINATION_PAGE-NMBR_CLCK'],
] as const;

type AnalyticsTriggerProps = {
    analyticsEvents?: AnalyticsEventsProp;
    additionalContext?: Record<string, string>;
};

const AnalyticsTrigger = ({analyticsEvents, additionalContext}: AnalyticsTriggerProps) => {
    const handleAnalytics = useAnalytics(DefaultEventNames.Button, TARGET);

    const handleClick = () => handleAnalytics(analyticsEvents, additionalContext);

    return <button onClick={handleClick}>Send analytics</button>;
};

const renderAnalyticsTrigger = (
    analytics: AnalyticsContextProps,
    triggerProps: AnalyticsTriggerProps,
) => {
    render(
        <PageConstructorProvider analytics={analytics}>
            <AnalyticsTrigger {...triggerProps} />
        </PageConstructorProvider>,
    );

    fireEvent.click(screen.getByRole('button', {name: 'Send analytics'}));
};

describe('Blog analytics contract', () => {
    test.each(registeredGoals)('%s becomes the exact registered goal %s', (suffix, name) => {
        const sendEvents = jest.fn();

        renderAnalyticsTrigger(
            {
                sendEvents,
                autoEvents: {
                    enabled: false,
                    extendedEvents: {
                        prefix: REGISTERED_PREFIX,
                        counter: REGISTERED_COUNTER,
                    },
                },
            },
            {analyticsEvents: createExtendedEvent(suffix)},
        );

        expect(sendEvents).toHaveBeenCalledTimes(1);
        expect(sendEvents).toHaveBeenCalledWith([
            {
                name,
                type: 'extended-event',
                counters: {include: [REGISTERED_COUNTER]},
            },
        ]);
    });

    test('keeps default, extended, and custom events in order', () => {
        const sendEvents = jest.fn();
        const customEvent = {name: 'consumer-event', type: 'custom', custom: 'value'};

        renderAnalyticsTrigger(
            {
                sendEvents,
                autoEvents: {
                    enabled: true,
                    extendedEvents: {
                        prefix: REGISTERED_PREFIX,
                        counter: REGISTERED_COUNTER,
                    },
                },
            },
            {
                analyticsEvents: [createExtendedEvent(DefaultGoalIds.bannerCommon), customEvent],
            },
        );

        expect(sendEvents).toHaveBeenCalledTimes(1);
        expect(sendEvents).toHaveBeenCalledWith([
            {
                name: DefaultEventNames.Button,
                type: 'default-event',
                context: '',
                target: TARGET,
            },
            {
                name: 'TEST_PREFIX_TEXT-BANNER_CLICK',
                type: 'extended-event',
                counters: {include: [REGISTERED_COUNTER]},
            },
            customEvent,
        ]);
    });

    test('emits an extended event independently of default events', () => {
        const sendEvents = jest.fn();

        renderAnalyticsTrigger(
            {
                sendEvents,
                autoEvents: {
                    enabled: false,
                    extendedEvents: {prefix: REGISTERED_PREFIX},
                },
            },
            {analyticsEvents: createExtendedEvent(DefaultGoalIds.cta)},
        );

        expect(sendEvents).toHaveBeenCalledWith([
            {
                name: 'TEST_PREFIX_CTA_CLICK',
                type: 'extended-event',
            },
        ]);
    });

    test('omits an extended event when extended events are not configured', () => {
        const sendEvents = jest.fn();

        renderAnalyticsTrigger(
            {sendEvents, autoEvents: {enabled: true}},
            {analyticsEvents: createExtendedEvent(DefaultGoalIds.cta)},
        );

        expect(sendEvents).toHaveBeenCalledWith([
            {
                name: DefaultEventNames.Button,
                type: 'default-event',
                context: '',
                target: TARGET,
            },
        ]);
    });

    test('keeps custom events unchanged when extended decoration is configured', () => {
        const sendEvents = jest.fn();
        const customEvent = {
            name: 'consumer-event',
            type: 'custom',
            counters: {include: ['consumer-counter']},
        };

        renderAnalyticsTrigger(
            {
                sendEvents,
                autoEvents: {
                    enabled: false,
                    extendedEvents: {
                        prefix: REGISTERED_PREFIX,
                        counter: REGISTERED_COUNTER,
                    },
                },
            },
            {analyticsEvents: customEvent},
        );

        expect(sendEvents).toHaveBeenCalledWith([customEvent]);
    });

    test('applies interaction parameters to every emitted event', () => {
        const sendEvents = jest.fn();

        renderAnalyticsTrigger(
            {
                sendEvents,
                autoEvents: {
                    enabled: true,
                    extendedEvents: {prefix: REGISTERED_PREFIX},
                },
            },
            {
                analyticsEvents: createExtendedEvent(DefaultGoalIds.page),
                additionalContext: {page: '3'},
            },
        );

        expect(sendEvents).toHaveBeenCalledWith([
            expect.objectContaining({type: 'default-event', page: '3'}),
            expect.objectContaining({
                name: 'TEST_PREFIX_PAGINATION_PAGE-NMBR_CLCK',
                type: 'extended-event',
                page: '3',
            }),
        ]);
    });

    test.each([
        [true, true],
        [false, false],
    ])('keeps legacy autoEvents: %s default-event behavior', (autoEvents, sendsDefaultEvent) => {
        const sendEvents = jest.fn();

        renderAnalyticsTrigger(
            {sendEvents, autoEvents},
            {analyticsEvents: createExtendedEvent(DefaultGoalIds.cta)},
        );

        if (sendsDefaultEvent) {
            expect(sendEvents).toHaveBeenCalledWith([
                expect.objectContaining({type: 'default-event'}),
            ]);
        } else {
            expect(sendEvents).not.toHaveBeenCalled();
        }
    });
});
