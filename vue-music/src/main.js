import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './api/element'
import api from './api/axios'
import { Message } from 'element-ui'
import utils from './api/utils'
import './common/font/iconfont.css'
import './api/scroll'

Vue.config.productionTip = false;
Vue.prototype.$api = api;
Vue.prototype.$Message = Message;
Vue.prototype.utils = utils;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
