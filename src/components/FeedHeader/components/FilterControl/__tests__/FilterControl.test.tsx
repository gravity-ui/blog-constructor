import {PageConstructorProvider} from '@gravity-ui/page-constructor';
import {fireEvent, render, screen} from '@testing-library/react';

import {FilterConfig} from '../../../../../models/common';
import {SelectFilter, SelectFilterProps} from '../../SelectFilter/SelectFilter';
import {FilterControl} from '../FilterControl';

jest.mock('../../SelectFilter/SelectFilter', () => ({
    SelectFilter: jest.fn(),
}));

const MockSelectFilter = ({onChange, onClose}: SelectFilterProps) => {
    const handleSelect = () => {
        onChange('one');
        onClose?.({selectedValues: ['one'], changesCount: 1});
    };
    const handleCloseUnchanged = () => {
        onClose?.({selectedValues: [], changesCount: 0});
    };

    return (
        <div>
            <button onClick={handleSelect}>Select one</button>
            <button onClick={handleCloseUnchanged}>Close unchanged</button>
        </div>
    );
};

const renderFilter = (filter: FilterConfig, sendEvents: jest.Mock) => {
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
            <FilterControl filter={filter} initialValue={undefined} onChange={jest.fn()} />
        </PageConstructorProvider>,
    );
};

describe('FilterControl analytics', () => {
    beforeEach(() => {
        jest.mocked(SelectFilter).mockImplementation(MockSelectFilter);
    });

    test('emits the exact theme goal once with selection params and then custom events', () => {
        const sendEvents = jest.fn();

        renderFilter(
            {
                queryParamName: 'tags',
                options: [{value: 'one', content: 'Theme one'}],
                allLabel: 'All themes',
                analyticsEvents: {name: 'consumer-theme-event'},
            },
            sendEvents,
        );
        fireEvent.click(screen.getByRole('button', {name: 'Select one'}));

        expect(sendEvents).toHaveBeenCalledTimes(1);
        expect(sendEvents).toHaveBeenCalledWith([
            expect.objectContaining({
                name: 'TEST_PREFIX_THEME-SELECTOR_CLCK',
                type: 'extended-event',
                counters: {include: ['test-counter']},
                theme: 'one',
                selected_ids: ['one'],
            }),
            expect.objectContaining({
                name: 'consumer-theme-event_CLOSE',
                selected_values: ['Theme one'],
            }),
        ]);
    });

    test.each(['service', 'services'])('emits the exact service goal for %s', (queryParamName) => {
        const sendEvents = jest.fn();

        renderFilter(
            {
                queryParamName,
                options: [{value: 'one', content: 'Service one'}],
                allLabel: 'All services',
            },
            sendEvents,
        );
        fireEvent.click(screen.getByRole('button', {name: 'Select one'}));

        expect(sendEvents).toHaveBeenCalledTimes(1);
        expect(sendEvents).toHaveBeenCalledWith([
            expect.objectContaining({
                name: 'TEST_PREFIX_SERVICE-SELECTOR_CLCK',
                type: 'extended-event',
                service: 'Service one',
            }),
        ]);
    });

    test('does not emit a registered selector goal when the value did not change', () => {
        const sendEvents = jest.fn();

        renderFilter(
            {
                queryParamName: 'tags',
                options: [{value: 'one', content: 'Theme one'}],
                allLabel: 'All themes',
            },
            sendEvents,
        );
        fireEvent.click(screen.getByRole('button', {name: 'Close unchanged'}));

        expect(sendEvents).not.toHaveBeenCalled();
    });
});
