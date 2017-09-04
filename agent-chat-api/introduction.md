<p class="docs-warning">The chat.io API is currently in development and will change over time.</p>

# Introduction {docsify-ignore}
___
### Connection
Connection endpoints:


| Transport | Endpoint |
|--------|----------------|
| `socket.io` | `https://api.chat.io/agent/rtm/sio` |
| `websocket` | `wss://api.chat.io/agent/rtm/ws` |

**Important!**

Client should implement server pinging or connection will be closed after about one minute of inactivity. If [control frame ping](https://tools.ietf.org/html/rfc6455#section-5.5.2) is unavailable (web browsers), client should use protocol message with action `ping`.

### Events order
Chat messages are not guaranteed to be sorted by server. Client should sort them by `order` parameter. Do not use `timestamp` to sort messages because two events can have the same timestamp.