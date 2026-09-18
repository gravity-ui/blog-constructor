import * as React from 'react';

import {ButtonProps, Content, Image} from '@gravity-ui/page-constructor';

import {Wrapper} from '../../components/Wrapper/Wrapper';
import {DefaultGoalIds} from '../../constants';
import {BannerProps} from '../../models/blocks';
import {PaddingsDirections} from '../../models/paddings';
import {createExtendedEvent} from '../../utils/analytics';
import {block} from '../../utils/cn';
import {getMergedAnalyticsEvents, getQaAttributes, updateContentSizes} from '../../utils/common';

import './Banner.scss';

const b = block('banner');

const BANNER_CUSTOM_QA_ATTRIBUTES = ['image-container'];

const buttonGoals = createExtendedEvent(DefaultGoalIds.bannerCommon);

export const Banner = ({
    color,
    imageSize = 's',
    image,
    paddingTop,
    paddingBottom,
    qa,
    ...content
}: BannerProps) => {
    const contentStyle: Record<string, string> = {};
    const qaAttributes = getQaAttributes(qa, BANNER_CUSTOM_QA_ATTRIBUTES);

    if (color) {
        contentStyle.backgroundColor = color;
    }

    const buttons = content.buttons?.map((button) => {
        if (React.isValidElement(button)) {
            return button;
        }

        const buttonConfig = button as ButtonProps;

        return {
            ...buttonConfig,
            analyticsEvents: getMergedAnalyticsEvents(buttonGoals, buttonConfig.analyticsEvents),
        };
    });
    const contentData = updateContentSizes({...content, buttons});

    return (
        <Wrapper
            paddings={{
                [PaddingsDirections.top]: paddingTop,
                [PaddingsDirections.bottom]: paddingBottom,
            }}
            qa={qaAttributes.wrapper}
            className={b('container')}
        >
            <div className={b('content')} style={contentStyle} data-qa={qaAttributes.content}>
                <div className={b('info')}>
                    <Content {...contentData} qa={qaAttributes.content} />
                </div>
                {image && (
                    <div
                        className={b('image-container', {['image-size']: imageSize})}
                        data-qa={qaAttributes.imageContainer}
                    >
                        <Image className={b('image')} src={image} />
                    </div>
                )}
            </div>
        </Wrapper>
    );
};
