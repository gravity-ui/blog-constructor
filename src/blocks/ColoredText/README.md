| Property          | Type                                                                                   | Required | Description                                           |
| :---------------- | :------------------------------------------------------------------------------------- | :------- | :---------------------------------------------------- |
| `background`      | `{color?: ThemeSupporting<string>; image?: ThemeSupporting<string>; altText?: string}` | No       | Background color, image, and image alternative text   |
| `title`           | `TitleItemBaseProps \| string`                                                         | No       | Content title                                         |
| `titleId`         | `string`                                                                               | No       | Title element identifier                              |
| `text`            | `string`                                                                               | No       | Content text                                          |
| `textId`          | `string`                                                                               | No       | Text element identifier                               |
| `additionalInfo`  | `string`                                                                               | No       | Additional content                                    |
| `links`           | `LinkProps[]`                                                                          | No       | Content links                                         |
| `buttons`         | `(ButtonProps \| React.ReactNode)[]`                                                   | No       | Content buttons or custom React nodes                 |
| `size`            | `'s' \| 'm' \| 'l' \| 'xl'`                                                            | No       | Content size                                          |
| `colSizes`        | `GridColumnSizesType`                                                                  | No       | Content column sizes for breakpoints                  |
| `centered`        | `boolean`                                                                              | No       | Centers the content                                   |
| `theme`           | `'default' \| 'dark' \| 'light'`                                                       | No       | Content theme                                         |
| `list`            | `ContentItemProps[]`                                                                   | No       | Content list                                          |
| `controlPosition` | `'default' \| 'bottom'`                                                                | No       | Position of links and buttons                         |
| `paddingTop`      | `'xs' \| 's' \| 'sm' \| 'm' \| 'l' \| 'xl'`                                            | No       | Top padding                                           |
| `paddingBottom`   | `'xs' \| 's' \| 'sm' \| 'm' \| 'l' \| 'xl'`                                            | No       | Bottom padding                                        |
| `paddingRight`    | `'xs' \| 's' \| 'sm' \| 'm' \| 'l' \| 'xl'`                                            | No       | Declared by `ColoredTextProps`; currently not applied |
| `paddingLeft`     | `'xs' \| 's' \| 'sm' \| 'm' \| 'l' \| 'xl'`                                            | No       | Declared by `ColoredTextProps`; currently not applied |
| `qa`              | `string`                                                                               | No       | Base value for `data-qa` attributes                   |

`ThemeSupporting<string>` accepts either a string or a theme-specific value such as `{light: '...', dark: '...'}`. Content-related properties are inherited from `ContentBlockProps` from `@gravity-ui/page-constructor`.
