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
  }
}

export default APIService;