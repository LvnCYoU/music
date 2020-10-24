import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import {Message} from 'element-ui'
const AppHome = () => import('../components/common/home');
const AppRank = () => import('../components/common/rank');
const AppSinger = () => import('../components/common/singer');
const AppMv = () => import('../components/common/MV');
const AppVideo = () => import('../components/common/video');
const AppSongSheet = () => import('../components/common/songsheet');
const AppSignIn = () => import('../components/common/signin')
const AppUser = () => import('../components/common/user');
// const AppHomePlaylist = () => import('../components/common/home/playlist');
Vue.use(Router);

const router =  new Router({
  routes: [
    {path: '/', redirect:'/home'},
    {
      name: 'home', 
      path: '/home',
      component: AppHome,
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
    {path: '/video', component: AppVideo},
    {path: '/songsheet', component: AppSongSheet},
    {path: '/signin', component: AppSignIn,},
    {path: '/user', component: AppUser},
    {
      name: 'playlist-detail',
      path: '/playlist-detail',
      component: () => import('../components/common/home/playlist')
    }
  ],
  
})
  

export default router 