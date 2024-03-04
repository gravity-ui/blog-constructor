import React from 'react';

import {Locale} from '../models/locale';
import {Lang} from '@gravity-ui/uikit';

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
