import React from 'react';

import {render, screen} from '@testing-library/react';

import {PADDING_SIZES} from '../../../../test-utils/constants';
import {testPaddingBottom, testPaddingTop} from '../../../../test-utils/shared/common';
import {PostPageContext} from '../../../contexts/PostPageContext';
import {AuthorProps} from '../../../models/blocks';
import {Author as AuthorType, PostData} from '../../../models/common';
import {PaddingSize} from '../../../models/paddings';
import {Author} from '../Author';

import post from '../../../../.mocks/post.json';

const authorProps = {
    authorId: 290,
    image: 'https://storage.yandexcloud.net/cloud-www-assets/constructor/storybook/images/img_6-12_light.png',
    qa: 'author-block',
};

const RenderComponent = (props: AuthorProps) => {
    return (
        <PostPageContext.Provider
            value={{post: post as unknown as PostData, suggestedPosts: [] as PostData[]}}
        >
            <Author {...props} />
        </PostPageContext.Provider>
    );
};

describe('Author', () => {
    test('render author by default', async () => {
        render(<RenderComponent {...authorProps} />);

        const author = screen.getByTestId(authorProps.qa);

        expect(author).toBeInTheDocument();
        expect(author).toBeVisible();
    });

    test('add image', async () => {
        render(<RenderComponent {...authorProps} />);

        const avatar = screen.getByRole('img');

        expect(avatar).toHaveAttribute('src', authorProps.image);
    });

    test('name rendered', async () => {
        const authorData = post.authors.find(({id}) => id === authorProps.authorId);
        const authorName = `${authorData?.firstName} ${authorData?.secondName}`;

        render(<RenderComponent {...authorProps} />);

        const name = screen.getByText(authorName);

        expect(name).toBeInTheDocument();
        expect(name).toBeVisible();
    });

    test('description rendered', async () => {
        const authorData = post.authors.find(({id}) => id === authorProps.authorId) as AuthorType;
        const authorDescription = authorData?.shortDescription || '';

        render(<RenderComponent {...authorProps} />);

        const description = screen.getByText(authorDescription);

        expect(description).toBeInTheDocument();
        expect(description).toBeVisible();
    });

    test.each(new Array<PaddingSize>(...PADDING_SIZES))(
        'render with given "%s" paddingTop size',
        (size: PaddingSize) => {
            testPaddingTop<AuthorProps>({
                component: RenderComponent,
                props: {...authorProps, paddingTop: size},
                options: {qaId: authorProps.qa},
            });
        },
    );

    test.each(new Array<PaddingSize>(...PADDING_SIZES))(
        'render with given "%s" paddingBottom size',
        (size: PaddingSize) => {
            testPaddingBottom<AuthorProps>({
                component: RenderComponent,
                props: {...authorProps, paddingBottom: size},
                options: {qaId: authorProps.qa},
            });
        },
    );
});
