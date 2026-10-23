| Property        | Type                                        | Required | Description                                        |
| :-------------- | :------------------------------------------ | :------- | :------------------------------------------------- |
| `className`     | `string`                                    | No       | Declared by `SuggestProps`; currently not consumed |
| `posts`         | `PostData[]`                                | Yes      | Declared by `SuggestProps`; currently not consumed |
| `paddingTop`    | `'xs' \| 's' \| 'sm' \| 'm' \| 'l' \| 'xl'` | No       | Top padding; defaults to `'l'`                     |
| `paddingBottom` | `'xs' \| 's' \| 'sm' \| 'm' \| 'l' \| 'xl'` | No       | Bottom padding; defaults to `'l'`                  |
| `paddingRight`  | `'xs' \| 's' \| 'sm' \| 'm' \| 'l' \| 'xl'` | No       | Declared by `SuggestProps`; currently not applied  |
| `paddingLeft`   | `'xs' \| 's' \| 'sm' \| 'm' \| 'l' \| 'xl'` | No       | Declared by `SuggestProps`; currently not applied  |

The rendered posts currently come from `PostPageContext.suggestedPosts`. The block is not rendered when that array is empty.
