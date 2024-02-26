import React from 'react';

import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {PADDING_SIZES_BY_PADDING_TYPE} from '../../../../test-utils/constants';
import {testPadding} from '../../../../test-utils/shared/common';
import {MetaProps} from '../../../models/blocks';
import {PaddingSize} from '../../../models/paddings';
import {getQaAttributes} from '../../../utils/common';
import {Meta} from '../Meta';
import {LikesRoutineType, PostPageContext} from '../../../contexts/PostPageContext';
import post from '../../../../.mocks/post.json';
import {PostData} from '../../../models/common';
import {LocaleContext} from '../../../contexts/LocaleContext';
import {Lang} from '../../../models/locale';
import {format} from '../../../utils/date';
import {Keyset, i18n} from '../../../i18n';

const locale = {
    code: 'en-En',
    lang: Lang.En,
    langName: 'English',
    pathPrefix: 'en',
};

const metaProps = {
    locale: 'en',
    qa: 'meta-block',
};

const qaAttributes = getQaAttributes(metaProps.qa, 'post-info');
const likes: LikesRoutineType = {
    handleUserLike: jest.fn(),
    likesCount: 1,
    hasUserLike: true,
};

const RenderComponent = (props: MetaProps) => {
    return (
        <LocaleContext.Provider value={{locale}}>
            <PostPageContext.Provider
                value={{post: post as unknown as PostData, suggestedPosts: [] as PostData[], likes}}
            >
                <Meta {...props} />
            </PostPageContext.Provider>
        </LocaleContext.Provider>
    );
};

describe('Meta', () => {
    test('render meta by default', async () => {
        render(<RenderComponent {...metaProps} />);
        const meta = screen.getByText(post.title);
        expect(meta).toHaveClass('yfm_blog_breadcrumbs');
    });

    test('render with breadcrumbs', async () => {
        render(<RenderComponent {...metaProps} />);
        const blogBreadcrumb = screen.getByText('Blog');
        const tagBreadcrumb = screen.getByText('Slug');
        const titleBreadcrumb = screen.getByText(post.title);

        expect(blogBreadcrumb).toHaveClass('pc-header-breadcrumbs__text');
        expect(tagBreadcrumb).toHaveClass('pc-header-breadcrumbs__text');
        expect(titleBreadcrumb).toHaveClass('yfm_blog_breadcrumbs');
    });

    test('render with date', async () => {
        const qaAttr = getQaAttributes(qaAttributes.postInfo, 'date');

        render(<RenderComponent {...metaProps} />);
        const blogBreadcrumb = screen.getByTestId(qaAttr.date);

        expect(blogBreadcrumb).toHaveTextContent(format(post.date, 'longDate', metaProps.locale));
    });

    test('render with reading time', async () => {
        const qaAttr = getQaAttributes(qaAttributes.postInfo, 'reading-time');

        render(<RenderComponent {...metaProps} />);
        const blogBreadcrumb = screen.getByTestId(qaAttr.readingTime);

        expect(blogBreadcrumb).toHaveTextContent(
            i18n(Keyset.ContextReadingTime, {count: post.readingTime}),
        );
    });

    test('render with share menu', async () => {
        render(<RenderComponent {...metaProps} />);
        const user = userEvent.setup();
        const shareComponent = screen.getByText('Share');
        await user.click(shareComponent);

        const shareOption = screen.getByText('Copy link');

        expect(shareOption).toBeVisible();
    });

    test('render with likes', async () => {
        const qaAttr = getQaAttributes(qaAttributes.postInfo, 'save');

        render(<RenderComponent {...metaProps} />);

        const component = screen.getByTestId(qaAttr.save);

        expect(component).toHaveTextContent(likes.likesCount.toString());
    });

    test.each(new Array<Record<string, PaddingSize>>(...PADDING_SIZES_BY_PADDING_TYPE))(
        'render with given "%s" padding size',
        ({optionKey, paddingSize}: Record<string, PaddingSize>) => {
            testPadding<MetaProps>({
                component: RenderComponent,
                props: {...metaProps, [optionKey]: paddingSize},
                options: {qaId: qaAttributes.wrapper, paddingKey: optionKey},
            });
        },
    );
});
