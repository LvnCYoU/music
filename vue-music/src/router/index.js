import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import {Message} from 'element-ui'
const AppHome = () => import('@/view/home');
const AppRank = () => import('@/view/rank');
const AppSinger = () => import('@/view/singer');
const AppMv = () => import('@/view/MV');
const AppVideo = () => import('@/view/video');
const AppSongSheet = () => import('@/view/songsheet');
const AppSignIn = () => import('@/view/signin')
const AppUser = () => import('components/common/user');
Vue.use(Router);

const router =  new Router({
  routes: [
    {path: '/', redirect:'/home'},
    {
      name: 'home', 
      path: '/home',
      component: AppHome,
      meta: {
        keepAlive: true,
      }
    },
    {path: '/rank',component: AppRank},
    {path: '/singer', component: AppSinger},
    {
      path: '/mv', 
      component: AppMv,
      meta:{
        title: 'MV',
        auth: true
      },
      beforeEnter(to,from,next){
        if(!store.state.status){
          Message({
            message: '请先登录',
            type: 'error',
            duration: 1000
          })  
          next({path: '/signin?mv'});
        }else next()
      }
    },
    {
      path: '/video', 
      component: AppVideo,
      beforeEnter(to,from,next){
        Message({
          message: '请先登录',
          type: 'error',
          duration: 1000
        })  
        next({path: '/signin?mv'});
        
      }
    },
    {path: '/songsheet', component: AppSongSheet},
    {path: '/signin', component: AppSignIn,},
    {
      name: 'user',
      path: '/user',
      component: AppUser,
      children: [
        
      ]
    },
    {
      name: 'songsheet-detail',
      path: '/songsheet-detail',
      component: () => import('../components/common/songsheet/songsheet-detail')
    },
    {
      name: 'singer-detail',
      path: '/singer-detail',
      component: () => import('../components/common/singer/singer-detail')
    },
    {
      name: 'mv-detail',
      path: '/mv-detail',
      component: () => import('../components/common/MV/mv-detail')
    },
    {
      name: 'search',
      path: '/search',
      component: () => import('../components/common/search')
    }
  ],
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