export interface ObjectSchema extends Record<string, unknown> {
    properties: object;
}

const sizeTypes = ['xxs', 'xs', 's', 'm', 'l', 'xl', 'xxl'];
const containerSizesArray = ['sm', 'md', 'lg', 'xl', 'all'];
const textSize = ['s', 'm', 'l'];

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

export const BaseProps = {
    type: {},
    when: {},
};

export const Title = {
    type: 'object',
    additionalProperties: false,
    required: ['text'],
    properties: {
        text: {
            type: 'string',
            contentType: 'text',
        },
        textSize: {
            type: 'string',
            enum: textSize,
        },
        url: {
            type: 'string',
        },
    },
};

export const Anchor = {
    type: 'object',
    additionalProperties: false,
    required: ['text', 'url'],
    properties: {
        text: {
            type: 'string',
            contentType: 'text',
        },
        url: {
            type: 'string',
        },
    },
};

export const BlockBase = {
    ...BaseProps,
    anchor: Anchor,
    visible: {
        type: 'string',
        enum: containerSizesArray,
    },
    resetPaddings: {
        type: 'boolean',
    },
};

export const BlogBlockBase = {
    paddingTop: {
        type: 'string',
        enum: sizeTypes,
    },
    paddingBottom: {
        type: 'string',
        enum: sizeTypes,
    },
    fullWidth: {
        type: 'boolean',
    },
    column: {
        type: 'string',
        enum: ['left', 'right'],
    },
};

export const Children = {
    type: 'array',
    items: {$ref: 'self#/definitions/children'},
};
