import {BlockInColumnsType, BlockStandsAloneType} from '../models/common';

import * as blocks from './blocks';
import * as headers from './headers';

const {Author, Banner, ColoredText, CTA, Feed, Layout, Media, Meta, Suggest, YFM} = blocks;
const {Header} = headers;

export const validators = {
    blocks,
    headers,
};

export const schemasForCustom = {
    headers: {
        [BlockStandsAloneType.Header]: Header,
    },
    blocks: {
        [BlockInColumnsType.Author]: Author,
        [BlockInColumnsType.Banner]: Banner,
        [BlockInColumnsType.ColoredText]: ColoredText,
        [BlockInColumnsType.CTA]: CTA,
        [BlockInColumnsType.Media]: Media,
        [BlockInColumnsType.Meta]: Meta,
        [BlockInColumnsType.YFM]: YFM,

        [BlockStandsAloneType.Feed]: Feed,
        [BlockStandsAloneType.Layout]: Layout,
        [BlockStandsAloneType.Suggest]: Suggest,
    },
};
