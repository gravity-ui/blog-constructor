import React, {ElementType} from 'react';

import type {ContentProps} from '@gravity-ui/page-constructor/build/esm/sub-blocks/Content/Content';
import {render, screen} from '@testing-library/react';
import {pick} from 'lodash';

import {QAProps} from '../../src/models/common';
import {getQaAttributes} from '../../src/utils/common';
import {ERROR_INPUT_DATA_MESSAGE} from '../constants';

type PropsWithContentAsObject<T> = T &
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
type PropsWithContentAsArray<T> = T &
    QAProps & {
        items: Partial<
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
        >[];
    };

export type ContentTestFunction<T> = {
    component: ElementType;
    props: PropsWithContentAsArray<T> | PropsWithContentAsObject<T>;
    options?: {qaId?: string; textToFind?: string};
};

function isPropsWithContentAsObject<T>(
    props: PropsWithContentAsArray<T> | PropsWithContentAsObject<T>,
): props is PropsWithContentAsObject<T> {
    return !(props as PropsWithContentAsArray<T>).items;
}

function isPropsWithContentAsArray<T>(
    props: PropsWithContentAsArray<T> | PropsWithContentAsObject<T>,
): props is PropsWithContentAsArray<T> {
    return Array.isArray((props as PropsWithContentAsArray<T>).items);
}

export const testContentWithTitle = <T,>({
    component: Component,
    props,
    options,
}: ContentTestFunction<T>) => {
    let textToFind;
    if (isPropsWithContentAsObject<T>(props)) {
        textToFind = props.title as string;
    } else if (isPropsWithContentAsArray<T>(props) && options?.textToFind) {
        textToFind = options.textToFind;
    } else {
        throw new Error(ERROR_INPUT_DATA_MESSAGE);
    }

    render(<Component {...props} />);
    const title = screen.getByText(textToFind);
    expect(title).toBeInTheDocument();
    expect(title).toBeVisible();
};

export const testContentWithText = <T,>({
    component: Component,
    props,
    options,
}: ContentTestFunction<T>) => {
    let textToFind;
    if (isPropsWithContentAsObject<T>(props)) {
        textToFind = props.text as string;
    } else if (isPropsWithContentAsArray<T>(props) && options?.textToFind) {
        textToFind = options.textToFind;
    } else {
        throw new Error(ERROR_INPUT_DATA_MESSAGE);
    }

    render(<Component {...props} />);
    const text = screen.getByText(textToFind);
    expect(text).toBeInTheDocument();
    expect(text).toBeVisible();
};

export const testContentWithAdditionalInfo = <T,>({
    component: Component,
    props,
    options,
}: ContentTestFunction<T>) => {
    let textToFind;
    if (isPropsWithContentAsObject<T>(props)) {
        textToFind = props.additionalInfo as string;
    } else if (isPropsWithContentAsArray<T>(props) && options?.textToFind) {
        textToFind = options.textToFind;
    } else {
        throw new Error(ERROR_INPUT_DATA_MESSAGE);
    }

    render(<Component {...props} />);
    const additionalInfo = screen.getByText(textToFind);
    expect(additionalInfo).toBeInTheDocument();
    expect(additionalInfo).toBeVisible();
};

export const testContentWithSize = <T,>({
    component: Component,
    props,
    options,
}: ContentTestFunction<T>) => {
    let className;
    if (isPropsWithContentAsObject<T>(props)) {
        className = `pc-content pc-content_size_${props.size}`;
    } else if (isPropsWithContentAsArray<T>(props)) {
        className = `pc-content pc-content_size_${props.items[0].size}`;
    } else {
        throw new Error(ERROR_INPUT_DATA_MESSAGE);
    }

    if (!options?.qaId) {
        throw new Error(ERROR_INPUT_DATA_MESSAGE);
    }

    render(<Component {...props} />);
    const container = screen.getByTestId(options.qaId);
    expect(container).toHaveClass(className);
};

export const testContentWithLinks = <T,>({
    component: Component,
    props,
    options,
}: ContentTestFunction<T>) => {
    let url;
    if (isPropsWithContentAsObject<T>(props)) {
        url = props?.links?.[0]?.url;
    } else if (isPropsWithContentAsArray<T>(props)) {
        url = props?.items?.[0].links?.[0]?.url;
    } else {
        throw new Error(ERROR_INPUT_DATA_MESSAGE);
    }

    if (!options?.qaId || !url) {
        throw new Error(ERROR_INPUT_DATA_MESSAGE);
    }

    render(<Component {...props} />);
    const link = screen.getByTestId(options.qaId);
    expect(link).toHaveAttribute('href', url);
};

export const testContentWithButtons = <T,>({
    component: Component,
    props,
    options,
}: ContentTestFunction<T>) => {
    let url;
    if (isPropsWithContentAsObject<T>(props)) {
        url = props?.buttons?.[0]?.url;
    } else if (isPropsWithContentAsArray<T>(props)) {
        url = props?.items?.[0].buttons?.[0]?.url;
    } else {
        throw new Error(ERROR_INPUT_DATA_MESSAGE);
    }

    if (!options?.qaId || !url) {
        throw new Error(ERROR_INPUT_DATA_MESSAGE);
    }

    render(<Component {...props} />);
    const link = screen.getByTestId(options.qaId);
    expect(link).toHaveAttribute('href', url);
};

export const testContentWithCentered = <T,>({
    component: Component,
    props,
    options,
}: ContentTestFunction<T>) => {
    let centered;
    if (isPropsWithContentAsObject<T>(props)) {
        centered = props?.centered;
    } else if (isPropsWithContentAsArray<T>(props)) {
        centered = props?.items?.[0]?.centered;
    } else {
        throw new Error(ERROR_INPUT_DATA_MESSAGE);
    }

    if (!options?.qaId || !centered) {
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
    let theme;
    if (isPropsWithContentAsObject<T>(props)) {
        theme = props?.theme;
    } else if (isPropsWithContentAsArray<T>(props)) {
        theme = props?.items?.[0]?.theme;
    } else {
        throw new Error(ERROR_INPUT_DATA_MESSAGE);
    }

    if (!options?.qaId || !theme) {
        throw new Error(ERROR_INPUT_DATA_MESSAGE);
    }

    render(<Component {...pick(props, 'theme', 'qa')} />);
    const container = screen.getByTestId(options.qaId);
    expect(container).toHaveClass(`pc-content_theme_${theme}`);
};

export const testContentWithList = <T,>({
    component: Component,
    props,
    options,
}: ContentTestFunction<T>) => {
    let listElem;
    if (isPropsWithContentAsObject<T>(props)) {
        listElem = props?.list?.[0];
    } else if (isPropsWithContentAsArray<T>(props)) {
        listElem = props?.items?.[0]?.list?.[0];
    } else {
        throw new Error(ERROR_INPUT_DATA_MESSAGE);
    }

    if (!options?.qaId || !listElem?.icon || !listElem?.title || !listElem?.text) {
        throw new Error(ERROR_INPUT_DATA_MESSAGE);
    }

    const listQa = getQaAttributes(options.qaId, ['title', 'text']);

    render(<Component {...pick(props, 'list', 'qa')} />);
    const image = screen.getByRole('img');
    const title = screen.getByTestId(listQa.title);
    const text = screen.getByTestId(listQa.text);
    expect(image).toHaveAttribute('src', listElem.icon);
    expect(title).toHaveTextContent(listElem.title);
    expect(text).toHaveTextContent(listElem.text);
};
