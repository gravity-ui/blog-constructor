import {CardBase, Media as PCMedia, YFMWrapper} from '@gravity-ui/page-constructor';

import {Wrapper} from '../../components/Wrapper/Wrapper';
import {SideCardListProps} from '../../models/blocks';
import {PaddingsDirections} from '../../models/paddings';
import {block} from '../../utils/cn';

import './SideCardList.scss';

const b = block('side-card-list');

export const SideCardList = ({title, items, paddingTop, paddingBottom}: SideCardListProps) => {
    return (
        <Wrapper
            paddings={{
                [PaddingsDirections.top]: paddingTop,
                [PaddingsDirections.bottom]: paddingBottom,
            }}
            className={b('container')}
        >
            {title && <div className={b('title')}>{title}</div>}
            <div className={b('items')}>
                {items.map(({url, description, image}, index) => (
                    <CardBase key={index} url={url} className={b('item')}>
                        <CardBase.Content>
                            <PCMedia
                                className={b('item-media')}
                                imageClassName={b('item-image')}
                                image={image}
                            />
                            {description && (
                                <div className={b('item-description')}>
                                    <YFMWrapper
                                        content={description}
                                        modifiers={{
                                            blogDescription: true,
                                            resetPaddings: true,
                                        }}
                                    />
                                </div>
                            )}
                        </CardBase.Content>
                    </CardBase>
                ))}
            </div>
        </Wrapper>
    );
};

export default SideCardList;
