<p class="docs-warning">The chat.io API is currently in development and will change over time.</p>

# File sharing {docsify-ignore}
___

If you want the users to be able to send files, you need to set **ChatWindowEventsListener** on your **ChatWindowView** and allow the view to handle the activity result:

```js
@Override
public void onActivityResult(int requestCode, int resultCode, Intent data) {
    if (fullChatWindow != null) fullChatWindow.onActivityResult(requestCode, resultCode, data);
    super.onActivityResult(requestCode, resultCode, data);
}
```
