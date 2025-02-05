import {Button} from '@gravity-ui/uikit';

import {Keyset, i18n} from '../../i18n';
import {block} from '../../utils/cn';

import './PostError.scss';

const b = block('posts-error');

type PostsErrorContainerProps = {
    onButtonClick?: () => void | Promise<void>;
};

export const PostsError = ({onButtonClick}: PostsErrorContainerProps) => {
    const handleClick = () => (onButtonClick ? onButtonClick() : window.location.reload());

    return (
        <div className={b('container')}>
            <div className={b('title')}>{i18n(Keyset.ErrorTitle)}</div>
            <div className={b('subtitle')}>{i18n(Keyset.PostLoadError)}</div>
            <div className={b('button')}>
                <Button size="xl" view="outlined" onClick={handleClick}>
                    {i18n(Keyset.ActionTryAgain)}
                </Button>
            </div>
        </div>
    );
};
