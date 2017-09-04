var cfg = {
	apiUrl: "wss://api.chat.io/agent/rtm/ws",
    licenseID: "<LICENSE_ID>",
}

var ChatID = null
var accesToken = "Bearer <TOKEN>"
var PING = null

var sendMessage = function(name, payload) {

    // wrap protocol message data
    protocolMessage = {
        action: name,
        id: generateID(), // id for match response
    }

    // add payload if exist
    if (payload) {
        protocolMessage.payload = payload
    }

    console.log("send:", protocolMessage)
    // emit via socket.io
    this.client.send(JSON.stringify(protocolMessage));
}

// generate random string ID
var generateID = function() {
    return Math.random().toString(36)
}

var onMessage = function(d) {
    var msg = JSON.parse(d.data)

    //handle unsuccesed messages
    if (msg.success == false) {
        console.error(msg.payload.error)
        return 
    }

    console.log("You have recieved message:", msg.action) 

    // handle protocol responses
    switch (msg.action) {
        case "login": 
            return onMessageLogin(msg)
            break

        case "start_chat":   
            return onMessageStartChat(msg)
            break
    }
}

var onMessageLogin = function(msg) {
            console.log("Your agent ID:", msg.payload.my_profile.id)
            return apiSendStartChat()  
}

var onMessageStartChat = function(msg) {
    console.log("start_chat payload:", msg.payload)   
    apiSendChatMessage(msg.payload.chat.id)
}

var apiSendLogin = function() {
    sendMessage("login", {token: accesToken})
}

var apiSendStartChat = function() {
    sendMessage("start_chat", {
        routing_scope: {type: "license"}
    });     
}

var apiSendChatMessage = function(chatID) {
    sendMessage("send_event", {
        "chat_id": chatID, 
        "event": {
            "type": "message",
            "text": "Hello World!"
        }});
}

var onConnect = function(msg) {
    console.log("You are connected!")

    // it's required to send login before start sending 
    // any other protocol messages. Login message subscribe 
    // connection for receiving server push messages. 
    apiSendLogin()

    // ping 
    PING = setInterval(function() {
        sendMessage("ping")
    }, 30000)
}

var onDisconnect = function(msg) {
    console.log("You are disconnected!")

    if (PING) {
        clearInterval(PING)
        PING = null
    }
}

var client = new WebSocket(apiUrl)

client.onmessage = onMessage
client.onopen = onConnect
client.onclose = onDisconnect
