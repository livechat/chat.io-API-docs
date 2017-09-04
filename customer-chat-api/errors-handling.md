<p class="docs-warning">The chat.io API is currently in development and will change over time.</p>

# Errors handling {docsify-ignore}
___
### Format
Error payload has format:

```
"error": {
  "type": "incorrect_region",
  "message": "License is in another region",
  "data": { // optional
    "region": "dal"
  } 
}
```

`data` is optional, most errors don't use it

### Possible errors

| Type | Default Message | Data | Notes |
|--------|----------------|----------|---|
| `internal` | Internal server error | | Sent for any request |
| `customer_banned` | Customer is banned | | Sent for `login` request, then customer gets disconnected |
| `validation` | Wrong format of request | | Sent for any request |
| `auth` | Auth error | | Sent for `login` request |
| `request_timeout` | Request timeouted | | Sent for any request when not handled within 15 seconds timeframe  |
| `license_not_found` | License doesn't exist | | Sent in push on connection, then customer gets disconnected |
| `incorrect_region` | License is in another region | `region` | Sent in push on connection, then customer gets disconnected |
| `too_many_connections` | Too many connections | | Sent in push on connection when customer reached connection limit, then customer gets disconnected |


