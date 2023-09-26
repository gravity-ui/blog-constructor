import React from 'react';

import {
    BackgroundImage,
    FullWidthBackground,
    Grid,
    Theme,
    getThemedValue,
} from '@gravity-ui/page-constructor';

import {ClassNameProps, HeaderBlockProps} from '../../models/common';
import {block} from '../../utils/cn';

import {Controls, ControlsProps} from './components/Controls/Controls';

import './FeedHeader.scss';

const b = block('feed-header');

type HeaderProps = Pick<HeaderBlockProps, 'background' | 'offset' | 'theme' | 'verticalOffset'>;

type FeedHeaderProps = HeaderProps & ControlsProps;

type FeedHeaderContainerProps = FeedHeaderProps & ClassNameProps;

export const FeedHeader = ({
    tags,
    services,
    handleLoadData,
    offset = 'default',
    background,
    theme = 'light',
    verticalOffset = 'l',
    className,
    queryParams,
}: FeedHeaderContainerProps) => {
    const backgroundThemed = background && getThemedValue(background, theme as Theme);

    return (
        <header className={b('header', {['has-background']: Boolean(background)}, className)}>
            {backgroundThemed?.color ? (
                <FullWidthBackground
                    style={{backgroundColor: backgroundThemed?.color}}
                    theme="rounded"
                />
            ) : null}
            <Grid className={b('content', {offset, theme, 'vertical-offset': verticalOffset})}>
                {backgroundThemed ? (
                    <BackgroundImage
                        src={backgroundThemed?.url}
                        className={b('background')}
                        imageClassName={b('background-img')}
                        style={{
                            backgroundColor: backgroundThemed.fullWidth
                                ? ''
                                : backgroundThemed?.color,
                        }}
                        disableCompress={backgroundThemed?.disableCompress}
                    />
                ) : null}
                <Controls
                    tags={tags}
                    services={services}
                    handleLoadData={handleLoadData}
                    queryParams={queryParams}
                />
            </Grid>
        </header>
    );
};
