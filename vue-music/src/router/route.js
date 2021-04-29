import Main from '@/view/pc/main';
import {Message} from 'element-ui'
import store from '../store'

const pageError = {
  path: '*',
  name: 'error',
  meta: {
    title: '404-您访问的页面不存在'
  },
  component: () => import('../components/pc/error')
}

const appRouter = {
  path: '/',
  redirect: {
    name: 'home'
  },
  meta: {
    title: '首页',
    keepAlive: true
  },
  component: Main,
  children: [
    {
      name: 'home', 
      path: '/home',
      component: () => import('../view/pc/main/home'),
    },
    {
      path: '/rank',
      component: () => import('../view/pc/main/rank'),
    },
    {
      path: '/singer', 
      component: () => import('../view/pc/main/singer'),
    },
    {
      path: '/mv', 
      component: () => import('../view/pc/main/MV'),
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
      component: () => import('../view/pc/main/video'),
      beforeEnter(to,from,next){
        Message({
          message: '请先登录',
          type: 'error',
          duration: 1000
        })  
        next({path: '/signin?mv'});
        
      }
    },
    {
      path: '/songsheet', 
      component: () => import('../view/pc/main/songsheet'),
    },
    {
      path: '/signin', 
      component: () => import('../view/pc/main/signin'),
    },
    {
      name: 'user',
      path: '/user',
      component: () => import('../components/pc/user'),
    },
    {
      name: 'songsheet-detail',
      path: '/songsheet-detail',
      component: () => import('../components/pc/songsheet/songsheet-detail')
    },
    {
      name: 'singer-detail',
      path: '/singer-detail',
      component: () => import('../components/pc/singer/singer-detail')
    },
    {
      name: 'search',
      path: '/search',
      component: () => import('../components/pc/search')
    }
  ]
}

export const routes = [pageError,appRouter]