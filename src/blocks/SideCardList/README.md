A block component for displaying a list of partner cards.

## Props

| Property        | Type                                        | Required | Description                                            |
| :-------------- | :------------------------------------------ | :------- | :----------------------------------------------------- |
| `title`         | `string`                                    | No       | Title displayed above the card list                    |
| `items`         | `SideCard[]`                                | Yes      | Cards to display                                       |
| `paddingTop`    | `'xs' \| 's' \| 'sm' \| 'm' \| 'l' \| 'xl'` | No       | Top padding                                            |
| `paddingBottom` | `'xs' \| 's' \| 'sm' \| 'm' \| 'l' \| 'xl'` | No       | Bottom padding                                         |
| `paddingRight`  | `'xs' \| 's' \| 'sm' \| 'm' \| 'l' \| 'xl'` | No       | Declared by `SideCardListProps`; currently not applied |
| `paddingLeft`   | `'xs' \| 's' \| 'sm' \| 'm' \| 'l' \| 'xl'` | No       | Declared by `SideCardListProps`; currently not applied |

## SideCard

| Property      | Type                  | Required | Description                      |
| :------------ | :-------------------- | :------- | :------------------------------- |
| `image`       | `MediaProps['image']` | Yes      | Image media content for the card |
| `description` | `string`              | Yes      | YFM text displayed on the card   |
| `url`         | `string`              | Yes      | Card link URL                    |

## Usage

```tsx
import {SideCardList} from './SideCardList';

<SideCardList
  title="Side card list title"
  items={[
    {
      image: {
        src: 'https://example.com/image1.png',
        alt: 'Image 1 description',
      },
      description: 'Card 1',
      url: 'https://example.com/card1',
    },
    {
      image: {
        src: 'https://example.com/image2.png',
        alt: 'Image 2 description',
      },
      description: 'Card 2',
      url: 'https://example.com/card1',
    },
  ]}
/>;
```
