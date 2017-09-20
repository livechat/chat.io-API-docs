---
title: Server => Client methods
weight: 30
---

# Methods: Server => Client
___

### Overview
Server => Client methods are used for keeping application state up-to-date. They are available only in `websocket` transport.

### Incoming chat thread

| Action | Payload |
|--------|------------------|
| `incoming_chat_thread` |
|  | `thread` |

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
|  | `updated_users` |

##### Example response payload
```js
{
  "chat_id": "a0c22fdd-fb71-40b5-bfc6-a8a0bc3117f5",
  "updated_users": {
    "customers": {
      "added": [
        // array of "User > Customer" objects
      ],
      "removed_ids": []
    },
    "agents": {
      "added": [
        // array of "User > Agent" objects
      ],
      "removed_ids": ["75a90b82-e6a4-4ded-b3eb-cb531741ee0d"]
    },
    "supervisors": {
      "added": [
        // array of "User > Supervisor" objects
      ],
      "removed_ids": ["85f3bfc9-06c1-434e-958b-2a5239b07de8"]
    }
  }
}
```

### Incoming event

| Action | Payload |
|--------|------------------|
| `incoming_event` |
|  | `chat_id` |
|  | `event` |

##### Example response payload
```js
{
  "chat_id": "85f3bfc9-06c1-434e-958b-2a5239b07de8",
  "event": {
    // "Event" object
  }
}
```

### Incoming broadcast

| Action | Payload |
|--------|------------------|
| `incoming_broadcast` |
|  | `author_id` |
|  | `content` |

##### Example response payload

```js
{
  "author_id": "jack@gmail.com",
  "content": {
    "example": {
      "nested": "json"
    }
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

##### Example response payload
```js
{
  "chat_id": "85f3bfc9-06c1-434e-958b-2a5239b07de8",
  "typing_indicator": {
    // "Typing indicator" object
  }
}
```

### Incoming sneak peek

| Action | Payload |
|--------|------------------|
| `incoming_sneak_peek` |
|  | `chat_id` |
|  | `sneak_peek` |

##### Example response payload
```js
{
  "chat_id": "85f3bfc9-06c1-434e-958b-2a5239b07de8",
  "sneak_peek": {
    // "Sneak peek" object
  }
}
```

### Customer banned

| Action | Payload |
|--------|------------------|
| `customer_banned` |
|  | `customer_id` |
|  | `ban.days` |

##### Example response payload
```js
{
 "customer_id": "b7eff798-f8df-4364-8059-649c35c9ed0c",
 "ban": {
  "days": 5
 }
}
```

### Customer unbanned

| Action | Payload |
|--------|------------------|
| `customer_unbanned` |
|  | `customer_id` |

##### Example response payload
```js
{
 "customer_id": "b7eff798-f8df-4364-8059-649c35c9ed0c"
}
```

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
  "thread_id": "b0c22fdd-fb71-40b5-bfc6-a8a0bc3117f6",
  "user_id": "75a90b82-e6a4-4ded-b3eb-cb531741ee0d" // optional
}
```

### Chat scopes updated

| Action | Payload |
|--------|------------------|
| `chat_scopes_updated` |
|  | `chat_id` |
|  | `scopes_added` |
|  | `scopes_removed` |

##### Example response payload
```js
{
  "chat_id": "a0c22fdd-fb71-40b5-bfc6-a8a0bc3117f5",
  "scopes_added": {
    // "Scopes" object
  },
  "scopes_removed": {
    // "Scopes" object
  }
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

### Agent updated

| Action | Payload |
|--------|------------------|
| `agent_updated` |
|  | `agent_id` |
|  | `routing_status` |

##### Example response payload
```js
{
  "agent_id": "75a90b82-e6a4-4ded-b3eb-cb531741ee0d",
  "routing_status": "accepting_chats"
}
```

### Agent disconnected

| Action | Payload |
|--------|------------------|
| `agent_disconnected` |
|  | `reason` |

##### Example response payload
```js
{
  "reason" : "access_token_revoked"
}
```

##### Possible reasons
| Type | Notes |
|--------|----------------|
| `access_token_revoked` | Agent access token has been revoked |
| `license_expired` | License has expired |

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
      "score": {
        "value": 1
      },
      "comment": {
        "value": "Very good, veeeery good"
      }
    },
    ...
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
      "value": {
        "value": 1
      },
      "comment": {
        "value": "Very good, veeeery good"
      }
    },
    ...
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