import React, {useContext, useMemo} from 'react';
import {HeaderBlock, HeaderBlockProps} from '@yandex-data-ui/page-constructor';

import {BlogPageContext} from 'contexts/BlogPageContext';
import {TranslationContext} from 'contexts/TranslationContext';

import {BlogMetaComponent, BlogMetrikaGoals} from 'components/BlogMeta/BlogMeta';
import {BlogWrapper, PaddingSize} from 'components/BlogWrapper/BlogWrapper';

import {getBlogBreadcrumbs} from 'utils/blog';
import {BlogMetrikaGoalIds} from '../constants';

const metrikaGoals: BlogMetrikaGoals = {
    sharing: BlogMetrikaGoalIds.shareTop,
    save: BlogMetrikaGoalIds.saveTop,
};

const breadcrumbsGoals = [
    {
        name: BlogMetrikaGoalIds.breadcrumbsTop,
        isCrossSite: true,
    },
];

export type BlogHeaderProps = HeaderBlockProps & {
    paddingTop?: PaddingSize;
    paddingBottom?: PaddingSize;
};

export const BlogHeader: React.FC<BlogHeaderProps> = (props) => {
    const {theme, paddingTop, paddingBottom} = props;
    const {post} = useContext(BlogPageContext);
    const {i18n} = useContext(TranslationContext);

    const breadcrumbs = getBlogBreadcrumbs({
        tags: post?.tags,
        i18n,
    });

    if (theme === 'dark' && breadcrumbs) {
        breadcrumbs.theme = 'dark';
    }

    breadcrumbs.metrikaGoals = breadcrumbsGoals;

    const headerProps = useMemo(
        () => ({
            ...props,
            title: post?.title || '',
            description: post?.description || '',
            breadcrumbs,
        }),
        [breadcrumbs, post?.description, post?.title, props],
    );

    return (
        <BlogWrapper paddingTop={paddingTop} paddingBottom={paddingBottom}>
            <HeaderBlock {...headerProps}>
                {post && (
                    <BlogMetaComponent
                        post={post}
                        metrikaGoals={metrikaGoals}
                        theme={theme}
                        dataQa="blog-header-meta-container"
                    />
                )}
            </HeaderBlock>
        </BlogWrapper>
    );
};