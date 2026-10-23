| Property        | Type                                       | Required | Description                                            |
| :-------------- | :----------------------------------------- | :------- | :----------------------------------------------------- |
| `text`          | `string`                                   | No       | Prompt message; defaults to the localized sign-in text |
| `actions`       | `ButtonProps[]`                            | No       | Prompt actions; defaults to a single sign-in button    |
| `openTimestamp` | `number`                                   | No       | Unix timestamp in milliseconds when the prompt opens   |
| `openDuration`  | `number`                                   | No       | Time in milliseconds for which the prompt stays open   |
| `className`     | `string`                                   | No       | Component class name                                   |
| `theme`         | `'grey' \| 'beige' \| 'white'`             | No       | Prompt theme                                           |
| `onClickSignIn` | `React.EventHandler<React.SyntheticEvent>` | No       | Sign-in button event handler                           |

All `PromptProps` properties are optional in `PromptSignInProps`. When `actions` is not provided, `onClickSignIn` is assigned to the default sign-in button.
