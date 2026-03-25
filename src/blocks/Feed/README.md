The data in this component is taken from contexts.

| Property | Type     | Required | Description           |
| :------- | :------- | :------- | :-------------------- |
| image    | `string` | `true`   | Image for feed header |
| title    | `string` | `false`  | Title for feed header |

The `filters` prop is passed via [`FeedContext`](../../contexts/FeedContext.ts) (populated by [`BlogPage`](../../containers/BlogPage/BlogPage.tsx)). Each entry in the `filters` array is a [`FilterConfig`](../../models/common.ts) object that renders a dropdown filter control in the feed header.

## `FilterConfig`

| Property        | Type                  | Required | Description                                                                                 |
| :-------------- | :-------------------- | :------- | :------------------------------------------------------------------------------------------ |
| queryParamName  | `string`              | `true`   | The URL query parameter key used to store the selected value and passed to `handleLoadData` |
| options         | `SelectOption[]`      | `true`   | The list of selectable options (`{ value: string; content: React.ReactNode }`)              |
| allLabel        | `string`              | `true`   | Label shown when nothing is selected (acts as an "All …" placeholder option in single mode) |
| multiple        | `boolean`             | `false`  | Enables multi-select mode; selected values are joined with `,` in the query param           |
| filterable      | `boolean`             | `false`  | Shows a search input inside the dropdown                                                    |
| hasClear        | `boolean`             | `false`  | Shows a clear button; defaults to `true` when `multiple` is enabled                         |
| placeholder     | `string`              | `false`  | Placeholder text shown in the trigger button; falls back to `allLabel` when omitted         |
| qa              | `string`              | `false`  | `data-qa` attribute forwarded to the switcher button for testing                            |
| analyticsEvents | `AnalyticsEventsProp` | `false`  | Analytics event(s) fired when the filter value changes; accepts a single event or an array  |

### Example

```tsx
const filters: FilterConfig[] = [
  {
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
    queryParamName: 'service',
    options: [
      {value: 'compute', content: 'Compute'},
      {value: 'storage', content: 'Storage'},
    ],
    allLabel: 'All services',
    analyticsEvents: {
      name: 'filter-click',
      type: 'services',
    },
  },
];
```
