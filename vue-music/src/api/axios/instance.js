import axios from 'axios'
import qs from 'qs'

const instance = axios.create({
  baseURL: 'http://localhost:3000/',
  timeout: 2000,
  withCredentials: true,
  transformRequest: [ data => {
    return qs.stringify(data);
  }]
});

export default instance