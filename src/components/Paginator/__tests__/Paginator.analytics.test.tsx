import {PageConstructorProvider} from '@gravity-ui/page-constructor';
import {fireEvent, render, screen} from '@testing-library/react';

import {Paginator} from '../Paginator';

const renderPaginator = (sendEvents: jest.Mock) => {
    render(
        <PageConstructorProvider
            analytics={{
                sendEvents,
                autoEvents: {
                    enabled: false,
                    extendedEvents: {prefix: 'TEST_PREFIX_', counter: 'test-counter'},
                },
            }}
        >
            <Paginator
                page={3}
                totalItems={100}
                itemsPerPage={10}
                maxPages={10}
                onPageChange={jest.fn()}
                queryParams={{}}
            />
        </PageConstructorProvider>,
    );
};

describe('Paginator analytics', () => {
    test.each([
        ['Back to top', 'TEST_PREFIX_PAGINATION_HOME_CLCK'],
        ['Load more', 'TEST_PREFIX_PAGINATION_NEXT_CLCK'],
    ])('emits %s analytics', (buttonName, eventName) => {
        const sendEvents = jest.fn();
        renderPaginator(sendEvents);

        fireEvent.click(screen.getByRole('button', {name: buttonName}));

        expect(sendEvents).toHaveBeenCalledTimes(1);
        expect(sendEvents).toHaveBeenCalledWith([
            expect.objectContaining({name: eventName, type: 'extended-event'}),
        ]);
    });

    test('keeps the selected page parameter', () => {
        const sendEvents = jest.fn();
        renderPaginator(sendEvents);

        fireEvent.click(screen.getByRole('button', {name: '4'}));

        expect(sendEvents).toHaveBeenCalledTimes(1);
        expect(sendEvents).toHaveBeenCalledWith([
            expect.objectContaining({
                name: 'TEST_PREFIX_PAGINATION_PAGE-NMBR_CLCK',
                type: 'extended-event',
                page: '4',
            }),
        ]);
    });
});
