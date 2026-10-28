import type {Meta, StoryFn} from '@storybook/react';

import {StoryBlock} from '../../../../.storybook/story-utils';
import {BlockType} from '../../../models/common';
import {Layout} from '../Layout';

import './Layout.stories.scss';

type LayoutColumn = 'left' | 'right';

type LayoutChild = {
    type: BlockType.YFM;
    column: LayoutColumn;
    text: string;
    paddingTop?: 'xs' | 's' | 'sm' | 'm' | 'l' | 'xl';
    paddingBottom?: 'xs' | 's' | 'sm' | 'm' | 'l' | 'xl';
};

type LayoutStoryModel = {
    type: BlockType.Layout;
    fullWidth?: boolean;
    mobileOrder?: string;
    paddingTop?: 'xs' | 's' | 'sm' | 'm' | 'l' | 'xl';
    paddingBottom?: 'xs' | 's' | 'sm' | 'm' | 'l' | 'xl';
    children: LayoutChild[];
};

export default {
    title: 'Blocks/Layout',
    component: Layout,
} as Meta<LayoutStoryModel>;

const LayoutTemplate: StoryFn<LayoutStoryModel> = (args) => (
    <div className="layout-story">
        <div className="layout-story__legend" aria-label="Layout column legend">
            <span className="layout-story__legend-item layout-story__legend-item_left">
                Left column
            </span>
            <span className="layout-story__legend-item layout-story__legend-item_right">
                Right column
            </span>
            <span className="layout-story__legend-note">Dashed outline — layout container</span>
        </div>
        <StoryBlock args={args} />
    </div>
);

export const Default = LayoutTemplate.bind({});
export const MultipleItems = LayoutTemplate.bind({});
export const ReversedOnMobile = LayoutTemplate.bind({});
export const FullWidth = LayoutTemplate.bind({});
export const VerticalPaddings = LayoutTemplate.bind({});

const defaultArgs: LayoutStoryModel = {
    type: BlockType.Layout,
    paddingTop: 'l',
    paddingBottom: 'l',
    fullWidth: false,
    mobileOrder: 'default',
    children: [
        {
            type: BlockType.YFM,
            column: 'left',
            text: '## Left column\n\n**8/12 columns** on desktop.',
            paddingTop: 's',
            paddingBottom: 's',
        },
        {
            type: BlockType.YFM,
            column: 'right',
            text: '### Right column\n\n**3/12 columns** with a 1/12 offset on desktop.',
            paddingTop: 's',
            paddingBottom: 's',
        },
    ],
};

Default.args = defaultArgs;
MultipleItems.args = {
    ...defaultArgs,
    children: [
        {
            type: BlockType.YFM,
            column: 'left',
            text: '### Left · item 1\n\nItems in one column are stacked vertically.',
            paddingTop: 's',
            paddingBottom: 's',
        },
        {
            type: BlockType.YFM,
            column: 'left',
            text: '### Left · item 2\n\nEvery child keeps its own paddings.',
            paddingTop: 's',
            paddingBottom: 's',
        },
        {
            type: BlockType.YFM,
            column: 'left',
            text: '### Left · item 3\n\nThe children array controls the order.',
            paddingTop: 's',
            paddingBottom: 's',
        },
        {
            type: BlockType.YFM,
            column: 'right',
            text: '#### Right · item 1\n\nSidebar content.',
            paddingTop: 's',
            paddingBottom: 's',
        },
        {
            type: BlockType.YFM,
            column: 'right',
            text: '#### Right · item 2\n\nMore sidebar content.',
            paddingTop: 's',
            paddingBottom: 's',
        },
    ],
};
ReversedOnMobile.args = {
    ...defaultArgs,
    mobileOrder: 'reverse',
    children: [
        {
            type: BlockType.YFM,
            column: 'left',
            text: '## Left column\n\nRendered **second** on a mobile viewport.',
            paddingTop: 's',
            paddingBottom: 's',
        },
        {
            type: BlockType.YFM,
            column: 'right',
            text: '### Right column\n\nRendered **first** on a mobile viewport.',
            paddingTop: 's',
            paddingBottom: 's',
        },
    ],
};
FullWidth.args = {
    ...defaultArgs,
    fullWidth: true,
    children: [
        {
            type: BlockType.YFM,
            column: 'left',
            text: '## Left column · full width\n\nThe column occupies **12/12 columns**.',
            paddingTop: 's',
            paddingBottom: 's',
        },
        {
            type: BlockType.YFM,
            column: 'right',
            text: '### Right column · full width\n\nThe second column also occupies **12/12 columns** and moves below.',
            paddingTop: 's',
            paddingBottom: 's',
        },
    ],
};
VerticalPaddings.args = {
    ...defaultArgs,
    paddingTop: 'xl',
    paddingBottom: 'xl',
    children: [
        {
            type: BlockType.YFM,
            column: 'left',
            text: '## XL outer paddings\n\nThe dotted area above and below belongs to the Layout wrapper.',
            paddingTop: 'xs',
            paddingBottom: 'xs',
        },
        {
            type: BlockType.YFM,
            column: 'right',
            text: '### Independent item paddings\n\nThis item uses its own `xs` vertical paddings.',
            paddingTop: 'xs',
            paddingBottom: 'xs',
        },
    ],
};
