import React, {useContext} from 'react';

import {ColumnContext} from '../contexts/ColumnContext';
import {ColumnProps} from '../index';

export const withColumnSelection = <T,>(WrappedComponent: React.ElementType) => {
    const Component = ({column, ...props}: T & ColumnProps) => {
        const renderingColumn = useContext(ColumnContext);

        if (column && column !== renderingColumn) {
            return null;
        }

        return <WrappedComponent {...props} />;
    };

    return Component;
};
