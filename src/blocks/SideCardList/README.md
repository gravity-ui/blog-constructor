A block component for displaying a list of partner cards.

## Props

| Prop          | Type       | Description                                     |
| ------------- | ---------- | ----------------------------------------------- |
| className     | string     | Optional CSS class name                         |
| title         | string     | Optional title to display above the card list   |
| items         | SideCard[] | Array of card items                             |
| paddingTop    | string     | Top padding size (xxs, xs, s, m, l, xl, xxl)    |
| paddingBottom | string     | Bottom padding size (xxs, xs, s, m, l, xl, xxl) |
| qa            | string     | QA attribute for testing                        |

## SideCard

| Prop        | Type                | Description                      |
| ----------- | ------------------- | -------------------------------- |
| image       | MediaProps['image'] | Image media content for the card |
| description | string              | Text to display on the card      |
| url         | string              | Link URL for the card            |

## Usage

```tsx
import {SideCardList} from './SideCardList';

<SideCardList
  className="custom-class"
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
