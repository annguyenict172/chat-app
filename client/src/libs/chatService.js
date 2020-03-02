import socketIOClient from 'socket.io-client';
import { ChatEvent } from '../constants';

class ChatService {
  constructor() {
    this.listeners = {};
    this.socket = null;

    Object.keys(ChatEvent).forEach(ceKey => {
      this.listeners[ChatEvent[ceKey]] = [];
    })
  }

  connect(userId) {
    const endpoint = `${process.env.REACT_APP_SOCKET_IO_HOST}/${userId}`;
    this.socket = socketIOClient.connect(endpoint);

    Object.keys(ChatEvent).forEach(ceKey => {
      this.socket.on(ChatEvent[ceKey], (data) => {
        this.listeners[ChatEvent[ceKey]].forEach(l => l(data));
      })
    })
  }

  disconnect() {
    this.socket.disconnect();
  }

  addListener(eventName, listener) {
    this.listeners[eventName].push(listener);
  }

  removeListener(eventName, listener) {
    this.listeners[eventName] = this.listeners[eventName].filter(l => l !== listener);
  }
}

export default new ChatService();