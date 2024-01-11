import React from 'react';

import {v4 as uuidv4} from 'uuid';

import {Meta, StoryFn} from '@storybook/react';

import {
    // dataLensSrc,
    // getDefaultStoryArgs,
    getFormsData,
    // getVideoStoryArgs,
    // youtubeSrc,
} from '../../../../.mocks/utils';
import {FormBlockModel} from '../../../models/blocks';
// import {BlockType} from '../../../models/common';
import {Form} from '../Form';
import {FormBlockDirection, isHubspotDataForm} from '@gravity-ui/page-constructor';

const formsData = getFormsData();
console.log(formsData);

export default {
    title: 'Blocks/Form',
    component: Form,
    args: {
        theme: 'light',
    },
} as Meta;

const __getFormData = (formData: FormBlockModel['formData']) => {
    const id = uuidv4();
    console.log({formData});
    return isHubspotDataForm(formData)
        ? {hubspot: {...formData.hubspot, formInstanceId: id}}
        : {yandex: formData.yandex};
};

// type FormModel = {
//     type: BlockType.Form;
// } & FormProps;

const ContentDirectionTemplate: StoryFn<FormBlockModel> = (args) => {
    console.log({args});
    return (
        <div style={{maxWidth: '1500px', padding: '0 40px', margin: '0 auto'}}>
            {[
                {
                    ...args,
                    direction: FormBlockDirection.FormContent,
                    textContent: {...args.textContent, title: 'FormContent'},
                    formData: __getFormData(args.formData),
                },
                {
                    ...args,
                    direction: FormBlockDirection.ContentForm,
                    textContent: {...args.textContent, title: 'ContentForm'},
                    formData: __getFormData(args.formData),
                },
                {
                    ...args,
                    direction: FormBlockDirection.Center,
                    textContent: {...args.textContent, title: 'Center'},
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
    console.log({args2: args});
    return (
        <React.Fragment>
            <ContentDirectionTemplate {...args} />
            <ContentDirectionTemplate
                {...args}
                {...(formsData.default as FormBlockModel)}
                {...formsData.withBackground}
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
// export const ContentDirection = ContentDirectionTemplate.bind({});
export const WithBackgroundColor = ContentDirectionTemplate.bind({});
export const WithBackgroundImage = ContentDirectionTemplate.bind({});
export const DarkTheme = ContentDirectionTemplate.bind({});
export const FormData = FormDataTemplate.bind({});

Default.args = {
    // type: BlockType.Form,
    ...formsData.default,
} as FormBlockModel;

WithBackgroundColor.args = {
    ...formsData.default,
    ...formsData.withBackground,
} as FormBlockModel;

WithBackgroundImage.args = {
    ...formsData.default,
    ...formsData.withBackgroundImage,
} as FormBlockModel;

DarkTheme.args = {
    ...formsData.default,
    ...formsData.darkTheme,
} as FormBlockModel;

FormData.args = {...formsData.yandexForm, ...formsData.withBackgroundImage};
