import * as React from 'react';

import {DeviceContext} from '../contexts/DeviceContext';

export const useIsIPhone = () => {
    const {device} = React.useContext(DeviceContext);

    return device?.model === 'iPhone';
};
