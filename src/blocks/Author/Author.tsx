import * as React from 'react';

import {AuthorType, Author as PCAuthor} from '@gravity-ui/page-constructor';

import {Wrapper} from '../../components/Wrapper/Wrapper';
import {PostPageContext} from '../../contexts/PostPageContext';
import {AuthorProps} from '../../models/blocks';
import {PaddingsDirections} from '../../models/paddings';
import {block} from '../../utils/cn';

import './Author.scss';

const b = block('author');

export const Author = (props: AuthorProps) => {
    const {image, paddingTop, paddingBottom, authorId, qa} = props;

    const {post} = React.useContext(PostPageContext);

    const author = post?.authors?.find(({id}: {id: number | string}) => id === authorId);

    const authorItem = React.useMemo(() => {
        const imageUrl = author?.avatar ?? image;
        const authorAvatar = <img src={imageUrl} alt="author" />;

        return {
            firstName: author?.firstName || '',
            secondName: author?.secondName || '',
            description: author?.shortDescription || '',
            avatar: authorAvatar,
        };
    }, [author?.avatar, author?.firstName, author?.shortDescription, author?.secondName, image]);

    if (!authorItem?.firstName || !authorItem?.secondName) {
        return null;
    }

    return (
        <Wrapper
            paddings={{
                [PaddingsDirections.top]: paddingTop,
                [PaddingsDirections.bottom]: paddingBottom,
            }}
            className={b('content')}
            qa={qa}
        >
            <div className={b('layout')} data-qa="blog-author-layout">
                <PCAuthor
                    type={AuthorType.Column}
                    author={authorItem}
                    authorContainerClassName={b('container')}
                />
            </div>
        </Wrapper>
    );
};
