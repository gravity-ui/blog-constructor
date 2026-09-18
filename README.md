# @gravity-ui/blog-constructor &middot; [![npm package](https://img.shields.io/npm/v/@gravity-ui/blog-constructor)](https://www.npmjs.com/package/@gravity-ui/blog-constructor) [![CI](https://img.shields.io/github/actions/workflow/status/gravity-ui/blog-constructor/ci.yml?branch=main&label=CI)](https://github.com/gravity-ui/blog-constructor/actions/workflows/ci.yml?query=branch:main) [![CI](https://img.shields.io/github/actions/workflow/status/gravity-ui/blog-constructor/release.yml?branch=main&label=Release)](https://github.com/gravity-ui/blog-constructor/actions/workflows/release.yml?query=branch:main) [![storybook](https://img.shields.io/badge/Storybook-deployed-ff4685)](https://preview.gravity-ui.com/blog-constructor/)

## Install

```shell
npm install @gravity-ui/blog-constructor
```

## Blog-constructor

`Blog-constructor` is a library based on the [Page-constructor](https://github.com/gravity-ui/page-constructor) library for creating blog format web pages. Blog-constructor uses the [`custom`](https://github.com/gravity-ui/page-constructor#custom-blocks) prop from page-constructor to add the components needed for the blog.

### Documentation - [storybook](https://preview.gravity-ui.com/blog-constructor/)

### Getting started

The blog-constructor has both client components and server components for import. The blog pages is imported as a React component. To make sure it runs properly, wrap it in `BlogConstructorProvider`:

```jsx
import {BlogPage, BlogConstructorProvider} from '@gravity-ui/blog-constructor';

// Main blog page
<BlogConstructorProvider {...providerProps}>
    <BlogPage
        content={content}
        posts={posts}
        filters={filters}
        getPosts={handleGetPosts}
        settings={settings}
    />
</BlogConstructorProvider>

---

import {BlogPostPage, BlogConstructorProvider} from '@gravity-ui/blog-constructor';

// Post page
<BlogConstructorProvider {...providerProps}>
    <BlogPostPage
        content={content}
        post={post}
        suggestedPosts={suggestedPosts}
        settings={settings}
        shareOptions={shareOptions}
    />
</BlogConstructorProvider>

```

Documentation about [providerProps](./src/constructor/README.md).

### Analytics

Configure analytics once through the page `settings` prop:

```tsx
const settings = {
  analytics: {
    sendEvents,
    autoEvents: {
      enabled: true,
      extendedEvents: {
        prefix: 'SITE_BLOG_',
        counter: 'cross-site',
      },
    },
  },
};

<BlogPage {...props} settings={settings} />;
```

`enabled` controls generic Page Constructor events. The presence of `extendedEvents` independently
enables Blog Constructor's registered goals and decorates them with the configured prefix and
counter. Blog goals are owned by the library; do not add them to block or filter content. Custom
`analyticsEvents` remain unchanged and are sent after the internally supplied Blog event.

The legacy boolean `autoEvents` form remains supported by Page Constructor, but it does not enable
Blog extended events. Use the object configuration above when registered Blog goals are required.

Also blog-constructor have server components to help you transform your data if you need

```jsx
import {
  transformPost,
  sanitizeMeta,
  createReadableContent,
  transformPageContent,
} from '@gravity-ui/blog-constructor/server';
```

The `blog-constructor` is a `uikit-based` library, and we use an instance of `i18n` from uikit. To set up internationalization, you just need to use the `configure` from uikit:

```typescript
import {configure} from '@gravity-ui/uikit';

configure({
  lang: 'ru',
});
```

## Development

```bash
npm ci
npm run dev
```
