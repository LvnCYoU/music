import axios from 'axios'
import qs from 'qs'
import {Message} from 'element-ui';
import Vuex from '@/store'

const instance = axios.create({
  baseURL: '/proxy/',
  timeout: 3000,
  withCredentials: true,
  headers: {
    'Content-Type':'application/x-www-form-urlencoded',
  },
  transformRequest: [ data => {
    return qs.stringify(data);
  }],
});
instance.interceptors.request.use(config => {
  return config
},err => {
  Message.error({message: '请求超时'})
  return Promise.reject(err)
})
instance.interceptors.response.use(res => {
  Vuex.commit('HIDDEN_LOADING')
  return res;
},err => {
  Message.error({message: '数据不存在'})
  return Promise.reject(err)
})

export default instance
