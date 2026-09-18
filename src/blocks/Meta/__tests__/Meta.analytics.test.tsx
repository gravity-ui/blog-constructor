import {PageConstructorProvider} from '@gravity-ui/page-constructor';
import {Lang, ThemeContext} from '@gravity-ui/uikit';
import {fireEvent, render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {LikesContext} from '../../../contexts/LikesContext';
import {LocaleContext} from '../../../contexts/LocaleContext';
import {LikesRoutineType, PostPageContext} from '../../../contexts/PostPageContext';
import {PostData} from '../../../models/common';
import {Meta} from '../Meta';

import post from '../../../../.mocks/post.json';

const likes: LikesRoutineType = {
    handleUserLike: jest.fn(),
    likesCount: 1,
    hasUserLike: true,
};

const renderMeta = (sendEvents: jest.Mock, breadcrumbCustomEvent?: {name: string}) => {
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
            <ThemeContext.Provider value={{theme: 'light', themeValue: 'light', direction: 'ltr'}}>
                <LocaleContext.Provider
                    value={{
                        locale: {
                            code: 'en-En',
                            lang: Lang.En,
                            langName: 'English',
                            pathPrefix: 'en',
                        },
                    }}
                >
                    <LikesContext.Provider
                        value={{toggleLike: jest.fn(), hasLikes: true, isSignedInUser: true}}
                    >
                        <PostPageContext.Provider
                            value={{
                                post: post as unknown as PostData,
                                suggestedPosts: [],
                                likes,
                                breadcrumbs: breadcrumbCustomEvent
                                    ? {
                                          items: [{text: 'Blog', url: '#blog'}],
                                          analyticsEvents: breadcrumbCustomEvent,
                                      }
                                    : undefined,
                            }}
                        >
                            <Meta locale="en" qa="meta-block" />
                        </PostPageContext.Provider>
                    </LikesContext.Provider>
                </LocaleContext.Provider>
            </ThemeContext.Provider>
        </PageConstructorProvider>,
    );
};

describe('Meta analytics', () => {
    test('forwards bottom breadcrumb analytics before a custom event', () => {
        const sendEvents = jest.fn();
        const customEvent = {name: 'consumer-breadcrumb-event'};
        renderMeta(sendEvents, customEvent);

        fireEvent.click(screen.getByRole('link', {name: 'Blog'}));

        expect(sendEvents).toHaveBeenCalledTimes(1);
        expect(sendEvents).toHaveBeenCalledWith([
            expect.objectContaining({
                name: 'TEST_PREFIX_BREADCRUMBS-BOTTOM_CLICK',
                type: 'extended-event',
                counters: {include: ['test-counter']},
            }),
            expect.objectContaining(customEvent),
        ]);
    });

    test('emits the bottom share goal', async () => {
        const sendEvents = jest.fn();
        renderMeta(sendEvents);
        const user = userEvent.setup();

        await user.click(screen.getByText('Share'));

        expect(sendEvents).toHaveBeenCalledTimes(1);
        expect(sendEvents).toHaveBeenCalledWith([
            expect.objectContaining({
                name: 'TEST_PREFIX_SHARE-BOTTOM_CLICK',
                type: 'extended-event',
            }),
        ]);
    });

    test('emits the bottom save goal', () => {
        const sendEvents = jest.fn();
        renderMeta(sendEvents);

        fireEvent.click(screen.getByTestId('meta-block-post-info-save'));

        expect(sendEvents).toHaveBeenCalledTimes(1);
        expect(sendEvents).toHaveBeenCalledWith([
            expect.objectContaining({
                name: 'TEST_PREFIX_SAVE-BOTTOM_CLICK',
                type: 'extended-event',
            }),
        ]);
    });
});
