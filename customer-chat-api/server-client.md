<p class="docs-warning">The chat.io API is currently in development and will change over time.</p>

# Methods: Server => Client {docsify-ignore}
___

### Overview

Server => Client methods are used for keeping application state up-to-date. They are available only in `websocket` transport.

### Incoming chat thread

| Action | Payload |
|--------|------------------|
| `incoming_chat_thread` |
|  | `chat` |

##### Example response payload
```js
{
  "chat": {
    "id": "a0c22fdd-fb71-40b5-bfc6-a8a0bc3117f5",
    "users": [
      // array of "User" objects
    ],
    "properties": {
      "source": {
        "type": "facebook"
      },
      ...
    },
    "thread": {
      // "Thread" object
    }
  }
}
```

### Chat users updated

| Action | Payload |
|--------|------------------|
| `chat_users_updated` |
|  | `chat_id` |
|  | `updated_users` |

##### Example response payload
```js
{
  "chat_id" : "88888898-f88f-4321-1234-123123",
  "updated_users": {
    "added": [
      // User
      ],
    "removed_ids": [ "123", "1234" ]
  }
}
```

### Incoming event

| Action             | Payload     |
|--------------------|-------------|
| `incoming_event`   |             |
|                    | `chat_id`   |
|                    | `thread_id` |
|                    | `event`     |

##### Example response payload
```js
{
  "chat_id" : "75a90b82-e6a4-4ded-b3eb-cb531741ee0a",
  "thread_id": "a0c22fdd-fb71-40b5-bfc6-a8a0bc3117f5",
  "event": {
    // "Event" object
  }
}
```

### Event marked as seen

| Action | Payload |
|--------|------------------|
| `event_marked_as_seen` |
|  | `chat_id` |
|  | `event_id` |
|  | `user_id` |

##### Example response payload
```js
{
  "chat_id": "a0c22fdd-fb71-40b5-bfc6-a8a0bc3117f5",
  "event_id": "0affb00a-82d6-4e07-ae61-56ba5c36f743",
  "user_id": "75a90b82-e6a4-4ded-b3eb-cb531741ee0d"
}
```

### Incoming typing indicator

| Action | Payload |
|--------|------------------|
| `incoming_typing_indicator` |
|  | `chat_id` |
|  | `typing_indicator` |

##### Example request payload
```js
{
  "chat_id" : "123-123-123-123",
  "typing_indicator": {
    // "Typing indicator" object
  }
}
```

### Customer disconnected

| Action | Payload |
|--------|------------------|
| `customer_disconnected` |
|  | `reason` |

##### Example response payload
```js
{
  "reason" : "customer_banned"
}
```

##### Possible reasons
| Type | Notes |
|--------|----------------|
| `customer_banned` | Customer has been banned |

### Thread closed

| Action | Payload |
|--------|------------------|
| `thread_closed` |
|  | `chat_id` |
|  | `thread_id` |
|  | `user_id` (optional) |

##### Example response payload
```js
{
  "chat_id": "a0c22fdd-fb71-40b5-bfc6-a8a0bc3117f5",
  "thread_id": "a0c22fdd-fb71-40b5-bfc6-a8a0bc3117f5",
  "user_id": "75a90b82-e6a4-4ded-b3eb-cb531741ee0d" // optional
}
```

### Customer updated

| Action | Payload |
|--------|------------------|
| `customer_updated` |
|  | `chat_id` |
|  | `customer` |

##### Example response payload
```js
{
  "chat_id": "a0c22fdd-fb71-40b5-bfc6-a8a0bc3117f5",
  "customer": {
    // "User > Customer" object
  }
}
```

### Chat properties updated

| Action | Payload |
|--------|------------------|
| `chat_properties_updated` |
|  | `chat_id` |
|  | `properties` |

##### Example payload
```js
{
  "chat_id" : "123-123-123-123",
  "properties": {
    "rating": {
      "comment": {
        "value": "gooood"
      }
    }
  }
}
```


### Chat thread properties updated

| Action | Payload |
|--------|------------------|
| `chat_thread_properties_updated` |
|  | `chat_id` |
|  | `thread_id` |
|  | `properties` |

##### Example payload
```js
{
  "chat_id" : "123-123-123-123",
  "thread_id" : "E2WDHA8A",
  "properties": {
    "rating": {
      "comment": {
        "value": "goooood"
      }
    }
  }
}
```

### Last seen timestamp updated

| Action | Payload |
|--------|------------------|
| `last_seen_timestamp_updated` |
|  | `user_id` |
|  | `chat_id` |
|  | `timestamp` |

##### Example response payload
```js
{
  "user_id": "75a90b82-e6a4-4ded-b3eb-cb531741ee0d",
  "chat_id": "123-123-123-123",
  "timestamp": 123456789
}
```
