import React from 'react';

import {Content, Image, NewMetrikaGoal} from '@gravity-ui/page-constructor';

import {Wrapper} from '../../components/Wrapper/Wrapper';
import {BlogMetrikaGoalIds} from '../../constants';
import {BannerProps} from '../../models/blocks';
import {PaddingsDirections} from '../../models/paddings';
import {block} from '../../utils/cn';
import {getBlogElementMetrika, getQaAttributes, updateContentSizes} from '../../utils/common';

import './Banner.scss';

const b = block('banner');

const BANNER_CUSTOM_QA_ATTRIBUTES = ['image-container'];

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

    const contentData = updateContentSizes(content);

    /**
     * @deprecated Metrika will be deleted after launch of analyticsEvents
     */
    const metrikaGoal: NewMetrikaGoal = {
        name: BlogMetrikaGoalIds.bannerCommon,
        isCrossSite: true,
    };

    contentData.buttons?.forEach((button) => {
        // eslint-disable-next-line no-not-accumulator-reassign/no-not-accumulator-reassign
        button.metrikaGoals = getBlogElementMetrika(metrikaGoal, button.metrikaGoals);
    });

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
