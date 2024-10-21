// eslint-disable-next-line import/no-extraneous-dependencies
import {MarkdownItPluginCb} from '@diplodoc/transform/lib/plugins/typings';
import {ConstructorBlock, PageContent} from '@gravity-ui/page-constructor';
import {contentTransformer} from '@gravity-ui/page-constructor/server';
import yaml from 'js-yaml';

import {Lang} from '@gravity-ui/uikit';

import {getExtendTypographyConfig} from './config';
import {filterContent} from './contentFilter';

type TypographyConfigType = {
    [x: string]: Record<string, unknown> | Record<string, unknown>[];
};

type TransformPageContentPropsType = {
    content: string;
    lang: Lang;
    region?: string;
    typographyConfig?: TypographyConfigType;
    plugins?: MarkdownItPluginCb[];
};

type TransformBlocksPropsType = {
    blocks: ConstructorBlock[];
    lang: Lang;
    typographyConfig?: TypographyConfigType;
    plugins?: MarkdownItPluginCb[];
};

const transformer = ({blocks, lang, typographyConfig, plugins}: TransformBlocksPropsType) =>
    contentTransformer({
        content: {
            blocks: blocks || [],
        },
        options: {
            lang,
            customConfig: {
                ...typographyConfig,
                ...getExtendTypographyConfig(),
            },
            plugins,
        },
    });

/**
 * Func for transform blog page content
 *
 * @param content - content yaml in string
 * @param lang - runtime app lang
 * @param region - runtime app region
 * @param typographyConfig - page-constructor extend typography config
 * @param plugins - YFM plugins
 * @returns transformed content
 */
export const transformPageContent = ({
    content,
    lang,
    region,
    typographyConfig = {},
    plugins,
}: TransformPageContentPropsType) => {
    try {
        const transformedContent = filterContent(yaml.load(content) as PageContent, {lang, region});

        if (transformedContent.blocks) {
            const {blocks: transformedBlocks} = transformer({
                blocks: transformedContent.blocks,
                lang,
                typographyConfig,
                plugins,
            });

            transformedContent.blocks = transformedBlocks;
        }

        return transformedContent;
    } catch (err) {
        // eslint-disable-next-line no-console
        console.error('Problem when transforming page content', err);
        return {};
    }
};
