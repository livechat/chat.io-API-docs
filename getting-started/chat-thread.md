---
title: "Chat and thread"
weight: 10
---

# Chat and thread


### Basics

In our system chat is divided into threads. Threads are standalone parts of chat and can contain events. In every chat multiple users (customers or agents) can participate and every user can have multiple chats at the same time.

New threads within chat are created on server side, algorithm of this is discussed below in *Advanced* section.

![Chats and Threads](../images/chats.png "chats and threads")

Events are some portion of data, that can be send to chat (in eg. messages), they are discussed in the next section of this guide.

### Getting chats

If you Log in to Agent, or Customer API you will receive on login response either chats_summary or last_chats_summary. Both of these objects contain some chat and thread ids, they are usefull to get your chatting history.

Depends on if you are Customer or Agent you can use different methods for getting chats:

**Agent methods**:

 - [get_archives](../../agent-api/client-server#get-archives)
 - [get_filtered_chats](../../agent-api/client-server#get-filtered-chats)
 - [get_chat_threads](../../agent-api/client-server#get-chat-threads)

**Customer methods**:

 - [get_chats_summary](../../customer-api/client-server#get-chats-summary)
 - [get_chat_threads](../../customer-api/client-server#get-chat-threads)
 - [get_chat_threads_summary](../../customer-api/client-server#get-chat-threads-summary)

### Chatting

You can start a chat via a [start_chat](../../agent-api/client-server#start-chat) method on both Customer and Agent side. If you are agent you can also [join](../../agent-api/client-server#join-chat) some chat or [supervise](../../agent-api/client-server#supervise-chat) it. When you are in some chat you can send events to it via [send_event](../../agent-api/client-server#send-event) method.

Currently all new events and chats are sent to all agents within license. In the future there will be *scopes* that will define some groups of users that has access to certain chats/events and other sort of data.

### Pushes

If some chat or thread is created or closed when you're logged in we will send you some server push messages (in both APIs):

 - [incoming_chat_thread](../../agent-api/server-client#incoming-chat-thread)
 - [thread_closed](../../agent-api/server-client#thread-closed)
 - [chat_users_updated](../../agent-api/server-client#chat-users-updated)


### Advanced

The folowing rules apply:

 - one thread within chat can be an *active thread* - this is the thread that you will send events to
 - chats are not continual, there can be empty (time) spaces between threads
 - if there is no active thread in chat (in eg. last active thread was closed) sending event to that chat will start a new thread
 - the above rule do not apply to annotation event
 - when a new chat is started (via [start_chat](../../agent-api/client-server#start-chat)) a new thread is created within that chat
 - the algorithm which decides about how chats are spread between agents is called routing and will be documented in this guide in *Routing* section