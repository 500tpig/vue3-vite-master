import { createApp } from 'vue'
import App from './App.vue'
import router from './routes'
import '@/routes/guard'
import { store } from './store'

import 'normalize.css/normalize.css' // 样式重置
// message、modal、notification 组件的样式需要单独引入，别问为什么，
// 问就是 unplugin-vue-components/resolvers 有 BUG
import 'ant-design-vue/lib/message/style/index.less'
import 'ant-design-vue/lib/modal/style/index.less'
import 'ant-design-vue/lib/notification/style/index.less'
import '@/style/index.scss'

const bootstrap = async () => {
  const app = createApp(App)
  app.use(store).use(router)
  // 路由挂载完毕
  await router.isReady()

  app.mount('#app')
}

void bootstrap()
