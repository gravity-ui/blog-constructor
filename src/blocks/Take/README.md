| Property        | Type                                        | Required | Description                                     |
| :-------------- | :------------------------------------------ | :------- | :---------------------------------------------- |
| `text`          | `string`                                    | Yes      | YFM text content                                |
| `author`        | `AuthorItem`                                | Yes      | Author information                              |
| `color`         | `string`                                    | No       | Custom background color                         |
| `noBackground`  | `boolean`                                   | No       | Disables the background                         |
| `paddingTop`    | `'xs' \| 's' \| 'sm' \| 'm' \| 'l' \| 'xl'` | No       | Top padding                                     |
| `paddingBottom` | `'xs' \| 's' \| 'sm' \| 'm' \| 'l' \| 'xl'` | No       | Bottom padding                                  |
| `paddingRight`  | `'xs' \| 's' \| 'sm' \| 'm' \| 'l' \| 'xl'` | No       | Right padding                                   |
| `paddingLeft`   | `'xs' \| 's' \| 'sm' \| 'm' \| 'l' \| 'xl'` | No       | Left padding                                    |
| `qa`            | `string`                                    | No       | Declared by `TakeProps`; currently not consumed |

## `AuthorItem`

| Property      | Type                                         | Required | Description        |
| :------------ | :------------------------------------------- | :------- | :----------------- |
| `firstName`   | `string`                                     | Yes      | Author first name  |
| `secondName`  | `string`                                     | Yes      | Author second name |
| `description` | `string`                                     | No       | Author description |
| `avatar`      | `ThemeSupporting<ImageProps> \| JSX.Element` | No       | Author avatar      |
