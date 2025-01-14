import {typografToHTML, typografToText, yfmTransformer} from '@gravity-ui/page-constructor/server';

import {PostData, TransformPostOptions} from '../models/common';
import {Lang} from '@gravity-ui/uikit';

export type TransformPostType = {
    postData: PostData;
    lang: Lang;
    options: TransformPostOptions;
};

/**
 * Func for transform post data
 *
 * @param postData - post data
 * @param lang - runtime language
 *
 * @param plugins - YFM plugins list
 * @returns -prepared post
 */
export const transformPost = ({postData, lang, options: {plugins} = {}}: TransformPostType) => {
    if (!postData) {
        // eslint-disable-next-line no-console
        console.error('Post not found');

        return {} as PostData;
    }

    const {tags, title, metaTitle, description, ...post} = postData;

    return {
        ...post,
        title: yfmTransformer(lang, title as string, {plugins}),
        tags,
        textTitle: typografToText(title, lang),
        htmlTitle: typografToHTML(title, lang),
        metaTitle: metaTitle || title,
        description: yfmTransformer(lang, description as string, {plugins}),
    };
};
