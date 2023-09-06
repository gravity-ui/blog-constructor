import React, {ElementType} from 'react';

import type {ContentProps} from '@gravity-ui/page-constructor/build/esm/sub-blocks/Content/Content';
import {render, screen} from '@testing-library/react';
import {pick} from 'lodash';

import {QAProps} from '../../src/models/common';
import {getQaAttrubutes} from '../../src/utils/common';
import {ERROR_INPUT_DATA_MESSAGE} from '../constants';

export type ContentTestFunction<T> = {
    component: ElementType;
    props: T &
        QAProps &
        Partial<
            Pick<
                ContentProps,
                | 'title'
                | 'size'
                | 'text'
                | 'additionalInfo'
                | 'links'
                | 'buttons'
                | 'colSizes'
                | 'centered'
                | 'theme'
                | 'list'
            >
        >;
    options?: {qaId?: string};
};

export const testContentWithTitle = <T,>({component: Component, props}: ContentTestFunction<T>) => {
    render(<Component {...pick(props, 'title')} />);
    const title = screen.getByText(props.title as string);
    expect(title).toBeInTheDocument();
    expect(title).toBeVisible();
};

export const testContentWithText = <T,>({component: Component, props}: ContentTestFunction<T>) => {
    render(<Component {...pick(props, 'text')} />);
    const text = screen.getByText(props.text as string);
    expect(text).toBeInTheDocument();
    expect(text).toBeVisible();
};

export const testContentWithAdditionalInfo = <T,>({
    component: Component,
    props,
}: ContentTestFunction<T>) => {
    render(<Component {...pick(props, 'additionalInfo')} />);
    const additionalInfo = screen.getByText(props.additionalInfo as string);
    expect(additionalInfo).toBeInTheDocument();
    expect(additionalInfo).toBeVisible();
};

export const testContentWithSize = <T,>({
    component: Component,
    props,
    options,
}: ContentTestFunction<T>) => {
    if (!options?.qaId) {
        throw new Error(ERROR_INPUT_DATA_MESSAGE);
    }

    render(<Component {...pick(props, 'size', 'qa')} />);
    const container = screen.getByTestId(options.qaId);
    expect(container).toHaveClass(`pc-content pc-content_size_${props.size}`);
};

export const testContentWithLinks = <T,>({
    component: Component,
    props,
    options,
}: ContentTestFunction<T>) => {
    if (!options?.qaId || !props?.links?.[0]?.url) {
        throw new Error(ERROR_INPUT_DATA_MESSAGE);
    }

    render(<Component {...pick(props, 'links', 'qa')} />);
    const link = screen.getByTestId(options.qaId);
    expect(link).toHaveAttribute('href', props.links[0].url);
};

export const testContentWithButtons = <T,>({
    component: Component,
    props,
    options,
}: ContentTestFunction<T>) => {
    if (!options?.qaId || !props?.buttons?.[0]?.url) {
        throw new Error(ERROR_INPUT_DATA_MESSAGE);
    }

    render(<Component {...pick(props, 'buttons', 'qa')} />);
    const link = screen.getByTestId(options.qaId);
    expect(link).toHaveAttribute('href', props.buttons[0].url);
};

export const testContentWithCentered = <T,>({
    component: Component,
    props,
    options,
}: ContentTestFunction<T>) => {
    if (!options?.qaId || !props?.centered) {
        throw new Error(ERROR_INPUT_DATA_MESSAGE);
    }

    render(<Component {...pick(props, 'centered', 'qa')} />);
    const container = screen.getByTestId(options.qaId);
    expect(container).toHaveClass('pc-content_centered');
};

export const testContentWithTheme = <T,>({
    component: Component,
    props,
    options,
}: ContentTestFunction<T>) => {
    if (!options?.qaId || !props?.theme) {
        throw new Error(ERROR_INPUT_DATA_MESSAGE);
    }

    render(<Component {...pick(props, 'theme', 'qa')} />);
    const container = screen.getByTestId(options.qaId);
    expect(container).toHaveClass(`pc-content_theme_${props.theme}`);
};

export const testContentWithList = <T,>({
    component: Component,
    props,
    options,
}: ContentTestFunction<T>) => {
    if (
        !options?.qaId ||
        !props.list?.[0]?.icon ||
        !props.list?.[0]?.title ||
        !props.list?.[0]?.text
    ) {
        throw new Error(ERROR_INPUT_DATA_MESSAGE);
    }

    const listQa = getQaAttrubutes(options.qaId, ['title', 'text']);

    render(<Component {...pick(props, 'list', 'qa')} />);
    const image = screen.getByRole('img');
    const title = screen.getByTestId(listQa.title);
    const text = screen.getByTestId(listQa.text);
    expect(image).toHaveAttribute('src', props.list?.[0]?.icon);
    expect(title).toHaveTextContent(props.list?.[0]?.title);
    expect(text).toHaveTextContent(props.list?.[0]?.text);
};
