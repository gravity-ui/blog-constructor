import {PageConstructorProvider} from '@gravity-ui/page-constructor';
import {fireEvent, render, screen} from '@testing-library/react';

import {LikesContext} from '../../../contexts/LikesContext';
import {PostPageContext} from '../../../contexts/PostPageContext';
import {PostData} from '../../../models/common';
import {Suggest} from '../Suggest';

import post from '../../../../.mocks/post.json';
import suggestedPosts from '../../../../.mocks/suggestedPosts.json';

const posts = suggestedPosts.map((suggestedPost) => ({
    ...suggestedPost,
    url: `#post-${suggestedPost.id}`,
})) as unknown as PostData[];

const renderSuggest = (sendEvents: jest.Mock) => {
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
            <LikesContext.Provider
                value={{toggleLike: jest.fn(), hasLikes: true, isSignedInUser: true}}
            >
                <PostPageContext.Provider
                    value={{
                        post: post as unknown as PostData,
                        suggestedPosts: posts,
                    }}
                >
                    <Suggest posts={posts} />
                </PostPageContext.Provider>
            </LikesContext.Provider>
        </PageConstructorProvider>,
    );
};

describe('Suggest analytics', () => {
    test('emits the suggested-card goal', () => {
        const sendEvents = jest.fn();
        renderSuggest(sendEvents);

        fireEvent.click(screen.getAllByRole('link', {hidden: true})[0]);

        expect(sendEvents).toHaveBeenCalledTimes(1);
        expect(sendEvents).toHaveBeenCalledWith([
            expect.objectContaining({
                name: 'TEST_PREFIX_INTERESTING-CARD_CLICK',
                type: 'extended-event',
            }),
        ]);
    });

    test('emits the suggested-post save goal', () => {
        const sendEvents = jest.fn();
        renderSuggest(sendEvents);

        fireEvent.click(screen.getAllByTestId('blog-suggest-block')[0]);

        expect(sendEvents).toHaveBeenCalledTimes(1);
        expect(sendEvents).toHaveBeenCalledWith([
            expect.objectContaining({
                name: 'TEST_PREFIX_SAVE-SUGGEST_CLICK',
                type: 'extended-event',
            }),
        ]);
    });
});
