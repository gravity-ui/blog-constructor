import {BlockType} from '../models/common';

import * as blocks from './blocks';
import * as headers from './headers';

const {
    Author,
    Banner,
    ColoredText,
    CompactMedia,
    CTA,
    Feed,
    Form,
    Layout,
    Media,
    Meta,
    SideCardList,
    Suggest,
    Take,
    YFM,
} = blocks;
const {Header} = headers;

export const validators = {
    blocks,
    headers,
};

export const schemasForCustom = {
    headers: {
        [BlockType.Header]: Header,
    },
    blocks: {
        [BlockType.Author]: Author,
        [BlockType.Banner]: Banner,
        [BlockType.ColoredText]: ColoredText,
        [BlockType.CompactMedia]: CompactMedia,
        [BlockType.CTA]: CTA,
        [BlockType.Feed]: Feed,
        [BlockType.Form]: Form,
        [BlockType.Layout]: Layout,
        [BlockType.Media]: Media,
        [BlockType.Meta]: Meta,
        [BlockType.SideCardList]: SideCardList,
        [BlockType.Suggest]: Suggest,
        [BlockType.Take]: Take,
        [BlockType.YFM]: YFM,
    },
};
