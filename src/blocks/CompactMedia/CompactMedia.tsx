import {Media as PCMedia, YFMWrapper} from '@gravity-ui/page-constructor';

import {Wrapper} from '../../components/Wrapper/Wrapper';
import {CompactMediaProps} from '../../models/blocks';
import {PaddingsDirections} from '../../models/paddings';
import {block} from '../../utils/cn';

import './CompactMedia.scss';

const b = block('compact-media');
export const CompactMedia = ({
    paddingBottom,
    paddingTop,
    description,
    paddingRight,
    paddingLeft,
    image,
}: CompactMediaProps) => {
    return (
        <Wrapper
            paddings={{
                [PaddingsDirections.top]: paddingTop,
                [PaddingsDirections.bottom]: paddingBottom,
                [PaddingsDirections.left]: paddingLeft,
                [PaddingsDirections.right]: paddingRight,
            }}
            className={b('container')}
        >
            <PCMedia className={b('media')} imageClassName={b('image')} image={image} />
            {description && (
                <div className={b('text-content')}>
                    <YFMWrapper
                        content={description}
                        modifiers={{
                            blog: true,
                            resetPaddings: true,
                        }}
                    />
                </div>
            )}
        </Wrapper>
    );
};
