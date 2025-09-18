import * as React from 'react';

import {
    AuthorItem,
    ContentBlockProps,
    FormBlockData,
    HeaderBlockProps,
    MediaProps as PCMediaProps,
    TextTheme,
} from '@gravity-ui/page-constructor';

import {BlockType, ClassNameProps, PostData, QAProps} from './common';
import {PaddingsYFMProps} from './paddings';

// blocks props
export type AuthorProps = ClassNameProps & {
    authorId: number | string;
    image: string;
} & PaddingsYFMProps &
    QAProps;

export type BannerProps = ContentBlockProps &
    QAProps & {
        color?: string;
        image?: string;
        imageSize?: 's' | 'm';
    } & PaddingsYFMProps;

export type ColoredTextProps = ContentBlockProps &
    QAProps & {
        background?: {
            color?: string;
            image?: string;
            altText?: string;
        };
    } & PaddingsYFMProps;

export type CTAProps = QAProps & {
    items: Array<ContentBlockProps>;
} & PaddingsYFMProps;

type HeaderBlogProps = {
    imageInGrid?: boolean;
};

export type HeaderProps = HeaderBlockProps & PaddingsYFMProps & HeaderBlogProps;

export type LayoutProps = {
    fullWidth?: boolean;
    mobileOrder?: string;
    children: React.ReactElement[];
} & PaddingsYFMProps;

export type MediaProps = ClassNameProps &
    PaddingsYFMProps &
    Partial<
        Pick<
            PCMediaProps,
            | 'youtube'
            | 'previewImg'
            | 'image'
            | 'video'
            | 'dataLens'
            | 'videoIframe'
            | 'videoMicrodata'
        >
    > & {
        text?: string;
    };

export type MetaProps = QAProps & {
    locale: string;
    theme?: TextTheme;
} & PaddingsYFMProps;

export type SuggestProps = ClassNameProps & {
    posts: PostData[];
} & PaddingsYFMProps;

export type YFMProps = {
    text: string;
} & PaddingsYFMProps &
    QAProps;

export type FeedProps = {
    image: string;
};

export type FormProps = {
    formData: FormBlockData;
    border?: 'shadow' | 'line' | 'none';
} & PaddingsYFMProps &
    QAProps;

export type CompactMediaProps = {
    description?: string;
} & PaddingsYFMProps &
    Partial<Pick<PCMediaProps, 'image'>>;

export type TakeProps = YFMProps & {
    author: AuthorItem;
    color?: string;
    noBackground?: boolean;
};

// blocks models
export type AuthorBlockModel = {
    type: BlockType.Author;
} & AuthorProps;

export type BannerBlockModel = {
    type: BlockType.Banner;
} & BannerProps;

export type ColoredTextBlockModel = {
    type: BlockType.ColoredText;
} & ColoredTextProps;

export type CTABlockModel = {
    type: BlockType.CTA;
} & CTAProps;

export type HeaderBlockModel = {
    type: BlockType.Header;
} & HeaderProps;

export type LayoutBlockModel = {
    type: BlockType.Layout;
} & LayoutProps;

export type MediaBlockModel = {
    type: BlockType.Media;
} & MediaProps;

export type MetaBlockModel = {
    type: BlockType.Meta;
} & MetaProps;

export type SuggestBlockModel = {
    type: BlockType.Suggest;
} & SuggestProps;

export type YFMBlockModel = {
    type: BlockType.YFM;
} & YFMProps;

export type FeedBlockModel = {
    type: BlockType.Feed;
} & FeedProps;

export type FormBlockModel = {
    type: BlockType.Form;
} & FormProps;

export type CompactMediaBlockModel = {
    type: BlockType.CompactMedia;
} & CompactMediaProps;

export type TakeBlockModel = {
    type: BlockType.Take;
} & TakeProps;

export type BlockModel =
    | AuthorBlockModel
    | BannerBlockModel
    | ColoredTextBlockModel
    | CTABlockModel
    | HeaderBlockModel
    | LayoutBlockModel
    | MediaBlockModel
    | MetaBlockModel
    | SuggestBlockModel
    | YFMBlockModel
    | FeedBlockModel
    | CompactMediaBlockModel
    | TakeBlockModel;

export type Block = BlockModel & {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [x: string]: any;
};
