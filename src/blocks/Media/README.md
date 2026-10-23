| Property         | Type                                        | Required | Description                                       |
| :--------------- | :------------------------------------------ | :------- | :------------------------------------------------ |
| `className`      | `string`                                    | No       | Media component class name                        |
| `text`           | `string`                                    | No       | YFM caption displayed below the media             |
| `previewImg`     | `string`                                    | No       | Video preview image                               |
| `youtube`        | `MediaProps['youtube']`                     | No       | YouTube media content                             |
| `videoIframe`    | `MediaProps['videoIframe']`                 | No       | Video iframe source                               |
| `image`          | `MediaProps['image']`                       | No       | Image media content                               |
| `video`          | `MediaProps['video']`                       | No       | Video media content                               |
| `dataLens`       | `MediaProps['dataLens']`                    | No       | DataLens media content                            |
| `videoMicrodata` | `MediaProps['videoMicrodata']`              | No       | Structured video metadata                         |
| `paddingTop`     | `'xs' \| 's' \| 'sm' \| 'm' \| 'l' \| 'xl'` | No       | Top padding                                       |
| `paddingBottom`  | `'xs' \| 's' \| 'sm' \| 'm' \| 'l' \| 'xl'` | No       | Bottom padding                                    |
| `paddingRight`   | `'xs' \| 's' \| 'sm' \| 'm' \| 'l' \| 'xl'` | No       | Declared by `MediaProps`; forwarded to PC `Media` |
| `paddingLeft`    | `'xs' \| 's' \| 'sm' \| 'm' \| 'l' \| 'xl'` | No       | Declared by `MediaProps`; forwarded to PC `Media` |

The selected media property types come from `MediaProps` from `@gravity-ui/page-constructor`.
