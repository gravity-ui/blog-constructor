import {ConstructorBlock, PageContent} from '@gravity-ui/page-constructor';
<<<<<<< HEAD
import {transformBlocks as transformConstructorBlocks} from '@gravity-ui/page-constructor/server';
import yaml from 'js-yaml';
=======
import {contentTransformer} from '@gravity-ui/page-constructor/server';
>>>>>>> 64fee0c (feat: install pcv3 and update transform usage (#54))

import {Lang} from '../models/locale';

import {getExtendTypographyConfig} from './config';
import {filterContent} from './contentFilter';

type TypographyConfigType = {
    [x: string]: Record<string, unknown>;
};

type TransformPageContentPropsType = {
    content: string;
    lang: Lang;
    region?: string;
    typographyConfig?: TypographyConfigType;
};

type TransformBlocksPropsType = {
    blocks: ConstructorBlock[];
    lang: Lang;
    typographyConfig?: TypographyConfigType;
};

const transformer = ({blocks, lang, typographyConfig}: TransformBlocksPropsType) =>
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
        },
    });

/**
 * Func for transform blog page content
 *
 * @param content - content yaml in string
 * @param lang - runtime app lang
 * @param region - runtime app region
 * @param typographyConfig - page-constructor extend typography config
 * @returns transformed content
 */
export const transformPageContent = ({
    content,
    lang,
    region,
    typographyConfig = {},
}: TransformPageContentPropsType) => {
    try {
        const transformedContent = filterContent(yaml.load(content) as PageContent, {lang, region});

        if (transformedContent.blocks) {
            const {blocks: transformedBlocks} = transformer({
                blocks: transformedContent.blocks,
                lang,
                typographyConfig,
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
