import * as React from 'react';

import {SliderBlock} from '@gravity-ui/page-constructor';

import {PostCard} from '../../components/PostCard/PostCard';
import {Wrapper} from '../../components/Wrapper/Wrapper';
import {PostPageContext} from '../../contexts/PostPageContext';
import {Keyset, i18n} from '../../i18n';
import {SuggestProps} from '../../models/blocks';
import {PaddingsDirections} from '../../models/paddings';
import {prepareAnalyticsEvent} from '../../utils/common';
import {DefaultGoalIds} from '../../constants';
import {AnalyticsCounter} from '../../counters/utils';

const suggestGoals = prepareAnalyticsEvent({
    name: DefaultGoalIds.suggest,
    counter: AnalyticsCounter.CrossSite,
});

/**
 * Suggested posts block
 *
 * @param posts - suggested posts list
 * @param paddingTop - padding top code
 * @param paddingBottom - padding bottom code
 *
 * @returns -jsx
 */
export const Suggest = ({paddingTop = 'l', paddingBottom = 'l'}: SuggestProps) => {
    const {suggestedPosts} = React.useContext(PostPageContext);

    if (suggestedPosts.length === 0) {
        return null;
    }

    return (
        <Wrapper
            paddings={{
                [PaddingsDirections.top]: paddingTop,
                [PaddingsDirections.bottom]: paddingBottom,
            }}
        >
            <SliderBlock
                slidesToShow={{xl: 3, lg: 2, sm: 1}}
                title={{text: i18n(Keyset.TitleSuggest)}}
                lazyLoad={false}
            >
                {suggestedPosts.map((post) => (
                    <PostCard key={post.id} analyticsEvents={suggestGoals} post={post} />
                ))}
            </SliderBlock>
        </Wrapper>
    );
};
