import React from 'react';

import {Content, ContentBlockProps} from '@gravity-ui/page-constructor';

import {Wrapper} from '../../components/Wrapper/Wrapper';
import {CTAProps} from '../../models/blocks';
import {PaddingsDirections} from '../../models/paddings';
import {block} from '../../utils/cn';
import {
    getMergedAnalyticsEvents,
    getQaAttributes,
    prepareAnalyticsEvent,
    updateContentSizes,
} from '../../utils/common';
import {DefaultGoalIds} from '../../constants';
import {AnalyticsCounter} from '../../counters/utils';

import './CTA.scss';

const b = block('cta');

const linkGoals = prepareAnalyticsEvent({
    name: DefaultGoalIds.cta,
    counter: AnalyticsCounter.CrossSite,
});

export const CTA = ({items, paddingTop, paddingBottom, qa}: CTAProps) => {
    const qaAttributes = getQaAttributes(qa, 'card');

    return (
        <Wrapper
            paddings={{
                [PaddingsDirections.top]: paddingTop,
                [PaddingsDirections.bottom]: paddingBottom,
            }}
            className={b('content')}
            qa={qaAttributes.wrapper}
        >
            {items.map((content: ContentBlockProps, index: number) => {
                const contentData = updateContentSizes(content);

                contentData.links?.forEach((link) => {
                    // eslint-disable-next-line no-not-accumulator-reassign/no-not-accumulator-reassign
                    link.analyticsEvents = getMergedAnalyticsEvents(
                        linkGoals,
                        link.analyticsEvents,
                    );
                });

                return (
                    <div key={index} className={b('card')} data-qa={qaAttributes.card}>
                        <Content {...contentData} qa={qaAttributes.content} />
                    </div>
                );
            })}
        </Wrapper>
    );
};
