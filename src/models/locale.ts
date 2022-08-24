export enum Lang {
    Ru = 'ru',
    En = 'en',
}

export enum Currency {
    RUB = 'RUB',
    USD = 'USD',
    KZT = 'KZT',
}

export interface LangData {
    lang: Lang;
    langName: string;
    regions: Record<string, RegionData>;
}

export interface RegionData {
    regionName: string;
    tld: string;
    currency: string;
    order: number;
    default: boolean;
    local: boolean;
}

export interface LocaleData extends Pick<LangData, 'lang'>, Omit<RegionData, 'regionName'> {
    code: string;
    region: string;
}

export interface Locale
    extends LocaleData,
        Pick<LangData, 'langName'>,
        Pick<RegionData, 'regionName'> {
    name: string;
}