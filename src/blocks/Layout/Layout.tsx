import React, {useMemo} from 'react';

import {
    Col,
    GridColumnOrderSizesType,
    GridColumnSizesType,
    Row,
} from '@gravity-ui/page-constructor';

import {Wrapper} from '../../components/Wrapper/Wrapper';
import {ColumnContext} from '../../contexts/ColumnContext';
import {LayoutProps} from '../../models/blocks';
import {Column} from '../../models/common';
import {PaddingsDirections} from '../../models/paddings';
import {block} from '../../utils/cn';

import './Layout.scss';

const b = block('layout');

type ColLayouts = {
    sizes: GridColumnSizesType;
    offsets?: GridColumnSizesType;
    orders?: GridColumnOrderSizesType;
};

type LayoutType = {
    leftCol: ColLayouts;
    rightCol: ColLayouts;
};

export const Layout: React.FC<LayoutProps> = ({
    fullWidth,
    mobileOrder,
    children,
    paddingTop = 'xs',
    paddingBottom = 'xs',
}) => {
    const layout: LayoutType = useMemo(() => {
        const layoutConfig: LayoutType = {
            leftCol: {
                sizes: {all: 12, lg: 8},
                orders: {all: 1, lg: 1},
            },
            rightCol: {
                sizes: {all: 12, lg: 3},
                offsets: {
                    all: 0,
                    lg: 1,
                },
                orders: {all: 2, lg: 2},
            },
        };

        if (fullWidth) {
            layoutConfig.leftCol.sizes = {all: 12};
            layoutConfig.rightCol.sizes = {all: 12};
            layoutConfig.rightCol.offsets = {all: 0};
        }

        if (mobileOrder === 'reverse') {
            layoutConfig.leftCol.orders = {all: 3, lg: 1};
        }

        return layoutConfig;
    }, [fullWidth, mobileOrder]);

    const renderChildren = (blockChildren: React.ReactChild[], column = 'right' as Column) => (
        <ColumnContext.Provider value={column}>
            {React.Children.map(blockChildren, (child, i) => (
                <div key={i} className={b('item')}>
                    {child}
                </div>
            ))}
        </ColumnContext.Provider>
    );

    return (
        <Wrapper
            paddings={{
                [PaddingsDirections.top]: paddingTop,
                [PaddingsDirections.bottom]: paddingBottom,
            }}
        >
            <Row className={b('row')} noGutter>
                <Col className={b('left-col')} {...layout.leftCol}>
                    {renderChildren(children, 'left')}
                </Col>
                <Col className={b('right-col')} {...layout.rightCol}>
                    {renderChildren(children, 'right')}
                </Col>
            </Row>
        </Wrapper>
    );
};
