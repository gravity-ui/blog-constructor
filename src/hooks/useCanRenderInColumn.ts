import {useContext} from 'react';

import {ColumnContext} from '../contexts/ColumnContext';
import {Column} from '../models/common';

export const useCanRenderInColumn = (componentColumn = 'right' as Column) => {
    const column = useContext(ColumnContext);

    return componentColumn === column;
};
