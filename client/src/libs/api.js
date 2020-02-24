import axios from 'axios';

const getDefaultHeaders = () => ({
  'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
  'Content-Type': 'application/json'
});

const get = (path, params, headers = {}) => {
  const h = { ...getDefaultHeaders(), ...headers };
  return axios.get(path, {
    params: params,
    headers: h
  })
    .then(response => response)
    .catch(error => error.response)
}

const post = (path, data, headers = {}) => {
  const h = { ...getDefaultHeaders(), ...headers };
  return axios.post(path, data, {
    headers: h
  })
    .then(response => response)
    .catch(error => error.response)
}

const put = (path, data, headers = {}) => {
  const h = { ...getDefaultHeaders(), ...headers };
  return axios.put(path, data, {
    headers: h
  })
    .then(response => response)
    .catch(error => error.response)
}

export {
  get,
  post,
  put
}
