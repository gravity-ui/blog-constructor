import * as React from 'react';

import {AnalyticsEventsProp, HeaderBreadcrumbs, YFMWrapper} from '@gravity-ui/page-constructor';

import {PostInfo} from '../../components/PostInfo/PostInfo';
import {Wrapper} from '../../components/Wrapper/Wrapper';
import {DefaultGoalIds} from '../../constants';
import {LocaleContext} from '../../contexts/LocaleContext';
import {PostPageContext} from '../../contexts/PostPageContext';
import {SettingsContext} from '../../contexts/SettingsContext';
import {MetaProps} from '../../models/blocks';
import {PaddingsDirections} from '../../models/paddings';
import {createExtendedEvent} from '../../utils/analytics';
import {block} from '../../utils/cn';
import {
    getBreadcrumbs,
    getBlogPath as getDefaultBlogPath,
    getMergedAnalyticsEvents,
    getQaAttributes,
} from '../../utils/common';

import './Meta.scss';

const b = block('meta');

const analyticsEventsContainer: Record<string, AnalyticsEventsProp> = {
    sharing: createExtendedEvent(DefaultGoalIds.shareBottom),
    save: createExtendedEvent(DefaultGoalIds.saveBottom),
};

const breadcrumbsGoals = createExtendedEvent(DefaultGoalIds.breadcrumbsBottom);

export const Meta = (props: MetaProps) => {
    const {paddingTop = 'l', paddingBottom = 'l', theme = 'light', qa} = props;
    const {post, breadcrumbs: customBreadcrumbs} = React.useContext(PostPageContext);
    const {locale} = React.useContext(LocaleContext);
    const qaAttributes = getQaAttributes(qa, 'post-info');
    const {getBlogPath = getDefaultBlogPath} = React.useContext(SettingsContext);
    const blogPath = getBlogPath(locale.pathPrefix || '');

    const {title, id, date, readingTime, tags} = post;

    const breadcrumbs = getBreadcrumbs({tags, blogPath});

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
                    items={customBreadcrumbs?.items || breadcrumbs.items}
                    className={b('breadcrumbs')}
                    theme={theme}
                    analyticsEvents={getMergedAnalyticsEvents(
                        breadcrumbsGoals,
                        customBreadcrumbs?.analyticsEvents,
                    )}
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
                    analyticsEventsContainer={analyticsEventsContainer}
                    qa={qaAttributes.postInfo}
                />
            )}
        </Wrapper>
    );
};
