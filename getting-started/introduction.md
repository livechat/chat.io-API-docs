<p class="docs-warning">The chat.io API is currently in development and will change over time.</p>

# Introduction
___

Welcome to **chat.io** API documentation. We hope you will find it helpful when building upon our platform. If there's anything missing or if you have any questions, don't hesitate to drop us a line.

Chat API lets client libraries handle chat conversations. It allows to send/receive messages and perform other chat actions for both customers and chat agents.

<video loop width="750" height="500" controls>
<source type="video/mp4" src="./getting-started/images/simple_event_schema.mp4">
</video>

Currently the API supports following transports:
* [**websocket**](getting-started/transport.md) (for real-time communciation)
* [**socket.io**](getting-started/transport.md) (for real-time communciation)


Chat API consists of two APIs:
* **Agent Chat API** - for handling chats on behalf of agents
* **Customer Chat API** - for handling chats on behalf of customers

Both APIs have much in common. Request/response format and success/error handling are similar  and are described in this document.

