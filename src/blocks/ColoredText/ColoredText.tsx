import React from 'react';

import {BackgroundImage, Content} from '@gravity-ui/page-constructor';

import {Wrapper} from '../../components/Wrapper/Wrapper';
import {ColoredTextProps} from '../../models/blocks';
import {PaddingsDirections} from '../../models/paddings';
import {block} from '../../utils/cn';
import {getQaAttributes, updateContentSizes} from '../../utils/common';

import './ColoredText.scss';

const b = block('colored-text');

export const ColoredText = ({
    background,
    paddingTop,
    paddingBottom,
    qa,
    ...content
}: ColoredTextProps) => {
    const contentData = updateContentSizes(content);
    const qaAttributes = getQaAttributes(qa);

    return (
        <Wrapper
            paddings={{
                [PaddingsDirections.top]: paddingTop,
                [PaddingsDirections.bottom]: paddingBottom,
            }}
            qa={qaAttributes.wrapper}
        >
            <div
                className={b('container')}
                style={{backgroundColor: background?.color || 'none'}}
                data-qa={qaAttributes.container}
            >
                <div className={b('picture-container')}>
                    {background?.image && (
                        <BackgroundImage
                            className={b('picture')}
                            alt={background?.altText}
                            src={background?.image}
                        />
                    )}
                </div>
                <div className={b('text-content')}>
                    <Content {...contentData} qa={qaAttributes.content} />
                </div>
            </div>
        </Wrapper>
    );
};
