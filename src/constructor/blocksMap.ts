import {Feed} from '../blocks/Feed/Feed';
import {Header} from '../blocks/Header/Header';
import {Layout} from '../blocks/Layout/Layout';
import {Suggest} from '../blocks/Suggest/Suggest';
import {withColumnSelection} from '../hocs/withColumnSelection';
import {BlockInColumnsType, BlockStandsAloneType} from '../models/common';

const blocksInColumns = Object.entries(BlockInColumnsType).reduce(
    (blocks, [blockName, blockKey]) => {
        const block = require(`../blocks/${blockName}/${blockName}.tsx`).default;
        blocks[blockKey] = withColumnSelection<typeof block>(block);

        return blocks;
    },
    {} as Record<string, unknown>,
);

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
