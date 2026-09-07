import {PageConstructorProvider} from '@gravity-ui/page-constructor';
import {fireEvent, render, screen, waitFor} from '@testing-library/react';

import {FeedContext} from '../../../contexts/FeedContext';
import {RouterContext} from '../../../contexts/RouterContext';
import {PostData} from '../../../models/common';
import {Feed} from '../Feed';

import post from '../../../../.mocks/post.json';

jest.mock('../../../components/FeedHeader/FeedHeader', () => ({
    FeedHeader: () => null,
}));

jest.mock('../../../components/Posts/Posts', () => ({
    Posts: ({handleShowMore}: {handleShowMore: () => Promise<void>}) => {
        const handleClick = () => handleShowMore();

        return <button onClick={handleClick}>See more</button>;
    },
}));

describe('Feed analytics', () => {
    test('emits the show-more extended event once', async () => {
        const sendEvents = jest.fn();

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
                <RouterContext.Provider
                    value={{
                        pathname: '/blog',
                        as: '/blog',
                        hostname: 'example.com',
                        query: {},
                        updateQueryCallback: jest.fn(),
                    }}
                >
                    <FeedContext.Provider
                        value={{
                            posts: [post as unknown as PostData],
                            totalCount: 2,
                            getPosts: jest.fn().mockResolvedValue({posts: [], count: 1}),
                        }}
                    >
                        <Feed image="" />
                    </FeedContext.Provider>
                </RouterContext.Provider>
            </PageConstructorProvider>,
        );
        fireEvent.click(screen.getByRole('button', {name: 'See more'}));

        await waitFor(() => expect(sendEvents).toHaveBeenCalledTimes(1));
        expect(sendEvents).toHaveBeenCalledWith([
            expect.objectContaining({
                name: 'TEST_PREFIX_PAGINATION_SHOW-MORE_CLCK',
                type: 'extended-event',
            }),
        ]);
    });
});
