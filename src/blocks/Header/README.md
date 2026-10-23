| Property         | Type                                                                                     | Required | Description                                      |
| :--------------- | :--------------------------------------------------------------------------------------- | :------- | :----------------------------------------------- |
| `title`          | `string`                                                                                 | Yes      | Header title                                     |
| `overtitle`      | `string \| JSX.Element`                                                                  | No       | Content above the title                          |
| `description`    | `string`                                                                                 | No       | Header description                               |
| `additionalInfo` | `string`                                                                                 | No       | Additional header information                    |
| `buttons`        | `Pick<ButtonProps, 'url' \| 'text' \| 'theme' \| 'primary' \| 'size' \| 'extraProps'>[]` | No       | Header buttons                                   |
| `width`          | `'s' \| 'm' \| 'l'`                                                                      | No       | Header content width                             |
| `imageSize`      | `'s' \| 'm'`                                                                             | No       | Deprecated; image size now depends on `width`    |
| `offset`         | `'default' \| 'large'`                                                                   | No       | Deprecated header offset                         |
| `image`          | `ThemedImage`                                                                            | No       | Theme-aware header image                         |
| `video`          | `ThemedMediaVideoProps`                                                                  | No       | Theme-aware header video                         |
| `videoIframe`    | `HeaderBlockVideoIframe`                                                                 | No       | Iframe video configuration                       |
| `mediaView`      | `'fit' \| 'full'`                                                                        | No       | Header media layout                              |
| `centered`       | `boolean`                                                                                | No       | Centers header content                           |
| `background`     | `ThemedHeaderBlockBackground`                                                            | No       | Theme-aware header background                    |
| `theme`          | `'light' \| 'dark'`                                                                      | No       | Header theme                                     |
| `verticalOffset` | `'0' \| 's' \| 'm' \| 'l' \| 'xl'`                                                       | No       | Vertical content offset                          |
| `breadcrumbs`    | `HeaderBreadCrumbsProps`                                                                 | No       | Breadcrumb configuration                         |
| `status`         | `JSX.Element`                                                                            | No       | Status displayed in the header                   |
| `renderTitle`    | `(title: string) => React.ReactNode`                                                     | No       | Custom title renderer                            |
| `imageInGrid`    | `boolean`                                                                                | No       | Keeps the image in the grid; defaults to `true`  |
| `paddingTop`     | `'xs' \| 's' \| 'sm' \| 'm' \| 'l' \| 'xl'`                                              | No       | Top padding                                      |
| `paddingBottom`  | `'xs' \| 's' \| 'sm' \| 'm' \| 'l' \| 'xl'`                                              | No       | Bottom padding                                   |
| `paddingRight`   | `'xs' \| 's' \| 'sm' \| 'm' \| 'l' \| 'xl'`                                              | No       | Declared by `HeaderProps`; currently not applied |
| `paddingLeft`    | `'xs' \| 's' \| 'sm' \| 'm' \| 'l' \| 'xl'`                                              | No       | Declared by `HeaderProps`; currently not applied |

Most properties are inherited from `HeaderBlockProps` from `@gravity-ui/page-constructor`. At runtime, `title`, `description`, and `breadcrumbs` are populated or extended with data from `PostPageContext`.
