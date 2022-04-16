<template>
  <!-- <a-breadcrumb class="breadcrumb" :routes="matchedRoute">
    <template #separator>
      <span color="#999">></span>
    </template>
    <template #itemRender="{ route, routes }">
      <span class="breadcrumb-item">
        {{ route.meta.title }}
      </span>
    </template>
  </a-breadcrumb> -->
  <a-breadcrumb class="breadcrumb">
    <template v-for="(routeItem, routeIndex) in matchedRoute" :key="routeItem?.name">
      <a-breadcrumb-item>
        <template #separator>
          <span color="#999">></span>
        </template>
        <span :class="{ pointer: routeItem.children.length !== 0 }">{{ routeItem.meta.title }}</span>
        <template v-if="routeItem?.children?.length" #overlay>
          <a-menu :selected-keys="[matchedRoute[routeIndex + 1]?.name]">
            <template v-for="childItem in routeItem?.children" :key="childItem.name">
              <a-menu-item v-if="!childItem.meta?.hideInMenu && !childItem.meta?.hideInBreadcrumb" :key="childItem.name" @click="clickMenuItem(childItem)">
                <span>{{ childItem.meta?.title }}</span>
              </a-menu-item>
            </template>
          </a-menu>
        </template>
      </a-breadcrumb-item>
    </template>
    <!-- <template #separator>
      <span color="#999">></span>
    </template>
    <a-breadcrumb-item v-for="item in matchedRoute" :key="item.name">
      <span :class="{ pointer: item.children.length !== 0 }">{{ item.meta.title }}</span>
      <template v-if="item.children.length !== 0" #overlay>
        <a-menu>
          <a-menu-item v-for="temp in item.children.filter(d => !d.meta?.hidden)" :key="temp.name">
            <a :class="{ routerLinkActive: $route.name === temp.name }" @click="router.push({ name: temp.name })">
              {{ temp.meta?.title }}
            </a>
          </a-menu-item>
        </a-menu>
      </template>
    </a-breadcrumb-item> -->
  </a-breadcrumb>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'
import { RouteLocationMatched, RouteRecordRaw, useRoute, useRouter } from 'vue-router'
const $route = useRoute()
const router = useRouter()

let matchedRoute = ref<RouteLocationMatched[]>([])
watch(
  () => $route.matched,
  () => {
    matchedRoute.value = $route.matched.slice(1) || []
  },
  {
    immediate: true
  }
)

const findLastChild: any = (route?: RouteRecordRaw) => {
  if (typeof route?.redirect === 'object') {
    const redirectValues = Object.values(route.redirect)
    if (route?.children?.length) {
      const target = route.children.find(n => redirectValues.some(m => [n.name, n.path, n.meta?.fullPath].some(v => v === m)))
      return findLastChild(target)
    }
    return redirectValues.find(n => typeof n === 'string')
  } else if (typeof route?.redirect === 'string') {
    if (route?.children?.length) {
      const target = route.children.find(n => [n.name, n.path, n.meta?.fullPath].some(m => m === route?.redirect))
      return findLastChild(target)
    }
    return route?.redirect
  }
  return route
}

// 点击菜单
const clickMenuItem = (menuItem: RouteRecordRaw) => {
  const lastChild = findLastChild(menuItem)
  if (lastChild?.name === $route.name) return
  if (/http(s)?:/.test(lastChild?.name)) {
    window.open(lastChild?.name)
  } else if (lastChild?.name) {
    router.push({ name: lastChild.name })
  }
}
</script>
<style scoped lang="scss">
.ant-dropdown-menu-item {
  .ant-dropdown-menu-title-content {
    a {
      color: rgba(0, 0, 0, 0.85);
    }
  }
}
.breadcrumb {
  &:deep(.ant-dropdown-trigger) {
    .anticon-down {
      display: none !important;
    }
  }
  * {
    cursor: pointer;
  }
}
</style>
