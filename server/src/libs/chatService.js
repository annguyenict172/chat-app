const Socket = require('socket.io');

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

  sendNewMessageEvent(userId, chat, message) {
    if (this.userSockets[userId]) {
      this.userSockets[userId].emit('new_message', {
        chat: chat,
        message: message
      });
    }
  }
}

module.exports = new ChatService();