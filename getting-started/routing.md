---
title: "Routing"
weight: 20
---

# Routing

Routing is an algorithm which defines how chats on the license are distributed between the agents. This document describes chat.io product routing but in the future you will be able to write your own routing algorithm and run it on our platform.


### Introduction

In chat.io product it is not possible for a customer to have multiple chats within a single license, the conversation with a license (company) is continous from customer perspective and it is not nessesary to split that into multiple chats. Agents are assigned to this chat automaticly, or manually depends on routing setting.


### Automatic routing


![Automatic routing](../images/automatic-routing.png "automatic routing")


### Manual routing


![Manual routing](../images/manual-routing.png "manual routing")


### System messages

While routing switch states (as on diagrams) router will send some system messages (see [Events](../events#system-message) section) to chat.

| Message text | System message type |
|--------------|---------------------|
| `Chat assigned to <agent_name>` | `routing.assigned` |

cases:

 - new chat and agent available (automatic routing)
 - agent left the chat and another agent available (automatic routing)
 - agent got available for unassigned chat (automatic routing)

| Message text | System message type |
|--------------|---------------------|
| `Chat is unassigned` | `routing.unassigned` |

cases:

 - agent left the chat and there were no other agents available (automatic routing)
 - no free agent slots (automatic routing)
 - chat is unnasigned (manual routing)

| Message text | System message type |
|--------------|---------------------|
| `Chat is unassigned because <agent_name> hasn't replied in <minutes_number> minutes` | `routing.unassigned` |
| `Chat assigned to <agent_name> because <agent_name> hasn't replied in <minutes_number> minutes` | `routing.assigned` |
| `Chat archived due to long inactivity` | `routing.archived` |
| `Chat is idle due to <minutes_number> minutes of inactivity` | `routing.idle` |
| `Chat archived because customer was banned by <agent> for N days` | `customer_banned` |