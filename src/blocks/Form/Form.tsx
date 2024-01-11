import React, {useCallback, useContext, useState} from 'react';

import {
    BackgroundImage,
    Col,
    Content,
    FormBlockDataTypes,
    FormBlockDirection,
    Grid,
    GridAlignItems,
    GridColumnSize,
    InnerForm,
    Row,
    Title,
    isHubspotDataForm,
    isYandexDataForm,
    // InnerForm,
} from '@gravity-ui/page-constructor';

// import InnerForm from '@gravity-ui/page-constructor/build/esm/blocks/Form/InnerForm/InnerForm';

import {Wrapper} from '../../components/Wrapper/Wrapper';
import {FormProps} from '../../models/blocks';
import {PaddingsDirections} from '../../models/paddings';
import {block} from '../../utils/cn';

import {MobileContext} from '../../contexts/MobileContext';

import './Form.scss';

const b = block('form-block');

const colSizes = {[GridColumnSize.Lg]: 6, [GridColumnSize.All]: 12};

export const Form = ({paddingTop, paddingBottom, ...props}: FormProps) => {
    const {formData, title, textContent, direction = FormBlockDirection.Center, background} = props;
    const [contentLoaded, setContentLoaded] = useState(false);
    const isMobile = useContext(MobileContext);

    const withBackground = Boolean(
        background && (background.src || background.desktop || background.style?.backgroundColor),
    );
    const onContentLoad = useCallback(() => {
        setContentLoaded(true);
    }, []);

    if (!formData) {
        return null;
    }

    let formType;

    if (isYandexDataForm(formData)) {
        formType = FormBlockDataTypes.YANDEX;
    } else if (isHubspotDataForm(formData)) {
        formType = FormBlockDataTypes.HUBSPOT;
    }

    return (
        <Wrapper
            paddings={{
                [PaddingsDirections.top]: paddingTop,
                [PaddingsDirections.bottom]: paddingBottom,
            }}
            className={b({
                'with-background': withBackground,
                'form-type': formType,
            })}
        >
            {/*<div
                className={b({
                    'with-background': withBackground,
                    'form-type': formType,
                })}
            >*/}
            {background && (
                <BackgroundImage
                    {...background}
                    className={b('media')}
                    imageClassName={b('image')}
                />
            )}
            <Grid>
                <Row
                    alignItems={
                        direction === FormBlockDirection.Center
                            ? GridAlignItems.Center
                            : GridAlignItems.Start
                    }
                    className={b('row', {
                        direction,
                    })}
                >
                    <Col sizes={colSizes} className={b('content-col')}>
                        {textContent && (
                            <div className={b('content-wrapper')}>
                                <Content
                                    theme="default"
                                    {...textContent}
                                    centered={direction === FormBlockDirection.Center}
                                    colSizes={{all: 12}}
                                    className={b('content')}
                                />
                            </div>
                        )}
                    </Col>
                    <Col sizes={colSizes} className={b('form-col')}>
                        <div className={b('form-wrapper')}>
                            <div
                                className={b('full-form', {
                                    hidden: !contentLoaded,
                                })}
                            >
                                {title && (
                                    <Title
                                        title={{
                                            text: title,
                                            textSize: 's',
                                        }}
                                        className={b('title', {mobile: isMobile})}
                                        colSizes={{all: 12}}
                                    />
                                )}
                                <InnerForm
                                    className={b('form')}
                                    formData={formData}
                                    onContentLoad={onContentLoad}
                                />
                            </div>
                        </div>
                    </Col>
                </Row>
            </Grid>
            {/* </div> */}
        </Wrapper>
    );
};
