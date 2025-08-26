import {Author} from '../blocks/Author/Author';
import {Banner} from '../blocks/Banner/Banner';
import {CTA} from '../blocks/CTA/CTA';
import {ColoredText} from '../blocks/ColoredText/ColoredText';
import {CompactMedia} from '../blocks/CompactMedia/CompactMedia';
import {Feed} from '../blocks/Feed/Feed';
import {Form} from '../blocks/Form/Form';
import {Header} from '../blocks/Header/Header';
import {Layout} from '../blocks/Layout/Layout';
import {Media} from '../blocks/Media/Media';
import {Meta} from '../blocks/Meta/Meta';
import {Suggest} from '../blocks/Suggest/Suggest';
import {YFM} from '../blocks/YFM/YFM';
import {BlockType} from '../models/common';

const blocks = {
    [BlockType.YFM]: YFM,
    [BlockType.Layout]: Layout,
    [BlockType.Media]: Media,
    [BlockType.Banner]: Banner,
    [BlockType.CTA]: CTA,
    [BlockType.ColoredText]: ColoredText,
    [BlockType.Author]: Author,
    [BlockType.Suggest]: Suggest,
    [BlockType.Meta]: Meta,
    [BlockType.Feed]: Feed,
    [BlockType.Form]: Form,
    [BlockType.CompactMedia]: CompactMedia,
};

const headers = {
    [BlockType.Header]: Header,
};

export default {blocks, headers};
