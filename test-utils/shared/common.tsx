import * as React from 'react';

import {QAProps} from '@gravity-ui/uikit';
import {render, screen} from '@testing-library/react';

import {PaddingSize} from '../../src/models/paddings';

type CommonTestInputType<T> = {
    component: React.ElementType;
    props: T & {
        paddingTop?: PaddingSize;
        paddingBottom?: PaddingSize;
    } & Required<QAProps>;
    options?: {qaId?: string; paddingKey?: string};
};

export const testCustomClassName = <T,>({component: Component, props}: CommonTestInputType<T>) => {
    const className = 'custom-class-name';
    render(<Component className={className} {...props} />);
    const anchor = screen.getByTestId(props.qa);
    expect(anchor).toHaveClass(className);
};

export const testCustomStyle = <T,>({component: Component, props}: CommonTestInputType<T>) => {
    const style = {color: 'red'};

    render(<Component {...props} style={style} />);
    const component = screen.getByTestId(props.qa);

    expect(component).toHaveStyle(style);
};

export const testPaddingTop = <T,>({
    component: Component,
    props,
    options,
}: CommonTestInputType<T>) => {
    render(<Component {...props} />);
    const component = screen.getByTestId(options?.qaId || props.qa);

    expect(component).toHaveClass(`bc-wrapper_padding-top_${props.paddingTop}`);
};

export const testPaddingBottom = <T,>({
    component: Component,
    props,
    options,
}: CommonTestInputType<T>) => {
    render(<Component {...props} />);
    const component = screen.getByTestId(options?.qaId || props.qa);

    expect(component).toHaveClass(`bc-wrapper_padding-bottom_${props.paddingBottom}`);
};

export const testPadding = <T,>({component: Component, props, options}: CommonTestInputType<T>) => {
    render(<Component {...props} />);
    const component = screen.getByTestId(options?.qaId || props.qa);

    const classSuffix = options?.paddingKey === 'paddingTop' ? 'top' : 'bottom';
    const classEdning =
        options?.paddingKey === 'paddingTop' ? props.paddingTop : props.paddingBottom;

    expect(component).toHaveClass(`bc-wrapper_padding-${classSuffix}_${classEdning}`);
};
