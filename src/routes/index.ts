import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { constantRoutes } from './constantRoutes'
const routes: RouteRecordRaw[] = [...constantRoutes]

const router = createRouter({
  history: createWebHistory(),
  routes
})
export default router
