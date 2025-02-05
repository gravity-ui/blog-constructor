import * as React from 'react';

import {InnerForm} from '@gravity-ui/page-constructor';

import {Wrapper} from '../../components/Wrapper/Wrapper';
import {FormProps} from '../../models/blocks';
import {PaddingsDirections} from '../../models/paddings';
import {block} from '../../utils/cn';

import './Form.scss';

const b = block('form-block');

export const Form = ({paddingTop, paddingBottom, ...props}: FormProps) => {
    const {formData, border = 'shadow'} = props;
    const [contentLoaded, setContentLoaded] = React.useState(false);

    const onContentLoad = () => {
        setContentLoaded(true);
    };

    if (!formData) {
        return null;
    }

    return (
        <Wrapper
            paddings={{
                [PaddingsDirections.top]: paddingTop,
                [PaddingsDirections.bottom]: paddingBottom,
            }}
            className={b('wrapper')}
        >
            <div className={b('container', {hidden: !contentLoaded, border})}>
                <InnerForm
                    className={b('form')}
                    formData={formData}
                    onContentLoad={onContentLoad}
                />
            </div>
        </Wrapper>
    );
};
