Feed receives its visual settings through props and post, filtering, and routing data through contexts.

## Props

| Property           | Type      | Required | Description                              |
| :----------------- | :-------- | :------- | :--------------------------------------- |
| `image`            | `string`  | Yes      | Feed header image                        |
| `title`            | `string`  | No       | Feed header title                        |
| `resetTitleMargin` | `boolean` | No       | Resets the `h1` title margin when `true` |

## `FeedContext`

[`FeedContext`](../../contexts/FeedContext.ts) is normally populated by [`BlogPage`](../../containers/BlogPage/BlogPage.tsx).

| Property                         | Type                                              | Required | Description                                              |
| :------------------------------- | :------------------------------------------------ | :------- | :------------------------------------------------------- |
| `posts`                          | `PostData[]`                                      | No       | Posts rendered on the initial page                       |
| `pinnedPost`                     | `PostData`                                        | No       | Pinned post rendered separately from the regular list    |
| `totalCount`                     | `number`                                          | No       | Total number of posts available                          |
| `filters`                        | `FiltersConfig`                                   | No       | Feed filter configuration                                |
| `getPosts`                       | `(query: GetPostsRequest) => Promise<PostsProps>` | No       | Loads posts for pagination and filter changes            |
| `pageCountForShowSupportButtons` | `number`                                          | No       | Page threshold after which support buttons are displayed |

## `RouterContext`

Feed reads the current query and writes filter and pagination changes through [`RouterContext`](../../contexts/RouterContext.ts).

| Property              | Type                     | Required | Description                           |
| :-------------------- | :----------------------- | :------- | :------------------------------------ |
| `pathname`            | `string`                 | Yes      | Current pathname                      |
| `as`                  | `string`                 | Yes      | Current route as displayed in the URL |
| `hostname`            | `string`                 | Yes      | Current hostname                      |
| `query`               | `Query`                  | No       | Current query parameters              |
| `updateQueryCallback` | `(query: Query) => void` | Yes      | Applies changed query parameters      |

The `filters` value accepts a [`FiltersConfig`](../../models/common.ts) value — either a flat array of filter configs (all rendered in one row) or an array of rows (each inner array is rendered as a separate row in the feed header).

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

| Property          | Type                  | Required | Description                                                                                 |
| :---------------- | :-------------------- | :------- | :------------------------------------------------------------------------------------------ |
| `queryParamName`  | `string`              | Yes      | The URL query parameter key used to store the selected value and passed to `handleLoadData` |
| `analyticsEvents` | `AnalyticsEventsProp` | No       | Base analytics event(s). The interaction suffix is appended to each event name              |

Select opening, search clicks, and saved-only changes append `_CLICK`; select closing appends
`_CLOSE`.

### `type?: 'select'` (default)

Renders a dropdown select. Omitting `type` is backwards-compatible and defaults to `'select'`.

| Property      | Type             | Required | Description                                                                                 |
| :------------ | :--------------- | :------- | :------------------------------------------------------------------------------------------ |
| `options`     | `SelectOption[]` | Yes      | The list of selectable options (`{value: string; content: React.ReactNode}`)                |
| `allLabel`    | `string`         | Yes      | Label shown when nothing is selected (acts as an "All …" placeholder option in single mode) |
| `multiple`    | `boolean`        | No       | Enables multi-select mode; selected values are joined with `,` in the query param           |
| `filterable`  | `boolean`        | No       | Shows a search input inside the dropdown                                                    |
| `hasClear`    | `boolean`        | No       | Shows a clear button; defaults to `true` when `multiple` is enabled                         |
| `placeholder` | `string`         | No       | Placeholder text shown in the trigger button; falls back to `allLabel` when omitted         |
| `qa`          | `string`         | No       | `data-qa` attribute forwarded to the switcher button for testing                            |

### `type: 'search'`

Renders a text search input. The typed value is written to `queryParamName` in the URL.

| Property      | Type     | Required | Description            |
| :------------ | :------- | :------- | :--------------------- |
| `placeholder` | `string` | No       | Input placeholder text |

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
      name: 'filter-tags',
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
      name: 'filter-service',
      type: 'services',
    },
  },
];
```
