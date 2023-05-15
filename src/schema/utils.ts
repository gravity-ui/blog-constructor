import {BlockType} from '../models/common';

type BlockConfig = {
    [x in BlockType]: Object;
};

type GenerateConfig = (config: BlockConfig) => {[x in BlockType]: BlockConfig};

export const generateConfig: GenerateConfig = (config) => {
    return Object.keys(config).reduce(
        (acc, blockKey) => ({
            ...acc,
            blockKey: {
                blockKey: config[blockKey as BlockType],
            },
        }),
        {} as {[x in BlockType]: BlockConfig},
    );
};
