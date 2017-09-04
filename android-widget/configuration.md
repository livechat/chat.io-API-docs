<p class="docs-warning">The chat.io API is currently in development and will change over time.</p>

# Configuration {docsify-ignore}
___

The configuration is very simple - just use **ChatWindowConfiguration.java** constructor. Note that the licence number is mandatory.

```js
configuration = new ChatWindowConfiguration(
	"your_licence_number", 
	"group_id", 
	"Visitor name", 
	"visitor@email.com", 
	customParamsMap
);
```