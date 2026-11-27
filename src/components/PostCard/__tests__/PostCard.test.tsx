import {render, screen} from '@testing-library/react';

import {PostCardSize, PostData} from '../../../models/common';
import {PostCard} from '../PostCard';

import post from '../../../../.mocks/post.json';

describe('PostCard', () => {
    test.each([PostCardSize.SMALL, PostCardSize.MEDIUM])(
        'applies description typography to the rendered YFM element for size %s',
        (size) => {
            render(
                <PostCard
                    post={{
                        ...(post as unknown as PostData),
                        description: 'Card description',
                    }}
                    size={size}
                />,
            );

            expect(screen.getByText('Card description')).toHaveClass(
                'yfm',
                'yfm_blog_card',
                'bc-post-card__description',
            );
        },
    );
});
