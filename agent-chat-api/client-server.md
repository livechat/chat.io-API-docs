---
title: "Client => Server methods"
weight: 20
---

# Methods: Client => Server
___
### Login
Returns current agent's initial state.

| Action | Request object | Required | Type | Notes |
|--------|----------------|----------|------|-------|
| `login` | | | | |
| | `token`| Yes | `string` | SSO Token |
| | `reconnect` | No | `bool` | Reconnecting sets status to last known state instead of default |
| | `push_notifications` | No | `object` | Push notifications settings |
| | `push_notifications.firebase_token` | Yes | `string` | Firebase device token to allow connecting this instance with existing push notification instance (to be seen as 1 instance) |
| | `push_notifications.platform` | Yes | `string` | OS platform |
| | `application` | No | `object` | Application information (for tracking application usage) |
| | `application.name` | No | `string` | Application name |
| | `application.version` | No | `string` | Application version |

* `<platform>` possible values:
  * `ios` - iOS operating system
  * `android` - Android operating system

##### Example request payload
```js
{
  "push_notifications": {
    "firebase_token": "JDa8813Ka92mmKda00dsdkAKDA0",
    "platform": "ios"
  },
  "application": {
    "name": "SmartClient - Chrome",
    "version": "4.1.2.1231 (57.0.2987.133)"
  }
}
```

##### Example response payloads
###### Success
```js
{
  "license": {
    "id": "123",
    "plan": "enterprise",
    "expiration_timestamp": 1483433500
  },
  "my_profile": {
    // "User > My profile" object
  },
  "chats_summary": [
    {
      "id": "a0c22fdd-fb71-40b5-bfc6-a8a0bc3117f5",
      "users": [
        // array of "User" objects
      ],
      "last_thread_summary": {
        "id": "OE070R0W0U",
	"timestamp": 1473433500,
        "user_ids":["john@gmail.com"],
        "last_event_per_type": [{ // last event of each type in current thread
            // "Event > Message" object
          }, {
            // "Event > System message" object
          },
          ...
			     ],
        "order": 12417249812721,
	"properties": {
          "routing": {
            "idle": {
              "value": false
            },
            "unassigned": {
              "value": false
            }
          },
	  ...
        }
      },
      "properties": {
        "routing": {
          "idle": {
            "value": false
          },
          "unassigned": {
            "value": false
          }
        },
        ...
      },
      "scopes": {
      	// "Scopes" object
      }
    }
  ]
}
```
* `properties` is optional
* `scopes` is optional

##### Possible response errors
| Type | Message |
|--------|----------------|
| `auth` | `Invalid access token` |
| `license_expired` | `License expired` |


### Get archives
Returns active threads that current agent has access to. If the agent is a supervisor in some threads, those threads will be returned as well.

| Action | Request object | Required | Type | Notes |
|--------|----------------|----------|------|-------|
| `get_archives` | | |
| | `filters.query` | No | `string` |
| | `filters.date_from` | No | `string` | `YYYY-MM-DD` format |
| | `filters.date_to` | No | `string` | `YYYY-MM-DD` format |
| | `filters.agent_ids` | No | `string[]` | Array of agent IDs |
| | `filters.team_ids` | No | `integer[]` | Array of team IDs |
| | `filters.properties.<namespace>.<name>.<filter_type>` | No | | |
| | `pagination.page` | No | `integer` |
| | `pagination.limit` | No | `integer` |

* `<filter_type>` possible values (only one is allowed for single property):
  * `exists` (`bool`)
  * `values` (`type[]` - array with specific type for property: `string`, `int` or `bool`)
  * `exclude_values` (`type[]` - array with specific type for property: `string`, `int` or `bool`)

##### Example request payload - searching chat archives
```js
{
  "filters": {
    "query": "search keyword",
    "agents": ["p.bednarek@livechatinc.com"],
    "date_from": "2016-09-01",
    "date_to": "2016-10-01",
    "properties": {
      "rating.score": {
        "values": [1]
      },
      "rating.comment": {
        "exists": true
      }
    }
  },
  "pagination": {
    "page": 1,
    "limit": 25
  }
}
```

##### Example response payloads
###### Success
```js
{
  "chats": [
    {
      "chat": {
        "id": "a0c22fdd-fb71-40b5-bfc6-a8a0bc3117f5",
        "users": [
          // array of "User" objects          
        ],
        "thread": {
          // "Thread" object          
        }
      }
    }
  ]
  "pagination": {
      "page": 1,
      "total": 3
  }
}
```

### Get filtered chats

| Action | Request object | Required | Type | Notes |
|--------|----------------|----------|------|-------|
| `get_filtered_chats` | | |
| | `filters.include_active` | No | `bool` |
| | `filters.properties.<namespace>.<name>.<filter_type>` | No | | |

* `<filter_type>` possible values (only one is allowed for single property):
  * `exists` (`bool`)
  * `values` (`type[]` - array with specific type for property: `string`, `int` or `bool`)
  * `exclude_values` (`type[]` - array with specific type for property: `string`, `int` or `bool`)

##### Example request payload - searching chat archives
```js
{
  "filters": {
    "properties": {
      "rating.score": {
        "values": [1]
      },
      "rating.comment": {
        "exists": true
      }
    },
    "include_active": false,
  },
}
```

##### Example response payloads
###### Success
```js
{
 "chats_summary": [
    {
      "id": "a0c22fdd-fb71-40b5-bfc6-a8a0bc3117f5",
      "users": [
        // array of "User" objects
      ],
      "last_thread_summary": {
        "id": "OE070R0W0U",
	"timestamp": 1473433500,
        "user_ids":["john@gmail.com"],
        "last_event_per_type": [{ // last event of each type in current thread
            // "Event > Message" object
          }, {
            // "Event > System message" object
          },
          ...
			     ],
        "order": 12417249812721,
	"properties": {
          "routing": {
            "idle": {
              "value": false
            },
            "unassigned": {
              "value": false
            }
          }
	  ...
        }
      },
      "properties": {
        "routing": {
          "idle": {
            "value": false
          },
          "unassigned": {
            "value": false
          }
       }	
        ...
      },
      "scopes": {
  	 // "Scopes" object
      }      
    }
  ]
}
```

### Get chat threads
Returns threads that current agent has access to for given chat.

| Action | Request object | Required | Type | Notes |
|--------|----------------|----------|------|-------|
| `get_chat_threads` | | |
| | `chat_id` | Yes | `string` |
| | `thread_ids` | No | `string[]` |

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
    "threads": [ // optional
      // "Thread" object
    ],
    "threads_summary": [
      {
        "thread_id": "a0c22fdd-fb71-40b5-bfc6-a8a0bc3117f5",
        "order": 129846129847
      },
      {
        "thread_id": "b0c22fdd-fb71-40b5-bfc6-a8a0bc3117f6",
        "order": 129846129848
      }
    ],
    "properites": {
       // "Properites" object
    },
    "scopes": {
       // "Scopes" object
    }
  }
}
```

### Supervise chat
Adds a supervisor to chat. The supervisor can only send messages to other agents. These messages are not visible to the customer.

| Action | Request object | Required | Notes |
| -------|----------------|----------|---|
| `supervise_chat` ||||
| | `chat_id` | Yes | |
| | `agent_ids` | No | If no agent is passed, current user will be used instead. |

##### Example request payload
```js
{
  "chat_id": "a0c22fdd-fb71-40b5-bfc6-a8a0bc3117f5",
  "agent_ids": ["75a90b82-e6a4-4ded-b3eb-cb531741ee0d"]
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
    "message": "You do not have permission to add a supervisor to this chat."
  }
}
```

### Start chat
Starts a chat.

| Action | Request object | Required | Notes |
| -------|----------------|----------|---|
| `start_chat` ||||
| | `initial_events` | No | Initial chat events array |

##### Example request payload
```js
{
  "chat": {
    "properties": {
      "source": {
        "type": "facebook"
      },
      ...
    }
    "thread": {
      "events": [{
        "type": "message",
        "custom_id": "12312.301231238591134",
        "text": "hello there",
        "recipients": "all"
      }, {
        "type": "system_message",
        "custom_id": "12312.301231238591135",
        "text": "hello there",
        "recipients": "agents"
      }],
      "properties": {
        "source": {
          "type": "facebook"
        },	
        ...
      },
      "scopes": {
         // "Scopes" object
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
    "message": "You do not have permission to perform this action."
  }
}
```

### Join chat
Adds an agent to chat. If the agent was already a supervisor in chat, he/she is changed to an agent.

| Action | Request object | Required | Notes |
| -------|----------------|----------|---|
| `join_chat` ||||
| | `chat_id` | Yes | |
| | `agent_ids` | Yes | |

##### Example request payload
```js
{
  "chat_id": "a0c22fdd-fb71-40b5-bfc6-a8a0bc3117f5",
  "agent_ids": ["75a90b82-e6a4-4ded-b3eb-cb531741ee0d"]
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
    "message": "You do not have permission to perform this action."
  }
}
```

### Remove from chat

Removes users from chat. If no user is specified, removes current user.

| Action | Request object | Required |
| -------|----------------|----------|
| `remove_from_chat` |||
| | `chat_id` | Yes |
| | `customer_ids` | No |
| | `agent_ids` | No |

##### Example request payload
```js
{
  "chat_id": "a0c22fdd-fb71-40b5-bfc6-a8a0bc3117f5",
  "customer_ids": ["b7eff798-f8df-4364-8059-649c35c9ed0c"],
  "agent_ids": ["75a90b82-e6a4-4ded-b3eb-cb531741ee0d"]
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
    "message": "You do not have permission to perform this action."
  }
}
```

### Send event

| Action | Request object | Required | Notes |
| -------|----------------|----------|-------|
| `send_event` |||
| | `chat_id` | Yes | Id of the chat that we want to send the message to |
| | `event` | Yes | Event object |

##### Example request payload
```js
{
  "chat_id": "a0c22fdd-fb71-40b5-bfc6-a8a0bc3117f5",
  "event": {
    "type": "message",
    "text": "hello world",
    "recipients": "agents",
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
    "message": "You cannot send event in this chat."
  }
}
```

### Send broadcast

| Action | Request object | Required | Notes |
| -------|----------------|----------|-------|
| `send_broadcast` |||
| | `scopes` | No | <scope_types> |
| | `content` | Yes | JSON message to be broadcasted |

* `<scope_types>` possible values:
  * `agents` (`[]string` - array of agent's ids)
  * `groups` (`[]string` - array of group's ids)

##### Example request payload

```js
{
  "scopes": {
    "agents": ["john@gmail.com", "jane@gmail.com"],
    "groups": [1, 2]
  },
  "content": {
    "example": {
      "nested": "json"
    }
  }
}
```

##### Example response payloads

###### Success

No payload

### Mark event as seen

| Action | Request object | Required | Notes |
| -------|----------------|----------|-------|
| `mark_event_as_seen` |||
| | `chat_id` | Yes | Id of the chat that the message belongs to |
| | `event_id` | Yes | Seen event id |

##### Example request payload
```js
{
  "chat_id": "a0c22fdd-fb71-40b5-bfc6-a8a0bc3117f5",
  "event_id": "0affb00a-82d6-4e07-ae61-56ba5c36f743"
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
    "message": "You cannot mark this message as seen."
  }
}
```

### Send typing indicator

| Action                  | Request object | Required | Notes                                                       |
| ------------------------|----------------|----------|-------------------------------------------------------------|
| `send_typing_indicator` |                |          |                                                             |
|                         | `chat_id`      | Yes      | Id of the chat that we want to send the typing indicator to |
|                         | `recipients`   | No       | `all` (default), `agents`                                   |
|                         | `is_typing`    | Yes      | Bool                                                        |

##### Example request payload
```js
{
  "chat_id": "a0c22fdd-fb71-40b5-bfc6-a8a0bc3117f5",
  "recipients": "all",
  "is_typing": true
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
    "message": "You cannot send the typing indicator in this chat."
  }
}
```

### Ban customer
Bans the customer for a specific period. It immediately disconnects all customer active sessions and does not accept new ones during the ban lifespan.

| Action | Request object | Required |
| -------|----------------|----------|
| `ban_customer` |||
| | `customer_id` | Yes |
| | `ban.days` | Yes |

##### Example request payload
```js
{
  "customer_id": "b7eff798-f8df-4364-8059-649c35c9ed0c",

  "ban": {
    "days": 5
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
    "message": "You are not allowed to ban this customer."
  }
}
```

### Unban customer
Unbans the customer.

| Action | Request object | Required |
| -------|----------------|----------|
| `unban_customer` |||
| | `customer_id` | Yes |

##### Example request payload
```js
{
  "customer_id": "b7eff798-f8df-4364-8059-649c35c9ed0c"
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
    "message": "You are not allowed to unban this customer."
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
  "chat_id": "a0c22fdd-fb71-40b5-bfc6-a8a0bc3117f5"
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
    "groups": [1, 2],
    "agents": ["john@doe.com"]
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

### Update agent
Updates agent properties.

| Action | Request object | Required | Notes |
| -------|----------------|----------|-------|
| `update_agent` |||
| | `agent_id` | No | Current agent is used by default |
| | `routing_status` | No | Possible values: `accepting_chats`, `not_accepting_chats` |

##### Example request payload
```js
{
  "routing_status": "accepting_chats"
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
    "message": "You are not allowed to change routing status for this agent."
  }
}
```


### Change push notifications
Change firebase push notifications properties.

| Action | Request object | Required | Notes |
| -------|----------------|----------|-------|
| `change_push_notifications` |||
| | `firebase_token` | Yes | Firebase device token |
| | `platform` | Yes | OS platform |
| | `enabled` | Yes | Enable or disable push notifications for requested token |

* `<platform>` possible values:
  * `ios` - iOS operating system
  * `android` - Android operating system

##### Example request payload
```js
{
  "firebase_token": "8daDAD9dada8ja1JADA11",
  "platform": "ios",
  "enabled": true
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
    "message": "You are not allowed to change push notifications settings for this agent."
  }
}
```

### Update chat properties

| Action                   | Request object | Required | Notes                                           |
| -------------------------|----------------|----------|-------------------------------------------------|
| `update_chat_properties` |                |          |                                                 |
|                          | `chat_id`      | Yes      | Id of the chat that we want to set property for |
|                          | `properties  ` | Yes      | Chat properties to set                          |

##### Example request payload
```js
{
  "chat_id": "a0c22fdd-fb71-40b5-bfc6-a8a0bc3117f5",
  "properties": {
    "rating": {
      "score": 2,
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
      "score": 2,
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

| Action                          | Request object | Required | Notes                                              |
| --------------------------------|----------------|----------|----------------------------------------------------|
| `update_last_seen_timestamp`    |                |          |                                                    |
|                                 | `chat_id`      | Yes      |     |
|                                 | `timestamp` | No      |                              |

##### Example request payload
```js
{
  "chat_id": "a0c22fdd-fb71-40b5-bfc6-a8a0bc3117f5",
  "timestamp": 123456789
}
```

##### Example response payloads
###### Success
```js
{
  "timestamp": 123456789
}
```
