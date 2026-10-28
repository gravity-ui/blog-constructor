| Property        | Type                                        | Required | Description                                      |
| :-------------- | :------------------------------------------ | :------- | :----------------------------------------------- |
| `fullWidth`     | `boolean`                                   | No       | Makes both columns occupy the full 12-column row |
| `mobileOrder`   | `string`                                    | No       | Supports `'straight'` and `'reverse'`            |
| `children`      | `React.ReactElement[]`                      | Yes      | Elements distributed between layout columns      |
| `paddingTop`    | `'xs' \| 's' \| 'sm' \| 'm' \| 'l' \| 'xl'` | No       | Top padding; defaults to `'xs'`                  |
| `paddingBottom` | `'xs' \| 's' \| 'sm' \| 'm' \| 'l' \| 'xl'` | No       | Bottom padding; defaults to `'xs'`               |
| `paddingRight`  | `'xs' \| 's' \| 'sm' \| 'm' \| 'l' \| 'xl'` | No       | Declared by `LayoutProps`; currently not applied |
| `paddingLeft`   | `'xs' \| 's' \| 'sm' \| 'm' \| 'l' \| 'xl'` | No       | Declared by `LayoutProps`; currently not applied |

In a constructor block configuration, `children` is an array of child blocks transformed into React elements before rendering. Set `column: 'left'` on a child to place it in the left column; every other value places it in the right column. The block schema restricts `mobileOrder` to `'straight' | 'reverse'`, while `LayoutProps` currently declares it as `string`.

On desktop, the default layout uses 8 of 12 columns on the left and 3 of 12 columns on the right with a one-column offset. With `fullWidth: true`, both columns occupy 12 columns and are stacked. With `mobileOrder: 'reverse'`, the right column is rendered before the left column on mobile.
