import type {ConstructorBlock, PageContent} from '@gravity-ui/page-constructor';
import {PageConstructor} from '@gravity-ui/page-constructor';
import {Lang} from '@gravity-ui/uikit';
import yaml from 'js-yaml';

import customBlocks from '../src/constructor/blocksMap';
import {PostPageContext, PostPageContextProps} from '../src/contexts/PostPageContext';
import {transformPageContent} from '../src/data/transformPageContent';
import type {BlockType} from '../src/models/common';

export const STORY_ASSETS_PATH = '/story-assets';

export type ContextData = {
    postPage?: PostPageContextProps;
};

export type StoryArgs<T> = T & {
    contextData?: ContextData;
};

export const splitStoryArgs = <T extends object>(args: StoryArgs<T>) => {
    const {contextData, ...block} = args;
    return {block: block as T, contextData};
};

export const transformStoryBlock = <T extends object>(block: T): T => {
    const transformed = transformPageContent({
        content: yaml.dump({blocks: [block]}),
        lang: Lang.En,
    }) as PageContent;

    return (transformed.blocks?.[0] || block) as T;
};

export const StoryBlock = <T extends {type: BlockType}>({args}: {args: StoryArgs<T>}) => {
    const {block, contextData} = splitStoryArgs(args);
    const transformedBlock = transformStoryBlock(block);
    const content = {blocks: [transformedBlock as unknown as ConstructorBlock]};
    const story = <PageConstructor content={content} custom={customBlocks} />;

    return contextData?.postPage ? (
        <PostPageContext.Provider value={contextData.postPage}>{story}</PostPageContext.Provider>
    ) : (
        story
    );
};

export const contextDataParameters = {
    contextData: true,
};

export const contextDataArgType = {
    control: false,
    table: {disable: true},
};
