import socketIOClient from 'socket.io-client';

class ChatService {
  constructor() {
    this.listeners = [];
    this.socket = null;
  }

  connect(userId) {
    this.socket = socketIOClient.connect(`http://localhost:4000/${userId}`);

    this.socket.on('new_message', (data) => {
      this.listeners.forEach(l => l(data));
    })
  }

  disconnect() {
    this.socket.disconnect();
  }

  addListener(listener) {
    this.listeners.push(listener);
  }

  removeListener(listener) {
    this.listeners = this.listeners.filter(l => l !== listener);
  }
}

export default new ChatService();