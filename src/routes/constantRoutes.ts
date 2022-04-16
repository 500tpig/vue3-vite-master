import { RouteRecordRaw } from 'vue-router'
import userRouters from './modules/user'
export const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/',
    name: 'BaseLayout',
    component: () => import('@/layout/index.vue'),
    redirect: '/home',
    meta: {
      title: 'Layout'
    },
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: '首页', // 名称
          icon: 'icon-zonglan1'
        }
      },
      ...userRouters
    ]
  },
  {
    path: '/404NotFound',
    name: 'NotFound',
    component: () => import('@/views/result/404.vue')
  },
  { path: '/:pathMatch(.*)*', redirect: '/404NotFound' }
]
