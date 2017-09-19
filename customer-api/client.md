## Objects
Objects are standardized data formats that are used in API requests and responses.

You don't need to wonder if you should use `chat_id` or `chatID` parameter in your API call. Instead, just look up the `Chat` object structure to know how to use it in the request or when parsing the response.

Objects can include other objects. For example, `Chat` object may return `users` array which is a list of `User` objects.

### Thread
```js
{
  "id": "a0c22fdd-fb71-40b5-bfc6-a8a0bc3117f5",
  "active": true,
  "order" : 123123,
  "user_ids": ["john@gmail.com"],
  "events": [
    // array of "Event" objects
  ],
  "properties": {
    // "Properties" object
  }
}
```
* `active` possible values:
  * `true` (thread still active)
  * `false` (thread no longer active)

* `properties` is optional


### Chat
```js
{
  "id": "a0c22fdd-fb71-40b5-bfc6-a8a0bc3117f5",
  "users": [
    // array of "User" objects
  ],
  "threads": [
    // array of "Thread" objects
  ],
  "properties": {
    // "Properties" object
  }
}
```
* `properties` is optional

### User > Customer
```js
{
  "id": "b7eff798-f8df-4364-8059-649c35c9ed0c",
  "type": "customer",
  "name": "John Smith",
  "email": "john@gmail.com",
  "present": true,
  "properties": {
    "custom property name": "custom property value"
  },
  "last_seen_timestamp": 1473433500
}
```

### User > Agent
```js
{
  "id": "75a90b82-e6a4-4ded-b3eb-cb531741ee0d",
  "type": "agent",
  "name": "Support Team",
  "avatar": "cdn.livechatinc.com/avatars/1.png",
  "present": true,
  "last_seen_timestamp": 1473433500
}
```

### Event > Message
```js
{
  "id": "0affb00a-82d6-4e07-ae61-56ba5c36f743", // generated by server side
  "custom_id": "12312.301231238591134",
  "order": 1, // generated by server side
  "type": "message",
  "author_id": "b7eff798-f8df-4364-8059-649c35c9ed0c",
  "timestamp": 1473433500, // generated by server side
  "text": "hello there",
  "properties": {
    // "Properties" object
  }
}
```
* `custom_id` is optional
* `properties` is optional

### Event > System message

Cannot be sent by user

```js
{
  "id": "0affb00a-82d6-4e07-ae61-56ba5c36f743", // generated by server side
  "order": 1, // generated by server side
  "type": "system_message",
  "timestamp": 1473433500, // generated by server side
  "text": "hello there",
  "system_message_type": "thread_archived"
}
```

### Event > Annotation

Does not create new thread, just adds event to last thread without extending thread duration.

```js
{
  "id": "0affb00a-82d6-4e07-ae61-56ba5c36f743", // generated by server side
  "custom_id": "12312.301231238591134",
  "order": 1, // generated by server side
  "type": "annotation",
  "author_id": "b7eff798-f8df-4364-8059-649c35c9ed0c",
  "timestamp": 1473433500, // generated by server side
  "text": "Example annotation",
  "annotation_type": "rating",
  "properties": {
    // "Properties" object
  }
}
```
* `custom_id` is optional
* `text` is optional
* `properties` is optional

### Event > Filled form
```js
{
  "id": "0affb00a-82d6-4e07-ae61-56ba5c36f743", // generated by server side
  "custom_id": "12312.301231238591134",
  "order": 4, // generated by server side
  "type": "filled_form",
  "author_id": "b7eff798-f8df-4364-8059-649c35c9ed0c",
  "timestamp": 1473433500,  // generated by server side
  "properties": {
    // "Properties" object
  }
  "fields": [
  {
    "type": "text",
    "name": "name",
    "label": "Your name",
    "required": true,
    "value": "Jan Kowalski"
  },
  {
    "type": "email",
    "name": "email",
    "label": "Your email",
    "required": true,
    "value": "jan.kowalski@gmail.com"
  },
  {
    "type": "radio",
    "name": "purpose",
    "label": "Chat purpose",
    "required": true,
    "options": [{
      "label": "Support",
      "value": "support",
      "checked": true
    },
    {
      "label": "Sale",
      "value": "sale",
      "checked": false
    }],
  },
  {
    "type": "checkbox",
    "name": "industry",
    "label": "Company industry",
    "required": true,
    "options": [{
      "label": "automotive",
      "value": "automotive",
      "checked": true
    }, {
      "label": "IT",
      "value": "it",
      "checked": true
    }],
  },
  {
    "type": "select",
    "name": "country",
    "label": "Country",
    "required": true,
    "options": [{
      "label": "USA",
      "value": "usa",
      "checked": false
    }, {
      "label": "Poland",
      "value": "pl",
      "checked": true
    }, {
      "label": "Poland",
      "value": "pl",
      "checked": false
    }]
  }]
}
```
* `custom_id` is optional
* `properties` is optional

### Event > File
```js
{
  "id": "0affb00a-82d6-4e07-ae61-56ba5c36f743", // generated by server side
  "custom_id": "12312.301231238591134",
  "order": 1, // generated by server side
  "type": "file",
  "author_id": "b7eff798-f8df-4364-8059-649c35c9ed0c",
  "timestamp": 1473433500, // generated by server side
  "properties": {
    // "Properties" object
  }
  "name": "image25.png",
  "url": "https://domain.com/asdsfdsf.png",
  "content_type": "image/png",
  "size": 123444,
  "width": 640,
  "height": 480
}
```
* `custom_id` is optional
* `properties` is optional

### Event > Custom

```js
{
  "id": "0affb00a-82d6-4e07-ae61-56ba5c36f743", // generated by server side
  "custom_id": "12312.301231238591134",
  "order": 1, // generated by server side
  "type": "custom",
  "author_id": "b7eff798-f8df-4364-8059-649c35c9ed0c",
  "timestamp": 1473433500, // generated by server side
  "content": {
    "custom": {
      "nested": "json"
    }
  },
  "properties": {
    // "Properties" object
  }
}
```

* `custom_id` is optional
* `properties` is optional

### Typing indicator
```js
{
  "author_id": "b7eff798-f8df-4364-8059-649c35c9ed0c",
  "timestamp": 1473433500,
  "is_typing": true
}
```

### Sneak peek
```js
{
  "author_id": "b7eff798-f8df-4364-8059-649c35c9ed0c",
  "timestamp": 1473433500,
  "text": "hello there"
}
```

### Scopes
Empty object designates no scope, it means that all agents can see it.

```js
{
  "scopes": {
    "groups": [1, 2]
  }
}
```

### Properties
General format:
```js
{
  "<property_namespace>": {
     "<property_name>": {
       "value": <property_value>  // <property_value> type depends on the property configuration
     }
  }
}
```

Example properties:
```js
{
  "properties": {
    "rating": {
      "score": {
        "value": 1
      },
      "comment": {
        "value": "rated good!"
      }
    },
    "routing": {
      "idle": {
        "value": false
      }
    }
  }
}
```