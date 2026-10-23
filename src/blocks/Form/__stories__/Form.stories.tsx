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
export const FormData = DefaultTemplate.bind({});

Default.args = {
    ...formsData.default,
    border: 'shadow',
    paddingBottom: 'xl',
    formData: {
        hubspot: {
            ...formsData.default.formData.hubspot,
            formInstanceId: 'storybook-hubspot-form',
        },
    },
} as FormBlockModel;

FormData.args = {
    type: BlockType.Form,
    border: 'line',
    paddingTop: 'xl',
    paddingBottom: 'xl',
    formData: formsData.yandexForm.formData,
} as FormBlockModel;
