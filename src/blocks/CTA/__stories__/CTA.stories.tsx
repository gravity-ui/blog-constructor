import * as React from 'react';

import type {Meta, StoryFn} from '@storybook/react';

import {StoryArgs, StoryBlock} from '../../../../.storybook/story-utils';
import {CTABlockModel} from '../../../models/blocks';
import {BlockType} from '../../../models/common';
import {CTA} from '../CTA';

import contentBlocks from '../../../../.mocks/contentBlocks.json';

type ColoredCTAModel = StoryArgs<CTABlockModel> & {'--bc-cta-card-bg'?: string};

export default {
    title: 'Blocks/CTA',
    component: CTA,
} as Meta<ColoredCTAModel>;

const DefaultTemplate: StoryFn<ColoredCTAModel> = ({['--bc-cta-card-bg']: cardColor, ...args}) => (
    <div style={cardColor ? ({['--bc-cta-card-bg']: cardColor} as React.CSSProperties) : undefined}>
        <StoryBlock args={args} />
    </div>
);

const getArgs = (itemsCount: number): ColoredCTAModel => ({
    type: BlockType.CTA,
    items: contentBlocks.slice(0, itemsCount) as unknown as CTABlockModel['items'],
    paddingTop: 'l',
    paddingBottom: 'l',
});

export const Default = DefaultTemplate.bind({});
export const OneItem = DefaultTemplate.bind({});
export const TwoItems = DefaultTemplate.bind({});
export const FourItems = DefaultTemplate.bind({});
export const FiveItems = DefaultTemplate.bind({});
export const SixItems = DefaultTemplate.bind({});
export const CustomColor = DefaultTemplate.bind({});

Default.args = getArgs(3);
OneItem.args = getArgs(1);
TwoItems.args = getArgs(2);
FourItems.args = getArgs(4);
FiveItems.args = getArgs(5);
SixItems.args = getArgs(6);
CustomColor.args = {...getArgs(3), '--bc-cta-card-bg': '#eff2f8'};
CustomColor.parameters = {yaml: {exclude: ['--bc-cta-card-bg']}};
