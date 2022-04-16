import { RouteRecordRaw } from 'vue-router'

const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/permissions',
    name: 'Permissions',
    component: () => import('@/layout/defaultRouter.vue'),
    meta: {
      title: '权限校验', // 名称
      icon: 'icon-quanxianguanli'
    },
    children: [
      {
        path: '/permissions/admin',
        name: 'Admin',
        component: () => import('@/views/permissions/admin/index.vue'),
        meta: {
          title: 'admin', // 名称
          icon: 'icon-guanliyuan'
        }
      },
      {
        path: '/permissions/user',
        name: 'User',
        component: () => import('@/views/permissions/user/index.vue'),
        meta: {
          title: 'user', // 名称
          icon: 'icon-yonghu'
        }
      }
    ]
  }
]
export default constantRoutes
