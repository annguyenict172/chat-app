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
    const formData = new FormData();
    formData.set('email', data.email);
    formData.set('password', data.password);
    formData.set('firstName', data.firstName);
    formData.set('lastName', data.lastName);
    formData.set('avatar', data.avatar);
    return post('/api/users/signup', formData, { 'Content-Type': 'multipart/form-data' });
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
    const params = {
      q: searchTerm
    };
    return get('/api/users', params);
  },
  connectToChatService: () => {
    return post('/api/chats/connect');
  }
}

export default APIService;