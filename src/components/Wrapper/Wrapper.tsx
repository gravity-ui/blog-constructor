import React from 'react';

import {DEFAULT_PADDINGS} from '../../constants';
import {ClassNameProps} from '../../models/common';
import {Paddings} from '../../models/paddings';
import {block} from '../../utils/cn';

import './Wrapper.scss';

const b = block('wrapper');

type WrapperProps = ClassNameProps & {
    paddings?: Paddings;
    dataQa?: string;
    children?: React.ReactNode;
};

export const Wrapper: React.FunctionComponent<WrapperProps> = ({
    children,
    paddings = DEFAULT_PADDINGS,
    className,
    dataQa,
}) => (
    <section
        className={b(
            {
                ['padding-top']: paddings?.top || 'xs',
                ['padding-bottom']: paddings?.bottom || 'l',
                ['padding-left']: paddings?.left || '',
                ['padding-right']: paddings?.right || '',
            },
            className,
        )}
        data-qa={dataQa}
    >
        {children}
    </section>
);
