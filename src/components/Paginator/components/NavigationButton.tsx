import {ChevronLeft, ChevronRight} from '@gravity-ui/icons';
import {Icon} from '@gravity-ui/uikit';

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
            <Icon data={arrowType === ArrowType.Prev ? ChevronLeft : ChevronRight} size={16} />
        </div>
    );
