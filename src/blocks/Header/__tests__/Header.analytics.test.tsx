import {PageConstructorProvider} from '@gravity-ui/page-constructor';
import {Lang, ThemeContext} from '@gravity-ui/uikit';
import {fireEvent, render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {LikesContext} from '../../../contexts/LikesContext';
import {LocaleContext} from '../../../contexts/LocaleContext';
import {LikesRoutineType, PostPageContext} from '../../../contexts/PostPageContext';
import {PostData} from '../../../models/common';
import {Header} from '../Header';

import post from '../../../../.mocks/post.json';

const likes: LikesRoutineType = {
    handleUserLike: jest.fn(),
    likesCount: 1,
    hasUserLike: true,
};

const renderHeader = (sendEvents: jest.Mock, breadcrumbCustomEvent?: {name: string}) => {
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
                            <Header title="" />
                        </PostPageContext.Provider>
                    </LikesContext.Provider>
                </LocaleContext.Provider>
            </ThemeContext.Provider>
        </PageConstructorProvider>,
    );
};

describe('Header analytics', () => {
    test('emits the top breadcrumb goal before a custom event', () => {
        const sendEvents = jest.fn();
        const customEvent = {name: 'consumer-breadcrumb-event'};
        renderHeader(sendEvents, customEvent);

        fireEvent.click(screen.getByRole('link', {name: 'Blog'}));

        expect(sendEvents).toHaveBeenCalledTimes(1);
        expect(sendEvents).toHaveBeenCalledWith([
            expect.objectContaining({
                name: 'TEST_PREFIX_BREADCRUMBS-TOP_CLICK',
                type: 'extended-event',
            }),
            expect.objectContaining(customEvent),
        ]);
    });

    test('emits the top share goal', async () => {
        const sendEvents = jest.fn();
        renderHeader(sendEvents);
        const user = userEvent.setup();

        await user.click(screen.getByText('Share'));

        expect(sendEvents).toHaveBeenCalledTimes(1);
        expect(sendEvents).toHaveBeenCalledWith([
            expect.objectContaining({
                name: 'TEST_PREFIX_SHARE-TOP_CLICK',
                type: 'extended-event',
            }),
        ]);
    });

    test('emits the top save goal', () => {
        const sendEvents = jest.fn();
        renderHeader(sendEvents);

        fireEvent.click(screen.getByTestId('blog-header-meta-container-save'));

        expect(sendEvents).toHaveBeenCalledTimes(1);
        expect(sendEvents).toHaveBeenCalledWith([
            expect.objectContaining({
                name: 'TEST_PREFIX_SAVE-TOP_CLICK',
                type: 'extended-event',
            }),
        ]);
    });
});
