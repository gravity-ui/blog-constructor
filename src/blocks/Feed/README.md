The data in this component is taken from contexts.

| Property | Type     | Required | Description           |
| :------- | :------- | :------- | :-------------------- |
| image    | `string` | `true`   | Image for feed header |
| title    | `string` | `false`  | Title for feed header |

The `filters` prop is passed via [`FeedContext`](../../contexts/FeedContext.ts) (populated by [`BlogPage`](../../containers/BlogPage/BlogPage.tsx)). Each entry in the `filters` array is a [`FilterConfig`](../../models/common.ts) object that renders a filter control in the feed header.

## `FilterConfig`

`FilterConfig` is a discriminated union of two variants based on the `type` field.

### Shared fields (all variants)

| Property        | Type                  | Required | Description                                                                                 |
| :-------------- | :-------------------- | :------- | :------------------------------------------------------------------------------------------ |
| queryParamName  | `string`              | `true`   | The URL query parameter key used to store the selected value and passed to `handleLoadData` |
| qa              | `string`              | `false`  | `data-qa` attribute forwarded to the control for testing                                    |
| analyticsEvents | `AnalyticsEventsProp` | `false`  | Analytics event(s) fired when the filter value changes; accepts a single event or an array  |

### Select variant (`type: 'select'`)

Renders a dropdown [`Select`](https://gravity-ui.com/components/select) control.

| Property    | Type            | Required | Description                                                                                                                                     |
| :---------- | :-------------- | :------- | :---------------------------------------------------------------------------------------------------------------------------------------------- |
| type        | `'select'`      | `true`   | Discriminant that activates the dropdown select mode                                                                                            |
| options     | `SelectOptions` | `true`   | The list of selectable options; see [Select – options](https://preview.gravity-ui.com/uikit/?path=/docs/components-inputs-select--docs#options) |
| allLabel    | `string`        | `true`   | Label shown when nothing is selected (acts as an "All …" placeholder option)                                                                    |
| multiple    | `boolean`       | `false`  | Enables multi-select mode; selected values are joined with `,` in the query param                                                               |
| filterable  | `boolean`       | `false`  | Shows a search input inside the dropdown                                                                                                        |
| hasClear    | `boolean`       | `false`  | Shows a clear button; defaults to `true` when `multiple` is enabled                                                                             |
| placeholder | `string`        | `false`  | Placeholder text shown in the trigger button; falls back to `allLabel` when omitted                                                             |

### Boolean variant (`type: 'boolean'`)

Renders a [`Switch`](https://gravity-ui.com/components/switch) toggle control. When toggled on, the query param is set to `'true'`; when toggled off it is set to `''`.

| Property | Type        | Required | Description                              |
| :------- | :---------- | :------- | :--------------------------------------- |
| type     | `'boolean'` | `true`   | Discriminant that activates switch mode  |
| label    | `string`    | `true`   | Label rendered next to the switch toggle |

### Examples

**Select filter:**

```tsx
const filters: FilterConfig[] = [
  {
    type: 'select',
    queryParamName: 'tags',
    options: [
      {value: 'news', content: 'News'},
      {value: 'tutorial', content: 'Tutorial'},
    ],
    allLabel: 'All tags',
    multiple: true,
    filterable: true,
    analyticsEvents: {
      name: 'filter-click',
      type: 'tags',
    },
  },
  {
    type: 'select',
    queryParamName: 'service',
    options: [
      {
        label: 'group1',
        options: [
          {value: '101', content: 'veniam'},
          {value: '102', content: 'Storage'},
        ],
      },
      {
        label: 'group2',
        options: [
          {value: '201', content: 'laboris'},
          {value: '202', content: 'nisi'},
        ],
      },
    ],
    allLabel: 'All services',
    analyticsEvents: {
      name: 'filter-click',
      type: 'services',
    },
  },
];
```

**Boolean (switch) filter:**

```tsx
const filters: FilterConfig[] = [
  {
    type: 'boolean',
    queryParamName: 'isNew',
    label: 'New',
    analyticsEvents: {
      name: 'filter-click',
      type: 'new',
    },
  },
];
```
