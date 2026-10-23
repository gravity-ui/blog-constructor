| Property        | Type                                        | Required | Description                                       |
| :-------------- | :------------------------------------------ | :------- | :------------------------------------------------ |
| `className`     | `string`                                    | No       | Component class name                              |
| `authorId`      | `number \| string`                          | Yes      | Author identifier in `PostPageContext`            |
| `image`         | `string`                                    | Yes      | Fallback image used when the author has no avatar |
| `paddingTop`    | `'xs' \| 's' \| 'sm' \| 'm' \| 'l' \| 'xl'` | No       | Top padding                                       |
| `paddingBottom` | `'xs' \| 's' \| 'sm' \| 'm' \| 'l' \| 'xl'` | No       | Bottom padding                                    |
| `paddingRight`  | `'xs' \| 's' \| 'sm' \| 'm' \| 'l' \| 'xl'` | No       | Declared by `AuthorProps`; currently not applied  |
| `paddingLeft`   | `'xs' \| 's' \| 'sm' \| 'm' \| 'l' \| 'xl'` | No       | Declared by `AuthorProps`; currently not applied  |
| `qa`            | `string`                                    | No       | Base value for `data-qa` attributes               |

Author information is resolved by `authorId` from `PostPageContext`. The block is not rendered when the author cannot be resolved or does not have both a first and a second name.
