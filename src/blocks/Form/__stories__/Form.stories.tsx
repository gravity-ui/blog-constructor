import React from 'react';

import {v4 as uuidv4} from 'uuid';

import {Meta, StoryFn} from '@storybook/react';

import formsData from '../../../../.mocks/forms.json';
import {FormBlockModel} from '../../../models/blocks';
import {Form} from '../Form';
import {isHubspotDataForm} from '@gravity-ui/page-constructor';

export default {
    title: 'Blocks/Form',
    component: Form,
    args: {
        theme: 'light',
    },
} as Meta;

const __getFormData = (formData: FormBlockModel['formData']) => {
    const id = uuidv4();

    return isHubspotDataForm(formData)
        ? {hubspot: {...formData.hubspot, formInstanceId: id}}
        : {yandex: formData.yandex};
};

const ContentDirectionTemplate: StoryFn<FormBlockModel> = (args) => {
    return (
        <div style={{maxWidth: '1500px', padding: '0 40px', margin: '0 auto'}}>
            {[
                {
                    ...args,
                    formData: __getFormData(args.formData),
                },
            ].map((props, index) => (
                <div key={index} style={{margin: '64px auto'}}>
                    <Form {...props} />
                </div>
            ))}
            ;
        </div>
    );
};

const FormDataTemplate: StoryFn<FormBlockModel> = (args) => {
    return (
        <React.Fragment>
            <ContentDirectionTemplate {...args} />
            <ContentDirectionTemplate
                {...args}
                {...(formsData.default as FormBlockModel)}
                border="line"
            />
        </React.Fragment>
    );
};

const DefaultTemplate: StoryFn<FormBlockModel> = (args) => (
    <div style={{maxWidth: '1500px', padding: '0 40px', margin: '32px auto'}}>
        <Form {...args} />
    </div>
);

export const Default = DefaultTemplate.bind({});
export const FormData = FormDataTemplate.bind({});

Default.args = {
    ...formsData.default,
} as FormBlockModel;

FormData.args = {...formsData.yandexForm};
