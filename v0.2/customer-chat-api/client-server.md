---
title: "Client => Server methods"
weight: 40
---

# Methods: Client => Server
___

### Login

| Action | Request object | Required | Notes |
|--------|----------------|----------|-------|
| `login` | | | |
| | `last_chats_limit` | No | Default is 1, maximum is 25 |
| | `last_threads_limit` | No | Default is 10, maximum is 25 |
| | `customer.monitoring.page.url` | No | |
| | `customer.monitoring.page.title` | No | |
| | `customer.monitoring.page.referrer` | No | |
| | `customer.monitoring.timezone` | No | |
| | `customer.name` | No | |
| | `customer.email` | No | |
| | `customer.properties` | No | map in `"key": "value"` format |

##### Example request payload
```js
{
  "customer": {
    "monitoring": {
      "page": {
        "url": "https://www.livechatinc.com/"
      }
    }
  }
}
```

##### Example response payloads
###### Success
```js
{
    "customer_id": "a0c22fdd-fb71-40b5-bfc6-a8a0bc3117f5",
    "static_config_path": "s3.amazonaws.com/livechat/license/123/config.json",
    "last_chats_summary": [
        {
            "id": '123',
            "order": 343544565,
            "users": [
                {
                    "id": "75a90b82-e6a4-4ded-b3eb-cb531741ee0d",
                    "type": "agent",
                    "name": "Support Team",
                    "email": "john@gmail.com",
                    "avatar": "cdn.livechatinc.com/avatars/1.png",
                    "last_seen_timestamp": 1473433500
                }
            ],
            "properties": {
                // "Properties" object
            },
            "scopes": {
                // "Scopes" object
            },
                        "last_event_per_type": { // last event of each type in last thread
              "thread_id": "a0c22fdd-fb71-40b5-bfc6-a8a0bc3117f5",
              "events": [{
                               // "Event > Message" object
                            }, {
                              // "Event > System message" object
                            },
                            ...
              ]
                        },
            "last_threads_summary": [
                {
                    "id": "a0c22fdd-fb71-40b5-bfc6-a8a0bc3117f5",
                    "order": 129846129847,
                    "events_count": 34
                },
                {
                    "id": "b0c22fdd-fb71-40b5-bfc6-a8a0bc3117f6",
                    "order": 129846129848,
                    "events_count": 12
                }
            ],
            "total_threads": 4
        }
    ],
    "total_chats": 14
}
```

### Get chats summary

| Action | Request object | Required | Notes |
|--------|----------------|----------|-------|
| `get_chats_summary` | | |
| | `pagination.page` | No | Default is 1 |
| | `pagination.limit` | No | Default is 10, maximum is 25 |


##### Example request payload
```js
{
  "pagination": {
    "page": 2,
    "limit": 1
  }
}
```

##### Example response payloads
###### Success
```js
{
    "chats_summary": [
        {
            "id": '123',
            "users": [
              // array of "User" objects
            ],
            "properties": {
              // "Properties" object
            },
            "scopes": {
              // "Scopes" object
            },
            "last_event": {
                "thread_id": "a0c22fdd-fb71-40b5-bfc6-a8a0bc3117f5",
                "event": {
                    // "Event" object
                }
            }
        }
    ],
    "pagination": {
        "page": 2,
        "total": 3
    }
}
}
```


### Get chat threads

| Action | Request object | Required |
|--------|----------------|----------|
| `get_chat_threads` | |
| | `chat_id` | Yes |
| | `thread_ids` | Yes |


##### Example request payload
```js
{
  "chat_id": "a0c22fdd-fb71-40b5-bfc6-a8a0bc3117f5",
  "thread_ids": ["a0c22fdd-fb71-40b5-bfc6-a8a0bc3117f5"]
}
```

##### Example response payloads
###### Success
```js
{
  "chat": {
    "id": "a0c22fdd-fb71-40b5-bfc6-a8a0bc3117f5",
    "users": [
      // array of "User" objects
    ],
    "properties": {
      // "Properties" object
    },
    "scopes": {
      // "Scopes" object
    },
    "threads": [
      // Thread object
    ]
  }
}
```

### Get chat threads summary

| Action | Request object | Required | Notes |
|--------|----------------|----------|-------|
| `get_chat_threads_summary` | | |
| | `chat_id` | Yes |
| | `pagination.offset` | No | Default is 0 |
| | `pagination.limit` | No | Default is 25, maximum is 1000 |



##### Example request payload
```js
{
  "chat_id": "a0c22fdd-fb71-40b5-bfc6-a8a0bc3117f5",
  "pagination": {
    "offset": 0,
    "limit": 100
  }
}
```

##### Example response payloads
###### Success
```js
{
  "chat": {
    "id": "a0c22fdd-fb71-40b5-bfc6-a8a0bc3117f5",
    "threads_summary": [
      {
        "thread_id": "a0c22fdd-fb71-40b5-bfc6-a8a0bc3117f5",
        "order": 129846129847
      },
      {
        "thread_id": "b0c22fdd-fb71-40b5-bfc6-a8a0bc3117f6",
        "order": 129846129848
      }
    ]
  },
  "pagination": {
    "offset": 0,
    "total": 2
  }
}
```


### Start chat
Starts a chat with given routing scope.

Note: customer details must be sent to server before the chat can be started (see [update customer](#update-customer) method).

| Action | Request object | Required | Notes |
|--------|----------------|----------|---|
| `start_chat` |
| | `chat.scopes` | No | Chat scope to set, defaults to all agents |
| | `chat.events` | No | Initial chat events array |
| | `chat.properties` | No | Initial chat properties |
| | `chat.thread.properties` | No | Initial chat thread properties |

##### Example request payload
```js
{
  "chat": {
    "scopes": {
      "groups": [1]
    },
    "properties": {
      "source": {
        "type": "facebook"
      }
    }
    "thread": {
      "events": [{
        "type": "message",
        "custom_id": "12312.301231238591134",
        "text": "hello there"
      }, {
        "type": "system_message",
        "custom_id": "12312.301231238591135",
        "text": "hello there"
      }],
      "properties": {
        "source": {
          "type": "facebook"
        },
        ...
      }
    }
  }
}
```

##### Example response payloads
###### Success
```js
{
  "chat": {
    "id": "a0c22fdd-fb71-40b5-bfc6-a8a0bc3117f5",
    "users": [
      // array of "User" objects
    ],
    "properties": {
      // "Properties" object
    },
    "scopes": {
      // "Scopes" object
    },
    "thread": {
      // "Thread" object
    }
  }
}
```

###### Error
```js
{
  "error": {
    "code": 123,
    "message": "Chat cannot be started."
  }
}
```

### Send event

| Action         | Request object | Required | Notes                                              |
| ---------------|----------------|----------|----------------------------------------------------|
| `send_event`   |                |          |                                                    |
|                | `chat_id`      | Yes      | Id of the chat that we want to send the message to |
|                | `event`        | Yes      | Event object                                       |

##### Example request payload
```js
{
  "chat_id": "a0c22fdd-fb71-40b5-bfc6-a8a0bc3117f5",
  "event": {
    "type": "message",
    "text": "hello world",
    "custom_id": "12345-bhdsa",
  }
}
```

##### Example response payloads
###### Success
```js
{
  "thread_id": "a0c22fdd-fb71-40b5-bfc6-a8a0bc3117f5",
  "event": {
    // "Event" object
  }
}
```

###### Error
```js
{
  "error": {
    "code": 123,
    "message": "You cannot send the message in this chat."
  }
}
```

### Send sneak peek

| Action | Request object | Required | Notes |
| -------|----------------|----------|-------|
| `send_sneak_peek` ||||
| | `chat_id` | Yes | Id of the chat that we want to send the sneak peek to |
| | `sneak_peek_text` | Yes | Sneak peek text |

##### Example request payload
```js
{
  "chat_id": "a0c22fdd-fb71-40b5-bfc6-a8a0bc3117f5",
  "sneak_peek_text": "hello world"
}
```

##### Example response payloads
###### Success
No success response.

###### Error
```js
{
  "error": {
    "code": 123,
    "message": "You cannot send the sneak peek in this chat."
  }
}
```

### Close thread
Closes the thread. Nobody will be able to send any messages to this thread anymore.

| Action | Request object | Required | Notes |
| -------|----------------|----------|-------|
| `close_thread` ||||
| | `chat_id` | Yes ||
| | `thread_id` | ? | TODO (v2) |

##### Example request payload
```js
{
  "chat_id": "a0c22fdd-fb71-40b5-bfc6-a8a0bc3117f5",
  "thread_id": "a0c22fdd-fb71-40b5-bfc6-a8a0bc3117f5"
}
```

##### Example response payloads
###### Success
No payload.

###### Error
```js
{
  "error": {
    "code": 123,
    "message": "You are not allowed to close this chat."
  }
}
```

### Update chat scopes

| Action | Request object | Required | Notes |
| -------|----------------|----------|-------|
| `update_chat_scopes` ||||
| | `chat_id` | Yes ||
| | `add_scopes` | No | Chat scopes to add |
| | `remove_scopes` | No | Chat scopes to remove |

##### Example request payload
```js
{
  "chat_id": "a0c22fdd-fb71-40b5-bfc6-a8a0bc3117f5",
  "add_scopes": {
    "groups": [1, 2]
  },
  "remove_scopes": {
    "groups": [3]
  }
}
```

##### Example response payloads
###### Success
No payload.

###### Error
```js
{
  "error": {
    "code": 123,
    "message": "You are not allowed to close this chat."
  }
}
```

### Update customer
Updates customer details and properties.

| Action | Request object | Required | Notes |
| -------|----------------|----------|-------|
| `update_customer` ||||
| | `customer.name` | No | |
| | `customer.email` | No | |
| | `customer.monitoring.page.title` | No | |
| | `customer.monitoring.page.url` | No | |
| | `customer.monitoring.timezone` | No | |
| | `customer.properties` | No | Map in `"key": "value"` format|

##### Example request payload
```js
{
  "customer": {
    "name": "Mary Brown",
    "email": "mary.brown@gmail.com",
    "monitoring": {
      "page": {
        "url": "https://www.livechatinc.com/",
        "title": "LiveChat - Homepage"
      },
      "timezone": "-2"
    },
    "properties": {
      "key1": "val1"
    }
  }
}
```

##### Example response payloads
###### Success
```js
{
  "customer": {
    // "User > Customer" object
  }
}
```

###### Error
```js
{
  "error": {
    "code": 123,
    "message": "You are not allowed to update this customer."
  }
}
```

### Update chat properties

| Action                   | Request object | Required | Notes                                           |
| -------------------------|----------------|----------|-------------------------------------------------|
| `update_chat_properties` |                |          |                                                 |
|                          | `chat_id`      | Yes      | Id of the chat that we want to set property for |
|                          | `properties`   | Yes      | Chat properties to set                          |

##### Example request payload
```js
{
  "chat_id": "a0c22fdd-fb71-40b5-bfc6-a8a0bc3117f5",
  "properties": {
    "rating": {
      "score": 1,
      "comment": "Very good, veeeery good"
    },
    ...
  }
}
```



##### Example response payloads
###### Success
No payload.

###### Error
```js
{
  "error": {
    "code": 123,
    "message": "You are not allowed to set chat properties."
  }
}
```

### Update chat thread properties

| Action                          | Request object | Required | Notes                                              |
| --------------------------------|----------------|----------|----------------------------------------------------|
| `update_chat_thread_properties` |                |          |                                                    |
|                                 | `chat_id`      | Yes      | Id of the chat that we want to set property for    |
|                                 | `thread_id`    | Yes      | Id of the thread that we want to set property for  |
|                                 | `properties  ` | Yes      | Chat properties to set                             |

##### Example request payload
```js
{
  "chat_id": "a0c22fdd-fb71-40b5-bfc6-a8a0bc3117f5",
  "thread_id": "EW2WQSA8",
  "properties": {
    "rating": {
      "score": 1,
      "comment": "Very good, veeeery good"
    },
    ...
  }
}
```


##### Example response payloads
###### Success
No payload.

###### Error
```js
{
  "error": {
    "code": 123,
    "message": "You are not allowed to set chat thread properties."
  }
}
```

### Update last seen timestamp

| Action | Request object | Required | Notes |
| -------|----------------|----------|-------|
| `update_last_seen_timestamp` |||
| | `timestamp` | No | |


##### Example request payload
```js
{
  "timestamp":  123456789,
}
```

##### Example response payloads
###### Success
```js
{
  "timestamp":  123456789,
}
```

###### Error
```js
{
  "error": {
    "code": 123,
    "message": "You cannot set last seen timestamp"
  }
}
```
