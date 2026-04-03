# Migration Guide

## Upgrading from v9.x to v10.x

### Breaking Changes

## Abstract Feed Filters

This release replaces the hardcoded `tags` / `services` filter props with a single, generic `filters` array. You can now declare any number of dropdown filters without touching library internals.

---

### `BlogPage` props

| Before                    | After                      |
| ------------------------- | -------------------------- |
| `tags?: SelectItem[]`     | removed                    |
| `services?: SelectItem[]` | removed                    |
| _(not present)_           | `filters?: FilterConfig[]` |

**Before**

```tsx
<BlogPage
  tags={tags}
  services={services}
  getPosts={getPosts}
  // ...
/>
```

**After**

```tsx
import {FilterConfig} from '@gravity-ui/blog-constructor';

const filters: FilterConfig[] = [
  {
    queryParamName: 'tags',
    options: tags.map((t) => ({value: t.slug, content: t.name})),
    allLabel: 'All tags',
  },
  {
    queryParamName: 'services',
    options: services.map((s) => ({value: String(s.id), content: s.name})),
    allLabel: 'All services',
    multiple: true,
    filterable: true,
    hasClear: true,
  },
];

<BlogPage
  filters={filters}
  getPosts={getPosts}
  // ...
/>;
```

---

### Migrating hardcoded Search / SavedOnly to `FilterConfig`

Previously the search input and "saved only" button were always rendered by `Controls` and could not be removed or reordered. They are now opt-in entries in the `filters` array.

**Before** — search and savedOnly were implicit, always present.

**After** — declare them explicitly in `filters`:

```tsx
import {FilterConfig} from '@gravity-ui/blog-constructor';

const filters: FilterConfig[] = [
  {type: 'search', queryParamName: 'search'},
  {
    queryParamName: 'tags',
    options: tags.map((t) => ({value: t.slug, content: t.name})),
    allLabel: 'All tags',
  },
  {type: 'savedOnly', queryParamName: 'savedOnly'},
];

<BlogPage filters={filters} getPosts={getPosts} />;
```

---

If you omit the `search` or `savedOnly` entries they will not be rendered.

### `GetPostsRequest` type

The fixed `tags` and `services` fields are replaced by an open index signature so every `queryParamName` you declare in `FilterConfig` is forwarded automatically.

**Before**

```ts
type GetPostsRequest = {
  tags: string | undefined;
  page: number;
  perPage: number;
  savedOnly: boolean;
  search: string | undefined;
  services: string | undefined;
};
```

**After**

```ts
type GetPostsRequest = {
  page: number;
  perPage: number;
  savedOnly: boolean;
  search: string | undefined;
  [filterParam: string]: string | number | boolean | undefined;
};
```

Update your `getPosts` implementation to read filter values by the `queryParamName` keys you configured:

```ts
// Before
const getPosts = async ({tags, services, page, ...}: GetPostsRequest) => { ... };

// After
const getPosts = async ({page, perPage, savedOnly, search, tags, services, ...}: GetPostsRequest) => { ... };
// `tags` and `services` are still present when you declare them in FilterConfig —
// they are just no longer statically typed.
```

---

### `Service` type removed

The `Service` model has been deleted from `src/models/common.ts`. If you imported it, replace usages with a plain object type or your own domain type:

```ts
// Before
import {Service} from '@gravity-ui/blog-constructor';

// After — define locally
type Service = {
  id: number | string;
  slug: string;
  name: string;
  [x: string]: string | null;
};
```

---

### `SelectItem` type removed from `Controls`

`SelectItem` was an internal type exported from `Controls.tsx`. It is no longer exported. Use `SelectOption` from `@gravity-ui/uikit` instead when building option arrays:

```ts
// Before
import {SelectItem} from '@gravity-ui/blog-constructor/Controls';
const items: SelectItem[] = [{value: 'foo', content: 'Foo'}];

// After
import {SelectOption} from '@gravity-ui/uikit';
const items: SelectOption[] = [{value: 'foo', content: 'Foo'}];
```

---

### `FeedContext` changes

`tags` and `services` fields are removed from [`FeedContextProps`](src/contexts/FeedContext.ts). The context now carries `filters?: FilterConfig[]` instead. This is an internal change — if you consumed `FeedContext` directly, update accordingly:

```ts
// Before
const {tags, services} = React.useContext(FeedContext);

// After
const {filters} = React.useContext(FeedContext);
```

---

### `getFeedQueryParams` utility

The helper now accepts an optional third argument `filters?: FilterConfig[]`. Pass your filters array so dynamic query params are extracted correctly:

```ts
// Before
getFeedQueryParams(queryString, pageNumber);

// After
getFeedQueryParams(queryString, pageNumber, filters);
```

---

### Analytics

Per-filter analytics are now configured inline on each `FilterConfig` entry via the `analyticsEvents` field. The dedicated `DefaultEventNames.Tag` / `DefaultEventNames.Service` / `DefaultEventNames.SaveOnly` calls inside `Controls` are removed.

```ts
import {DefaultEventNames} from '@gravity-ui/blog-constructor';
import {prepareAnalyticsEvent} from '@gravity-ui/blog-constructor/utils';
import {AnalyticsCounter} from '@gravity-ui/blog-constructor/counters';

const filters: FilterConfig[] = [
  {
    type: 'savedOnly',
    queryParamName: 'savedOnly',
    analyticsEvents: prepareAnalyticsEvent({
      name: DefaultEventNames.SaveOnly,
      counter: AnalyticsCounter.CrossSite,
    }),
  },
  {
    queryParamName: 'tags',
    options: [...],
    allLabel: 'All tags',
    analyticsEvents: prepareAnalyticsEvent({
      name: DefaultEventNames.Tag,
      counter: AnalyticsCounter.CrossSite,
    }),
  },
];
```

---

### `FilterConfig` reference

Full type (see [`src/models/common.ts`](src/models/common.ts)):
