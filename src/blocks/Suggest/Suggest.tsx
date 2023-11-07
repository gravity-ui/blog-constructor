import React, {useContext} from 'react';

import {SliderBlock} from '@gravity-ui/page-constructor';

import {PostCard} from '../../components/PostCard/PostCard';
import {Wrapper} from '../../components/Wrapper/Wrapper';
import {BlogMetrikaGoalIds} from '../../constants';
import {PostPageContext} from '../../contexts/PostPageContext';
import {Keyset, i18} from '../../i18n';
import {SuggestProps} from '../../models/blocks';
import {PaddingsDirections} from '../../models/paddings';

/**
 * @deprecated Metrika will be deleted after launch of analyticsEvents
 */
const metrikaGoals = [
    {
        name: BlogMetrikaGoalIds.suggest,
        isCrossSite: true,
    },
];

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
    const {suggestedPosts} = useContext(PostPageContext);

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
                title={{text: i18(Keyset.TitleSuggest)}}
                lazyLoad={false}
            >
                {suggestedPosts.map((post) => (
                    <PostCard key={post.id} metrikaGoals={metrikaGoals} post={post} />
                ))}
            </SliderBlock>
        </Wrapper>
    );
};
