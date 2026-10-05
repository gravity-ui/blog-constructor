'use client';

import {BackgroundImage, Content, getThemedValue, useTheme} from '@gravity-ui/page-constructor';

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
    const theme = useTheme();

    const themedColor = getThemedValue(background?.color, theme);
    const themedImage = getThemedValue(background?.image, theme);

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
                style={{backgroundColor: themedColor || 'none'}}
                data-qa={qaAttributes.container}
            >
                <div className={b('picture-container')}>
                    {themedImage && (
                        <BackgroundImage
                            className={b('picture')}
                            alt={background?.altText}
                            src={themedImage}
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
