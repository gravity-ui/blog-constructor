import React, {useContext} from 'react';

import {HeaderBlock} from '@gravity-ui/page-constructor';

import {BlogMetrikaGoals, PostInfo} from '../../components/PostInfo/PostInfo';
import {Wrapper} from '../../components/Wrapper/Wrapper';
import {BlogMetrikaGoalIds} from '../../constants';
import {LocaleContext} from '../../contexts/LocaleContext';
import {PostPageContext} from '../../contexts/PostPageContext';
import {HeaderProps} from '../../models/blocks';
import {PaddingsDirections} from '../../models/paddings';
import {getBreadcrumbs} from '../../utils/common';

/**
 * @deprecated Metrika will be deleted after launch of analyticsEvents
 */
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

export const Header = (props: HeaderProps) => {
    const {theme, paddingTop, paddingBottom} = props;
    const {post} = useContext(PostPageContext);
    const {locale} = useContext(LocaleContext);

    const {description, title, id, date, readingTime, tags} = post;

    const breadcrumbs = getBreadcrumbs({tags, pathPrefix: locale?.pathPrefix || ''});

    if (theme === 'dark' && breadcrumbs) {
        breadcrumbs.theme = 'dark';
    }

    breadcrumbs.metrikaGoals = breadcrumbsGoals;

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
                    metrikaGoals={metrikaGoals}
                    theme={theme}
                    qa="blog-header-meta-container"
                />
            </HeaderBlock>
        </Wrapper>
    );
};
