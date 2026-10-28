| Property        | Type                                        | Required | Description                                    |
| :-------------- | :------------------------------------------ | :------- | :--------------------------------------------- |
| `formData`      | `FormBlockData`                             | Yes      | Yandex or HubSpot form configuration           |
| `border`        | `'shadow' \| 'line' \| 'none'`              | No       | Form border; defaults to `'shadow'`            |
| `paddingTop`    | `'xs' \| 's' \| 'sm' \| 'm' \| 'l' \| 'xl'` | No       | Top padding                                    |
| `paddingBottom` | `'xs' \| 's' \| 'sm' \| 'm' \| 'l' \| 'xl'` | No       | Bottom padding                                 |
| `paddingRight`  | `'xs' \| 's' \| 'sm' \| 'm' \| 'l' \| 'xl'` | No       | Declared by `FormProps`; currently not applied |
| `paddingLeft`   | `'xs' \| 's' \| 'sm' \| 'm' \| 'l' \| 'xl'` | No       | Declared by `FormProps`; currently not applied |
| `qa`            | `string`                                    | No       | Declared by `FormProps`; currently not applied |

`FormBlockData` is a union of the following shapes:

```ts
type FormBlockData =
  | {yandex: ThemeSupporting<YandexFormProps>}
  | {hubspot: ThemeSupporting<HubspotFormProps>};
```
