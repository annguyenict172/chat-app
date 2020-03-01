import axios from 'axios';
import { toast } from 'react-toastify';

const getDefaultHeaders = () => ({
  'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
  'Content-Type': 'application/json'
});

const get = (path, params, headers) => {
  return request('get', path, params, headers)
}

const post = (path, data, headers) => {
  return request('post', path, data, headers)
}

const put = (path, data, headers) => {
  return request('put', path, data, headers)
}

const request = (method, path, data, headers = {}) => {
  const h = { ...getDefaultHeaders(), ...headers };
  return new Promise((resolve, reject) => {
    let axiosPromise;
    if (method === 'get') {
      axiosPromise = axios.get(path, {
        params: data,
        headers: h
      })
    } else if (method === 'put') {
      axiosPromise = axios.put(path, data, {
        headers: h
      })
    } else if (method === 'post') {
      axiosPromise = axios.post(path, data, {
        headers: h
      })
    }
    axiosPromise
      .then(response => resolve(response))
      .catch(error => {
        toast.error(error.response.data.errorMessage);
        reject(error.response);
      })
  })
}

export {
  get,
  post,
  put
}

