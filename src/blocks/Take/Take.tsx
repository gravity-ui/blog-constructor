import * as React from 'react';

import {AuthorType, Author as PCAuthor, YFMWrapper} from '@gravity-ui/page-constructor';

import {Wrapper} from '../../components/Wrapper/Wrapper';
import {MobileContext} from '../../contexts/MobileContext';
import {TakeProps} from '../../models/blocks';
import {PaddingsDirections} from '../../models/paddings';
import {block} from '../../utils/cn';

import './Take.scss';

const b = block('take');

export const Take = (props: TakeProps) => {
    const {
        paddingTop,
        paddingBottom,
        paddingLeft,
        paddingRight,
        text,
        author,
        color,
        noBackground,
    } = props;

    const isMobile = React.useContext(MobileContext);

    const containerStyle = color ? ({'--take-color': color} as React.CSSProperties) : undefined;

    return (
        <Wrapper
            className={b('container', {noBackground})}
            paddings={{
                [PaddingsDirections.top]: paddingTop,
                [PaddingsDirections.bottom]: paddingBottom,
                [PaddingsDirections.left]: paddingLeft,
                [PaddingsDirections.right]: paddingRight,
            }}
            style={containerStyle}
        >
            <YFMWrapper
                content={text}
                contentClassName={b('text')}
                tagName="div"
                modifiers={{
                    blogDescription: true,
                    resetPaddings: true,
                }}
            />
            <PCAuthor
                type={isMobile ? AuthorType.Column : AuthorType.Line}
                author={author}
                className={b('author')}
                authorContainerClassName={b('avatar')}
            />
        </Wrapper>
    );
};
