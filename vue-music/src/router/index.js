import Vue from 'vue'
import Router from 'vue-router'
import {routes} from './route'
Vue.use(Router);

const router = new Router({
  routes,
  mode: 'history',
})

// 路由跳转页面置顶
router.afterEach( () => {
  let top = document.body.scrollTop;
  let docTop = document.documentElement.scrollTop;
  if(top != 0) {
    document.body.scrollTop = 0;
    return ;
  }
  if(docTop != 0) document.documentElement.scrollTop = 0;
})
  

export default router 