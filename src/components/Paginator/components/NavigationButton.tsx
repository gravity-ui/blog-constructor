import React from 'react';

import {Keyset, i18} from '../../../i18n';
import {block} from '../../../utils/cn';
import {ArrowType} from '../types';

import '../Paginator.scss';

const b = block('paginator');

export type NavigationButtonProps = {
    arrowType: ArrowType;
    disabled?: boolean;
};

export const NavigationButton = ({arrowType, disabled}: NavigationButtonProps) =>
    disabled ? null : (
        <div className={b('icon')}>
            {arrowType === ArrowType.Prev ? i18(Keyset.ButtonBegin) : i18(Keyset.ButtonFarther)}
        </div>
    );
