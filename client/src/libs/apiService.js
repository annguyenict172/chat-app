import { get, post, put } from './api';

const APIService = {
  login: (data) => {
    const { email, password } = data;
    return post('/api/users/login', {
      email: email,
      password: password
    })
  },
  signUp: (data) => {
    const {
      email,
      password,
      firstName,
      lastName,
      dob,
      gender
    } = data;
    return post('/api/users/signup', {
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
      dob: dob,
      gender: gender
    })
  },
  getUserInfo: (userId) => {
    return get(`/api/users/${userId}`);
  },
  getMyInfo: () => {
    return get('/api/users/me');
  },
  getChats: (params) => {
    return get('/api/chats', params);
  },
  getMessages: (chatId, offset) => {
    return get(`/api/chats/${chatId}/messages?offset=${offset}`);
  },
  seenChat: (chatId) => {
    return put(`/api/chats/${chatId}`);
  },
  createNewChat: (participants, participantNames) => {
    return post(`api/chats`, { participants, participantNames });
  },
  sendNewMessage: (chatId, text) => {
    return post(`/api/chats/${chatId}/messages`, { text });
  },
  searchUsers: (searchTerm) => {
    return get(`/api/users?q=${searchTerm}`);
  },
  connectToChatService: () => {
    return post('/api/chats/connect');
  }
}

export default APIService;