import user from './user';
import home from './home';
import axios from 'axios';
import map from './map'

export default {
  ...user,
  ...home,
  ...map,
  axios,
};