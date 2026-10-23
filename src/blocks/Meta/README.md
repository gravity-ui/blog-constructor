| Property        | Type                                        | Required | Description                                     |
| :-------------- | :------------------------------------------ | :------- | :---------------------------------------------- |
| `locale`        | `string`                                    | Yes      | Declared by `MetaProps`; currently not consumed |
| `theme`         | `'light' \| 'dark'`                         | No       | Breadcrumb theme; defaults to `'light'`         |
| `paddingTop`    | `'xs' \| 's' \| 'sm' \| 'm' \| 'l' \| 'xl'` | No       | Top padding; defaults to `'l'`                  |
| `paddingBottom` | `'xs' \| 's' \| 'sm' \| 'm' \| 'l' \| 'xl'` | No       | Bottom padding; defaults to `'l'`               |
| `paddingRight`  | `'xs' \| 's' \| 'sm' \| 'm' \| 'l' \| 'xl'` | No       | Declared by `MetaProps`; currently not applied  |
| `paddingLeft`   | `'xs' \| 's' \| 'sm' \| 'm' \| 'l' \| 'xl'` | No       | Declared by `MetaProps`; currently not applied  |
| `qa`            | `string`                                    | No       | Base value for `data-qa` attributes             |

Post information and breadcrumbs are populated from `PostPageContext`, `LocaleContext`, and `SettingsContext`.
