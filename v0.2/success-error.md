---
title: "Success and error handling"
weight: 20
---

# Succes and error handling
___

All responses will contain at least two properties:

- `id` - the ID of the request. It lets the client match the response with the request.
- `success` - boolean flag that tells if the request was successful or not.
- `payload` - optional object containing additional response data.

#### Success
Success response can also contain additional objects, such as `chat` or `event`, nested in the `payload` object. Their format is described in Agent/Customer API documentation.
```js
{
  "id": "1473745636515",
  "action": "some_action",
  "success": true,
  "payload": { //optional
  }
}
```

#### Error
Error responses will include both `success: false` and `payload.error` objects.
```js
{
  "id": "1473745636515",
  "action": "some_action",
  "success": false,
  "payload": {
    "error": {
      "type": "error_type",
      "message": "Error message"
    }
  }
}
```