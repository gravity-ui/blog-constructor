import type {Meta, StoryFn} from '@storybook/react';

import {StoryArgs, StoryBlock} from '../../../../.storybook/story-utils';
import {FormBlockModel} from '../../../models/blocks';
import {BlockType} from '../../../models/common';
import {Form} from '../Form';

import formsData from '../../../../.mocks/forms.json';

export default {
    title: 'Blocks/Form',
    component: Form,
} as Meta<StoryArgs<FormBlockModel>>;

const DefaultTemplate: StoryFn<StoryArgs<FormBlockModel>> = (args) => <StoryBlock args={args} />;

export const Default = DefaultTemplate.bind({});

Default.args = {
    type: BlockType.Form,
    border: 'line',
    paddingTop: 'xl',
    paddingBottom: 'xl',
    formData: formsData.yandexForm.formData,
} as FormBlockModel;
