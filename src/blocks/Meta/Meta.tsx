import React, {useContext} from 'react';

import {HeaderBreadcrumbs, YFMWrapper} from '@gravity-ui/page-constructor';

import {BlogMetrikaGoals, PostInfo} from '../../components/PostInfo/PostInfo';
import {Wrapper} from '../../components/Wrapper/Wrapper';
import {BlogMetrikaGoalIds} from '../../constants';
import {LocaleContext} from '../../contexts/LocaleContext';
import {SettingsContext} from '../../contexts/SettingsContext';
import {PostPageContext} from '../../contexts/PostPageContext';
import {MetaProps} from '../../models/blocks';
import {PaddingsDirections} from '../../models/paddings';
import {block} from '../../utils/cn';
import {
    getBreadcrumbs,
    getBlogPath as getDefaultBlogPath,
    getQaAttributes,
} from '../../utils/common';

import './Meta.scss';

const b = block('meta');

/**
 * @deprecated Metrika will be deleted after launch of analyticsEvents
 */
const metrikaGoals: BlogMetrikaGoals = {
    sharing: BlogMetrikaGoalIds.shareBottom,
    save: BlogMetrikaGoalIds.saveBottom,
};

const breadcrumbsGoals = [
    {
        name: BlogMetrikaGoalIds.breadcrumbsBottom,
        isCrossSite: true,
    },
];

export const Meta = (props: MetaProps) => {
    const {paddingTop = 'l', paddingBottom = 'l', theme = 'light', qa} = props;
    const {post} = useContext(PostPageContext);
    const {locale} = useContext(LocaleContext);
    const qaAttributes = getQaAttributes(qa, 'post-info');
    const {getBlogPath = getDefaultBlogPath} = useContext(SettingsContext);
    const blogPath = getBlogPath(locale.pathPrefix || '');

    const {title, id, date, readingTime, tags} = post;

    const breadcrumbs = getBreadcrumbs({tags, blogPath});

    breadcrumbs.metrikaGoals = breadcrumbsGoals;

    return (
        <Wrapper
            paddings={{
                [PaddingsDirections.top]: paddingTop,
                [PaddingsDirections.bottom]: paddingBottom,
            }}
            qa={qaAttributes.wrapper}
        >
            {breadcrumbs && (
                <HeaderBreadcrumbs
                    items={breadcrumbs.items}
                    className={b('breadcrumbs')}
                    theme={theme}
                    metrikaGoals={breadcrumbs.metrikaGoals}
                />
            )}
            {title && (
                <YFMWrapper
                    content={title}
                    modifiers={{
                        blogBreadcrumbs: true,
                        resetPaddings: true,
                    }}
                />
            )}
            {post && (
                <PostInfo
                    postId={id}
                    date={date}
                    readingTime={readingTime}
                    metrikaGoals={metrikaGoals}
                    qa={qaAttributes.postInfo}
                />
            )}
        </Wrapper>
    );
};
