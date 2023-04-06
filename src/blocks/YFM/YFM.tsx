import React from 'react';

import block from 'bem-cn-lite';

import {YFMWrapper} from '@gravity-ui/page-constructor';

import {Wrapper} from '../../components/Wrapper/Wrapper';
import {YFMProps} from '../../models/blocks';
import {PaddingsDirections} from '../../models/paddings';

const b = block('yfm');

export const YFM: React.FC<YFMProps> = (props) => {
    const {text, paddingTop, paddingBottom} = props;

    return (
        <Wrapper
            paddings={{
                [PaddingsDirections.top]: paddingTop,
                [PaddingsDirections.bottom]: paddingBottom,
            }}
        >
            <YFMWrapper
                content={text}
                modifiers={{
                    blog: true,
                    resetPaddings: true,
                }}
                className={b({'no-list-reset': true})}
            />
        </Wrapper>
    );
};
