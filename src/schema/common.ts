export interface ObjectSchema extends Record<string, unknown> {
    properties: object;
}

const sizeTypes = ['xxs', 'xs', 's', 'm', 'l', 'xl', 'xxl'];

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
