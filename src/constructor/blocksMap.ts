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
import {SideCardList} from '../blocks/SideCardList/SideCardList';
import {Suggest} from '../blocks/Suggest/Suggest';
import {Take} from '../blocks/Take/Take';
import {YFM} from '../blocks/YFM/YFM';
import {BlockType} from '../models/common';

const blocks = {
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
};

const headers = {
    [BlockType.Header]: Header,
};

export default {blocks, headers};
