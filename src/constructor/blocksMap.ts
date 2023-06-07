import {Feed} from '../blocks/Feed/Feed';
import {Header} from '../blocks/Header/Header';
import {Layout} from '../blocks/Layout/Layout';
import {Suggest} from '../blocks/Suggest/Suggest';
import {withColumnSelection} from '../hocs/withColumnSelection';
import {BlockInColumnsType, BlockStandsAloneType} from '../models/common';

const blocksInColumns = Object.keys(BlockInColumnsType).reduce((blocks, blockType) => {
    blocks[BlockInColumnsType[blockType]] = withColumnSelection(
        require(`../blocks/${blockType}/${blockType}.tsx`).default,
    );

    return blocks;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
}, {} as Record<string, any>);

const blocks = {
    ...blocksInColumns,
    [BlockStandsAloneType.Layout]: Layout,
    [BlockStandsAloneType.Suggest]: Suggest,
    [BlockStandsAloneType.Feed]: Feed,
};

const headers = {
    [BlockStandsAloneType.Header]: Header,
};

export default {blocks, headers};
