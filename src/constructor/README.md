# Blog Constructor Provider

It combines contexts that are used to push data into lower-level components. Each one is configured via the corresponding prop. About them further.

```jsx
interface BlogConstructorProviderProps {
  isMobile?: boolean;
  locale?: Locale;
  router?: RouterContextProps;
  theme?: ThemeValueType;
  device?: DeviceContextProps;
  analytics?: AnalyticsContextProps;
  settings?: SettingsContextProps;
  children?: React.ReactNode;
}
```

### `isMobile` - boolean flag

### `Locale` - information about site localization

```jsx
/*
    lang - 'ru' | 'en
    langName - string, 'English' for example
    pathPrefix - string, 'en' - for example
    code - string, 'en' - for example
*/
interface Locale
  extends Partial<Pick<LangData, 'langName'>>,
    Pick<LangData, 'lang'>,
    Partial<Pick<LangData, 'pathPrefix'>>,
    Partial<Pick<LocaleData, 'code'>> {}
```

### `Router` - information for page routing

```jsx
type Query = Record<string, number | string | null>;

interface RouterContextProps {
  pathname: string;
  as: string;
  hostname: string;
  query?: Query;
  updateQueryCallback: (query: Query) => void;
}
```

`as` - this value will be used as url to post for "Share > Copy link" button

**!!! Most important thing** - your `updateQueryCallback` callback should update the routing in replace mode and with the shallow option

### `Theme` - theme settings

```jsx
type ThemeValueType = 'light' | 'dark';
```

### `Device` - information about device

```jsx
import {IBrowser, IDevice} from 'ua-parser-js';

export interface DeviceContextProps {
  device?: IDevice;
  browser?: IBrowser;
  isRobot: boolean;
}
```

### `Analytics` - analytics settings

```jsx
interface AnalyticsContextProps {
  sendEvents?: (events: AnalyticsEvent[]) => void;
  autoEvents?: boolean;
}
```

**!!! Important thing** - We throw analytics settings in blog constructor provide, if we need analytics from only-blog components. If we need analytics in page-constructor blocks we need to throw analytics settings in [page settings props](../containers/BlogPage/README.md)

### `Settings` - blog settings

```jsx
interface SettingsContextProps {
  addNavigationLinkForPages?: boolean;
}
```

**!!! Most important thing** - `addNavigationLinkForPages` is option to cover pagination buttons with a `<a>` tag and add a `href` link for page navigation

### `Children` - children react component
