import React from 'react';

import {Keyset, i18n} from '../../../i18n';
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
            {arrowType === ArrowType.Prev ? i18n(Keyset.ButtonBegin) : i18n(Keyset.ButtonFarther)}
        </div>
    );
