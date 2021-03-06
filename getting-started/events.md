---
title: "Events"
weight: 20
---

# Events


### Introduction

Events are portions of data which can be sent to a chat ([send_event](../../agent-api/client-server#send-event)). There are different types of events:

 - [message](#message)
 - [annotation](#annotation)
 - [filled form](#filled-form)
 - [system message](#system-message)
 - [file](#file)
 - [custom event](#custom-event)


[Incoming event](../../agent-api/server-client#incoming-event) push will inform you about events sent to a chat (on both agent and customer side).


### Common event fields

Here are the fields shared by all events:

| name        | puprose                                        | filled by | type   |
|-------------|------------------------------------------------|-----------|--------|
| `id`        | ID of the event                                | server    | string |
| `custom_id` | is an ID that you can set for your own purpose | client    | string |
| `order`     | events with a lower `order` will appear first  | server    | int    |
| `author_id` | this is the ID of the sender of an event       | server    | string |
| `text`      | this is payload that you can send whithin event (for example message content) | client | string |
| `recipients` | posibble values are `"all"`(default) and `"agents"` | client | string |
| `properties` | event properties, more about this in future properties section | client | properties object |


### Message

 A message is the most common and self-explanatory event type. It allows you to send textual content to other chat users. Its data format looks like this:

```js
{
  "id": "0affb00a-82d6-4e07-ae61-56ba5c36f743",
  "custom_id": "12345-bhdsa",
  "order": 1,
  "type": "message",
  "author_id": "b7eff798-f8df-4364-8059-649c35c9ed0c",
  "timestamp": 1473433500,
  "text": "hello there",
  "recipients": "all",
  "properties": {
    // "Properties" object
  }
}
```


### Annotation

Adds an annotation to the last thread. Keep in mind that sending an annotation cannot start a new thread (even if there is no active thread in a chat). It always goes to the latest thread that already exists.

```js
{
  "id": "0affb00a-82d6-4e07-ae61-56ba5c36f743",
  "custom_id": "12312.301231238591134",
  "order": 1,
  "type": "annotation",
  "author_id": "b7eff798-f8df-4364-8059-649c35c9ed0c",
  "timestamp": 1473433500,
  "text": "Example annotation",
  "annotation_type": "rating",
  "properties": {
    // "Properties" object
  }
}
```

`annotation_type` - type of the annotation. This field cannot be empty and is customizable, you can have your own annotation types (i.e. we use "rating" type)


### Filled form

A filled form is an event containing some data from a form. Let's take a look at a practical example. We have this form:

![Filled Form](../images/filled_form.png "filled form example")

and we want to send its data. You can use filled form event to achieve this (in this example we introduce all currently available field types):

```js
{
  "id": "0affb00a-82d6-4e07-ae61-56ba5c36f743",
  "custom_id": "12312.301231238591134",
  "order": 4,
  "type": "filled_form",
  "author_id": "b7eff798-f8df-4364-8059-649c35c9ed0c",
  "timestamp": 1473433500,
  "properties": {
    // "Properties" object
  }
  "fields": [{
      "type": "text",
      "name": "name",
      "label": "Your name:",
      "required": true,
      "value": "John Doe"
    },
    {
      "type": "email",
      "name": "email",
      "label": "E-mail:",
      "required": true,
      "value": "john.doe@gmail.com"
    },
    {
      "name": "Chat window title",
      "type": "title",
      "label": "Let's talk!",
    },
    {
      "name": "Chat window form info",
      "type": "information",
      "label": "Before we start, we'd like to know a few details about you.",
    }]
}
```


### System message

A system message is an event generated by the server. It does not have "author_id", "custom_id" and "properties" fields.

```js
{
  "id": "0affb00a-82d6-4e07-ae61-56ba5c36f743",
  "order": 1,
  "type": "system_message",
  "timestamp": 1473433500,
  "text": "Mike joined the chat",
  "system_message_type": "agent_joined"
}
```

 System messages can be triggered by a user action within a chat or by a router (router messages are covered in the [Routing](../routing.md) section). Each action triggers a system message with a different `system_message_type` and a different `text` message:

| system_message_type | text                             |
|---------------------|----------------------------------|
| `agent_joined`      | `<agent_name> joined the chat`   |
| `agent_left`        | `<agent_name> left the chat`     |
| `manual_archived`   | `<agent_name> archived the chat` |


### File

File event indicates that a file has been uploaded. It can be only generated by the server when the [send file](../../customer-api/client-server#send-file) Customer API method is called.

```js
{
  "id": "0affb00a-82d6-4e07-ae61-56ba5c36f743",
  "custom_id": "12312.301231238591134",
  "order": 1,
  "type": "file",
  "author_id": "b7eff798-f8df-4364-8059-649c35c9ed0c",
  "timestamp": 1473433500,
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

The `size` field means the file size in bytes. It is limited to 10 MB. <br>
The `content-type` field can contain any [MIME media type](https://en.wikipedia.org/wiki/Media_type). <br>
`Width` and `height` Fields are present only for `"image/png"`, `"image/gif"` and `"image/jpg"` content-types. There is no limitations for width and height.


### Custom event

A custom event is an event that has 100% custom payload. You can send any json within it.

```js
{
  "id": "0affb00a-82d6-4e07-ae61-56ba5c36f743",
  "custom_id": "12312.301231238591134",
  "order": 1,
  "type": "custom",
  "author_id": "b7eff798-f8df-4364-8059-649c35c9ed0c",
  "timestamp": 1473433500,
  "content": {
    //any json object
  },
  "properties": {
    // "Properties" object
  }
}
```