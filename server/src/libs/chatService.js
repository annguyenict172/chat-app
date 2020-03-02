const Socket = require('socket.io');

const { ChatEvent } = require('../constants');

class ChatService {
  init(server) {
    this.io = Socket(server);
    this.userSockets = {};
  }

  saveUserConnection(userId) {
    this.io
      .of(`/${userId}`)
      .on('connection', (socket) => {
        this.userSockets[userId] = socket;
        socket.on('disconnect', function () {
          // if (this.userSockets[_userId]) delete this.userSockets[_userId];
        });
      })
  }

  sendEvent(userId, eventName, data) {
    if (this.userSockets[userId]) {
      this.userSockets[userId].emit(eventName, data);
    }
  }

  sendNewMessageEvent(userId, chat, message) {
    this.sendEvent(userId, ChatEvent.NEW_MESSAGE, {
      chat: chat,
      message: message
    });
  }

  sendSeenEvent(userId, chat) {
    this.sendEvent(userId, ChatEvent.SEEN, {
      chat: chat
    });
  }
}

module.exports = new ChatService();