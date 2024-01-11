import React, {useCallback, useState} from 'react';

import {
    // BackgroundImage,
    // Col,
    // Content,
    // FormBlockDataTypes,
    // FormBlockDirection,
    // Grid,
    // GridAlignItems,
    // GridColumnSize,
    InnerForm,
    // Row,
    // Title,
    // isHubspotDataForm,
    // isYandexDataForm,
    // InnerForm,
} from '@gravity-ui/page-constructor';

// import InnerForm from '@gravity-ui/page-constructor/build/esm/blocks/Form/InnerForm/InnerForm';

import {Wrapper} from '../../components/Wrapper/Wrapper';
import {FormProps} from '../../models/blocks';
import {PaddingsDirections} from '../../models/paddings';
import {block} from '../../utils/cn';

// import {MobileContext} from '../../contexts/MobileContext';

import './Form.scss';

const b = block('form-block');

// const colSizes = {[GridColumnSize.Lg]: 6, [GridColumnSize.All]: 12};

export const Form = ({paddingTop, paddingBottom, ...props}: FormProps) => {
    const {formData, border = 'shadow'} = props;
    const [contentLoaded, setContentLoaded] = useState(false);
    // const isMobile = useContext(MobileContext);

    // const withBackground = Boolean(
    //     background && (background.src || background.desktop || background.style?.backgroundColor),
    // );
    const onContentLoad = useCallback(() => {
        setContentLoaded(true);
    }, []);

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
