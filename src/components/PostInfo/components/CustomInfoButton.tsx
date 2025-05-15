import * as React from 'react';
import {PostData} from '../../../models/common';
import {PostPageContext} from '../../../contexts/PostPageContext';
import {block} from '../../../utils/cn';

import '../PostInfo.scss';

const ICON_SIZE = 16;

const b = block('post-info');

interface CustomInfoButtonRender {
    (props: {post: PostData; children: React.ReactNode}): React.ReactNode;
}

export interface CustomInfoButtonProps {
    icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    text: string;
    onClick?: (post: PostData) => void;
    render?: CustomInfoButtonRender;
}

export const CustomInfoButton = ({
    icon: Icon,
    text,
    onClick,
    render: renderChildren,
}: CustomInfoButtonProps) => {
    const {post} = React.useContext(PostPageContext);

    const handleClick = () => {
        onClick?.(post);
    };

    const children = (
        <button className={b('item', {extra: true})} onClick={handleClick}>
            {Icon && <Icon width={ICON_SIZE} height={ICON_SIZE} />}
            {text}
        </button>
    );

    return renderChildren ? renderChildren({post, children}) : children;
};
