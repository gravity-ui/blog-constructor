import {Query} from '../models/common';

export const routerData = {
    as: '/',
    pathname: '/',
    hostname: 'host',
    query: {},
    updateQueryCallback: (params: Query) => {
        console.log('params', params);
    },
};
