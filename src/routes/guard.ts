import config from '@/config'
import { getAccessStorage } from '@/utils/accessStorage'
import router from './index'

router.beforeEach((to, from, next) => {
  const token = getAccessStorage(config.tokenName, config.tokenStorage)
  // next()
  if (to.path === '/login') {
    // 如果要跳转搭login
    next()
  } else {
    // 存在token
    if (token) {
      next()
    } else {
      //  不存在token
      next('/login')
    }
  }
})
// router.afterEach((to, from) => {})
