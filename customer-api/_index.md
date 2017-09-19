---
title: Customer API
weight: 40
---

# Introduction
___

### Connection
Connection endpoints:

| Transport | Endpoint |
|--------|----------------|
| `socket.io` | `https://api.chat.io/customer/rtm/sio` |
| `websocket` | `wss://api.chat.io/customer/rtm/ws` |

Params:

| Param | Required | Type | Notes |
|---|---|---|---|
| `license_id` | Yes | Integer | LiveChat account ID |

Example:

```
https://api.chat.io/customer/rtm/ws?license_id=123456789
```

**Important!**

Client should implement server pinging or connection will be closed after about one minute of inactivity. If [control frame ping](https://tools.ietf.org/html/rfc6455#section-5.5.2) is unavailable (web browsers), client should use protocol message with action `ping`.

### Authentication
Customer authentication is store in cookies. All cookies are secure and http-only.  

| Cookie name | Type |
|--------|------------------|
| __lc_cid | Customer ID |
| __lc_cst | Authentication token |


### Events order
Chat messages are not guaranteed to be sorted by server. Client should sort them by `order` parameter. Do not use `timestamp` to sort messages because two events can have the same timestamp.
