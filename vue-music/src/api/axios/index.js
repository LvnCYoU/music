import user from './user'
import home from './home'
import axios from 'axios'

export default {
  ...user,
  ...home,
  axios,
};