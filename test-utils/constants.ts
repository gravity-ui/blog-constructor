import {PaddingSize} from '../src/models/paddings';

export const PADDING_SIZES: PaddingSize[] = ['xs', 's', 'm', 'l', 'xl'];
export const PADDING_TYPES: string[] = ['paddingTop', 'paddingBottom'];

export const PADDING_SIZES_BY_PADDING_TYPE: Record<string, PaddingSize>[] = PADDING_TYPES.reduce(
    (acc, optionKey) => {
        const mappedPaddingSizes = PADDING_SIZES.map((paddingSize) => {
            return {optionKey, paddingSize} as Record<string, PaddingSize>;
        });

        return [...acc, ...mappedPaddingSizes];
    },
    [] as Record<string, PaddingSize>[],
);

export const ERROR_INPUT_DATA_MESSAGE = 'There are errors in input test data';
