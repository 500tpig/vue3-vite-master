<template>
  <a-layout class="layout">
    <a-layout-sider :collapsed="collapsed" :trigger="null" collapsible class="scrollbar">
      <SideMenu />
    </a-layout-sider>
    <a-layout>
      <Header />
      <Content />
    </a-layout>
  </a-layout>
</template>
<script setup lang="ts">
import { provide, ref } from 'vue'
import { CollapseKey } from '../global/symbols'
import SideMenu from './components/SideMenu.vue'
import Header from './components/Header.vue'
import Content from './components/Content.vue'

const collapsed = ref<boolean>(false)
provide(CollapseKey, collapsed)
</script>
<style lang="scss" scoped>
.layout {
  width: 100%;
  height: 100%;
}
</style>
