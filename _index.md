---
title: "Platform API"
versioned: true
latest: v0.2
---

# Platform API
___

Welcome to **chat.io** platform API documentation. We hope you will find it helpful when building upon our platform. If there's anything missing or if you have any questions, don't hesitate to drop us a line.

Platform API lets client libraries handle chat conversations. It allows to send/receive messages and perform other chat actions for both customers and chat agents.

<video loop width="750" height="500" controls>
<source type="video/mp4" src="./v0.2/getting-started/images/simple_event_schema.mp4">
</video>

Platform API consists of two APIs:

 - **Agent API** - for handling chats on behalf of agents
 - **Customer API** - for handling chats on behalf of customers

Both APIs have much in common. Request/response format and success/error handling are similar and are described in this reference:

 - [Protocol](./v0.2/protocol)
 - [Success and error handling](./v0.2/success-error)