import {Content, ContentBlockProps} from '@gravity-ui/page-constructor';

import {Wrapper} from '../../components/Wrapper/Wrapper';
import {DefaultGoalIds} from '../../constants';
import {CTAProps} from '../../models/blocks';
import {PaddingsDirections} from '../../models/paddings';
import {createExtendedEvent} from '../../utils/analytics';
import {block} from '../../utils/cn';
import {getMergedAnalyticsEvents, getQaAttributes, updateContentSizes} from '../../utils/common';

import './CTA.scss';

const b = block('cta');

const linkGoals = createExtendedEvent(DefaultGoalIds.cta);

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
                const links = content.links?.map((link) => ({
                    ...link,
                    analyticsEvents: getMergedAnalyticsEvents(linkGoals, link.analyticsEvents),
                }));
                const contentData = updateContentSizes({...content, links});

                return (
                    <div key={index} className={b('card')} data-qa={qaAttributes.card}>
                        <Content {...contentData} qa={qaAttributes.content} />
                    </div>
                );
            })}
        </Wrapper>
    );
};
