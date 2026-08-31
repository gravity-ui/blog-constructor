const sizeTypes = ['xs', 's', 'sm', 'm', 'l', 'xl'];

export const PaddingSize = {
    type: 'string',
    enum: sizeTypes,
};

export const BlogBlockBase = {
    paddingTop: PaddingSize,
    paddingBottom: PaddingSize,
    fullWidth: {
        type: 'boolean',
    },
    column: {
        type: 'string',
        enum: ['left', 'right'],
    },
    qa: {
        type: 'string',
    },
};
