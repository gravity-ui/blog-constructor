import React from 'react';

import {Content, ContentBlockProps, NewMetrikaGoal} from '@gravity-ui/page-constructor';

import {Wrapper} from '../../components/Wrapper/Wrapper';
import {BlogMetrikaGoalIds} from '../../constants';
import {useCanRenderInColumn} from '../../hooks/useCanRenderInColumn';
import {CTAProps} from '../../models/blocks';
import {PaddingsDirections} from '../../models/paddings';
import {block} from '../../utils/cn';
import {getBlogElementMetrika, updateContentSizes} from '../../utils/common';

import './CTA.scss';

const b = block('cta');

export const CTA: React.FC<CTAProps> = ({items, paddingTop, paddingBottom, column}) => {
    /**
     * @deprecated Metrika will be deleted after launch of analyticsEvents
     */
    const metrikaGoal: NewMetrikaGoal = {
        name: BlogMetrikaGoalIds.cta,
        isCrossSite: true,
    };

    if (!useCanRenderInColumn(column)) {
        return null;
    }

    return (
        <Wrapper
            paddings={{
                [PaddingsDirections.top]: paddingTop,
                [PaddingsDirections.bottom]: paddingBottom,
            }}
            className={b('content')}
            dataQa="blog-cta-content"
        >
            {items.map((content: ContentBlockProps, index: number) => {
                const contentData = updateContentSizes(content);

                contentData.links?.forEach((link) => {
                    // eslint-disable-next-line no-not-accumulator-reassign/no-not-accumulator-reassign
                    link.metrikaGoals = getBlogElementMetrika(metrikaGoal, link.metrikaGoals);
                });

                return (
                    <div key={index} className={b('card')} data-qa="blog-cta-card">
                        <Content {...contentData} />
                    </div>
                );
            })}
        </Wrapper>
    );
};
