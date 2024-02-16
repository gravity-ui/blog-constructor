import {Query} from '../models/common';

export const routerData = {
    as: '/',
    pathname: '/',
    hostname: 'host',
    query: {},
    updateQueryCallback: (params: Query) => {
        // eslint-disable-next-line no-console
        console.log('params', params);
    },
};
