export interface ObjectSchema extends Record<string, unknown> {
    properties: object;
}

const sizeTypes = ['xs', 's', 'sm', 'm', 'l', 'xl'];

export const filteredItem = (itemsSchema: ObjectSchema) => ({
    ...itemsSchema,
    type: 'object',
    properties: {
        when: {
            type: 'string',
        },
        ...itemsSchema.properties,
    },
});

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
