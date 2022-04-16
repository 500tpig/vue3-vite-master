<template>
  <div class="logo" />
  <a-menu v-model:openKeys="openKeys" v-model:selectedKeys="selectedKeys" theme="dark" mode="inline" @click="handleGoRouter">
    <template v-for="item in routerList" :key="item.name">
      <SideMenuItem :menu-info="item" />
    </template>
  </a-menu>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { RouteRecordRaw, useRoute, useRouter } from 'vue-router'
import SideMenuItem from './SideMenuItem.vue'
import type { MenuProps } from 'ant-design-vue'
// import { useUserStore } from '@/store/modules/user'

const router = useRouter()
const currentRoute = useRoute()
// const userStore = useUserStore()

let routerList = ref<RouteRecordRaw[]>([])
let selectedKeys = ref<string[]>([currentRoute.name as string])
let openKeys = ref<string[]>([])

// const menus = computed(() => {
//   return [...userStore.menus].filter(n => !n.meta?.hideInMenu).sort((a, b) => (a?.meta?.orderNum || 0) - (b?.meta?.orderNum || 0))
// })

watch(
  () => currentRoute.name,
  () => {
    selectedKeys.value = [currentRoute.name as string]
  },
  {
    immediate: true
  }
)
onMounted(() => {
  routerList.value = (router.options.routes.find(d => d.name === 'BaseLayout')?.children as RouteRecordRaw[]) || []
})
// @ts-ignore
const handleGoRouter: MenuProps['onClick'] = menuItem => {
  const key: string = menuItem.key as string
  if (key === currentRoute.name) return
  if (/http(s)?:/.test(key)) {
    window.open(key)
  } else {
    router.push({ name: key })
  }
}
</script>

<style lang="scss" scoped>
// 侧边栏宽度
.logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.3);
  margin: 16px;
}
</style>
