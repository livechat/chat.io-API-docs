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

### Active thread

To simplify some cases we named the current last thread in chat "active thread". It is always marked with `active: true` field.


### Getting chats

If you Log in to Agent, or Customer API you will receive on login response either chats_summary or last_chats_summary. Both of these objects contain some chat and thread ids, they are usefull to get your chatting history.

Depends if you are Customer or Agent you can use different methods for getting chats:

**Agent methods**:

 - get_archives
 - get_filtered_chats
 - get_chat_threads

**Customer methods**:

 - get_chats_summary
 - get_chat_threads
 - get_chat_threads_summary


### Pushes

If some chat or thread is created or closed when you're logged in we will send you some push messages (in both APIs):

 - incoming_chat_thread
 - thread_closed
 - chat_users_updated


### Advanced

The folowing rules apply:

 - chats are not continual, there can be empty (time) spaces between threads
