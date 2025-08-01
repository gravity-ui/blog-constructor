import * as React from 'react';

import {Lang} from '@gravity-ui/uikit';

import {Locale} from '../models/locale';

export type LocaleContextProps = {
    locale: Locale;
};

export const LocaleContext = React.createContext<LocaleContextProps>({
    locale: {
        code: 'en-En',
        lang: Lang.En,
        langName: 'English',
        pathPrefix: 'en',
    },
});
