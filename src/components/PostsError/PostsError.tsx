import React from 'react';

import {Button} from '@gravity-ui/uikit';

import {i18, BlogKeyset} from '../../i18n';

import {block} from '../../utils/cn';

import './PostError.scss';

const b = block('posts-error');

type PostsErrorContainerProps = {
    onButtonClick?: () => void;
};

export const PostsError: React.FC<PostsErrorContainerProps> = ({onButtonClick}) => {
    const handleClick = () => (onButtonClick ? onButtonClick() : window.location.reload());

    return (
        <div className={b('container')}>
            <div className={b('title')}>{i18(BlogKeyset.ErrorTitle)}</div>
            <div className={b('subtitle')}>{i18(BlogKeyset.PostLoadError)}</div>
            <div className={b('button')}>
                <Button size="xl" view="outlined" onClick={handleClick}>
                    {i18(BlogKeyset.ActionTryAgain)}
                </Button>
            </div>
        </div>
    );
};