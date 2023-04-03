import {i18n} from './i18n';
import {Lang} from './models/locale';

export interface ProjectConfigParams {
    lang: Lang;
}

export const configure = ({lang}: ProjectConfigParams) => {
    i18n.setLang(lang);
};
