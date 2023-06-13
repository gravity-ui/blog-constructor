import React from 'react';

import {render, screen} from '@testing-library/react';

import {PADDING_SIZES} from '../../../../test-utils/constants';
import {testPaddingBottom, testPaddingTop} from '../../../../test-utils/shared/common';
import {YFMProps} from '../../../models/blocks';
import {PaddingSize} from '../../../models/paddings';
import {getQaAttrubutes} from '../../../utils/common';
import {YFM} from '../YFM';

const yfmProps = {
    text: 'YFM block',
    qa: 'yfm-block',
};

const qaAttributes = getQaAttrubutes(yfmProps.qa);

describe('YFM', () => {
    test('render yfm by default', async () => {
        render(<YFM {...yfmProps} />);
        const yfm = screen.getByText(yfmProps.text);
        expect(yfm).toHaveClass('yfm');
    });

    test.each(new Array<PaddingSize>(...PADDING_SIZES))(
        'render with given "%s" paddingTop size',
        (size: PaddingSize) => {
            testPaddingTop<YFMProps>({
                component: YFM,
                props: {...yfmProps, paddingTop: size},
                options: {qaId: qaAttributes.wrapper},
            });
        },
    );

    test.each(new Array<PaddingSize>(...PADDING_SIZES))(
        'render with given "%s" paddingBottom size',
        (size: PaddingSize) => {
            testPaddingBottom<YFMProps>({
                component: YFM,
                props: {...yfmProps, paddingBottom: size},
                options: {qaId: qaAttributes.wrapper},
            });
        },
    );
});
