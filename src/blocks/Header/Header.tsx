import * as React from 'react';

import {AnalyticsEventsProp, HeaderBlock} from '@gravity-ui/page-constructor';

import {PostInfo} from '../../components/PostInfo/PostInfo';
import {Wrapper} from '../../components/Wrapper/Wrapper';
import {DefaultGoalIds} from '../../constants';
import {LocaleContext} from '../../contexts/LocaleContext';
import {PostPageContext} from '../../contexts/PostPageContext';
import {SettingsContext} from '../../contexts/SettingsContext';
import {HeaderProps} from '../../models/blocks';
import {PaddingsDirections} from '../../models/paddings';
import {createExtendedEvent} from '../../utils/analytics';
import {block} from '../../utils/cn';
import {
    getBreadcrumbs,
    getBlogPath as getDefaultBlogPath,
    getMergedAnalyticsEvents,
} from '../../utils/common';

import './Header.scss';

const b = block('header-block');

const analyticsEventsContainer: Record<string, AnalyticsEventsProp> = {
    sharing: createExtendedEvent(DefaultGoalIds.shareTop),
    save: createExtendedEvent(DefaultGoalIds.saveTop),
};

const breadcrumbsGoals = createExtendedEvent(DefaultGoalIds.breadcrumbsTop);

export const Header = (props: HeaderProps) => {
    const {theme, paddingTop, paddingBottom, imageInGrid = true} = props;
    const {post, breadcrumbs: customBreadcrumbs} = React.useContext(PostPageContext);
    const {locale} = React.useContext(LocaleContext);
    const {getBlogPath = getDefaultBlogPath} = React.useContext(SettingsContext);
    const blogPath = getBlogPath(locale.pathPrefix || '');

    const {description, title, id, date, readingTime, tags, htmlTitle} = post;

    const breadcrumbs = getBreadcrumbs({tags, blogPath});

    if (theme === 'dark' && breadcrumbs) {
        breadcrumbs.theme = 'dark';
    }

    const preparedBreadcrumbs = {
        ...breadcrumbs,
        ...customBreadcrumbs,
        analyticsEvents: getMergedAnalyticsEvents(
            breadcrumbsGoals,
            customBreadcrumbs?.analyticsEvents,
        ),
    };

    return (
        <Wrapper
            paddings={{
                [PaddingsDirections.top]: paddingTop,
                [PaddingsDirections.bottom]: paddingBottom,
            }}
        >
            <div className={b({'image-out-grid': !imageInGrid})}>
                <HeaderBlock
                    {...props}
                    title={htmlTitle || title}
                    description={description}
                    breadcrumbs={preparedBreadcrumbs}
                    mediaClassName={b('image')}
                    gridClassName={b('grid')}
                    contentWrapperClassName={b('content-wrapper')}
                    contentInnerClassName={b('content-inner')}
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
            </div>
        </Wrapper>
    );
};
