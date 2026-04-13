The data in this component is taken from contexts.

| Property         | Type      | Required | Description                                    |
| :--------------- | :-------- | :------- | :--------------------------------------------- |
| image            | `string`  | `true`   | Image for feed header                          |
| title            | `string`  | `false`  | Title for feed header                          |
| resetTitleMargin | `boolean` | `false`  | When `true`, resets the `h1` title `margin: 0` |

The `filters` prop is passed via [`FeedContext`](../../contexts/FeedContext.ts) (populated by [`BlogPage`](../../containers/BlogPage/BlogPage.tsx)). It accepts a [`FiltersConfig`](../../models/common.ts) value — either a flat array of filter configs (all rendered in one row) or an array of rows (each inner array is rendered as a separate row in the feed header).

## `FiltersConfig`

`FiltersConfig` is `FilterConfig[] | FilterConfig[][]`.

- **Single row** (flat array, backward-compatible): all filters are placed in one row.
- **Multiple rows** (array of arrays): each inner array becomes its own row of filter controls.

```tsx
// Single row — backward-compatible
const filters: FiltersConfig = [searchFilter, tagsFilter];

// Multiple rows
const filters: FiltersConfig = [
  [searchFilter, savedOnlyFilter],
  [tagsFilter, serviceFilter],
];
```

## `FilterConfig`

`FilterConfig` is a discriminated union keyed on `type`. All variants share the following base fields:

| Property        | Type                  | Required | Description                                                                                 |
| :-------------- | :-------------------- | :------- | :------------------------------------------------------------------------------------------ |
| queryParamName  | `string`              | `true`   | The URL query parameter key used to store the selected value and passed to `handleLoadData` |
| analyticsEvents | `AnalyticsEventsProp` | `false`  | Analytics event(s) fired when the filter value changes; accepts a single event or an array  |

### `type?: 'select'` (default)

Renders a dropdown select. Omitting `type` is backwards-compatible and defaults to `'select'`.

| Property    | Type             | Required | Description                                                                                 |
| :---------- | :--------------- | :------- | :------------------------------------------------------------------------------------------ |
| options     | `SelectOption[]` | `true`   | The list of selectable options (`{ value: string; content: React.ReactNode }`)              |
| allLabel    | `string`         | `true`   | Label shown when nothing is selected (acts as an "All …" placeholder option in single mode) |
| multiple    | `boolean`        | `false`  | Enables multi-select mode; selected values are joined with `,` in the query param           |
| filterable  | `boolean`        | `false`  | Shows a search input inside the dropdown                                                    |
| hasClear    | `boolean`        | `false`  | Shows a clear button; defaults to `true` when `multiple` is enabled                         |
| placeholder | `string`         | `false`  | Placeholder text shown in the trigger button; falls back to `allLabel` when omitted         |
| qa          | `string`         | `false`  | `data-qa` attribute forwarded to the switcher button for testing                            |

### `type: 'search'`

Renders a text search input. The typed value is written to `queryParamName` in the URL.

| Property    | Type     | Required | Description            |
| :---------- | :------- | :------- | :--------------------- |
| placeholder | `string` | `false`  | Input placeholder text |

### `type: 'savedOnly'`

Renders a bookmark toggle button. The control is **not rendered at all** when `LikesContext.hasLikes` is `false`.

No additional properties beyond the base fields.

---

## Example

```tsx
const filters: FilterConfig[] = [
  // text search input
  {
    type: 'search',
    queryParamName: 'search',
    placeholder: 'Search posts…',
  },
  // bookmark toggle (only shown when likes are enabled)
  {
    type: 'savedOnly',
    queryParamName: 'savedOnly',
  },
  // dropdown — multi-select
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
  // dropdown — single-select
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
