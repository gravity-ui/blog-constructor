## Block "Call to action"

| Property        | Type                                        | Required | Description                                   |
| :-------------- | :------------------------------------------ | :------- | :-------------------------------------------- |
| `items`         | `ContentBlockProps[]`                       | Yes      | Content rendered as call-to-action cards      |
| `paddingTop`    | `'xs' \| 's' \| 'sm' \| 'm' \| 'l' \| 'xl'` | No       | Top padding                                   |
| `paddingBottom` | `'xs' \| 's' \| 'sm' \| 'm' \| 'l' \| 'xl'` | No       | Bottom padding                                |
| `paddingRight`  | `'xs' \| 's' \| 'sm' \| 'm' \| 'l' \| 'xl'` | No       | Declared by `CTAProps`; currently not applied |
| `paddingLeft`   | `'xs' \| 's' \| 'sm' \| 'm' \| 'l' \| 'xl'` | No       | Declared by `CTAProps`; currently not applied |
| `qa`            | `string`                                    | No       | Base value for `data-qa` attributes           |

Each item supports the current `ContentBlockProps` fields from `@gravity-ui/page-constructor`: `title`, `titleId`, `text`, `textId`, `additionalInfo`, `links`, `buttons`, `size`, `colSizes`, `centered`, `theme`, `list`, and `controlPosition`.
