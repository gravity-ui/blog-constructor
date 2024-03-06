import React, {useContext} from 'react';

import {AnalyticsEventsProp, HeaderBlock} from '@gravity-ui/page-constructor';

import {PostInfo} from '../../components/PostInfo/PostInfo';
import {Wrapper} from '../../components/Wrapper/Wrapper';
import {DefaultGoalIds} from '../../constants';
import {LocaleContext} from '../../contexts/LocaleContext';
import {PostPageContext} from '../../contexts/PostPageContext';
import {HeaderProps} from '../../models/blocks';
import {PaddingsDirections} from '../../models/paddings';
import {
    getBreadcrumbs,
    getBlogPath as getDefaultBlogPath,
    prepareAnalyticsEvent,
} from '../../utils/common';
import {SettingsContext} from '../../contexts/SettingsContext';
import {AnalyticsCounter} from '../../counters/utils';

const analyticsEventsContainer: Record<string, AnalyticsEventsProp> = {
    sharing: prepareAnalyticsEvent({name: DefaultGoalIds.shareTop}),
    save: prepareAnalyticsEvent({name: DefaultGoalIds.saveTop}),
};

const breadcrumbsGoals = prepareAnalyticsEvent({
    name: DefaultGoalIds.breadcrumbsTop,
    counter: AnalyticsCounter.CrossSite,
});

export const Header = (props: HeaderProps) => {
    const {theme, paddingTop, paddingBottom} = props;
    const {post} = useContext(PostPageContext);
    const {locale} = useContext(LocaleContext);
    const {getBlogPath = getDefaultBlogPath} = useContext(SettingsContext);
    const blogPath = getBlogPath(locale.pathPrefix || '');

    const {description, title, id, date, readingTime, tags} = post;

    const breadcrumbs = getBreadcrumbs({tags, blogPath});

    if (theme === 'dark' && breadcrumbs) {
        breadcrumbs.theme = 'dark';
    }

    breadcrumbs.analyticsEvents = breadcrumbsGoals;

    return (
        <Wrapper
            paddings={{
                [PaddingsDirections.top]: paddingTop,
                [PaddingsDirections.bottom]: paddingBottom,
            }}
        >
            <HeaderBlock
                {...props}
                title={title}
                description={description}
                breadcrumbs={breadcrumbs}
            >
                <PostInfo
                    postId={id}
                    date={date}
                    readingTime={readingTime}
                    analyticsEventsContainer={analyticsEventsContainer}
                    theme={theme}
                    qa="blog-header-meta-container"
                />
            </HeaderBlock>
        </Wrapper>
    );
};
