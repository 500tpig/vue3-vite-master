<template>
  <a-sub-menu v-if="menuInfo?.children?.length" :key="menuInfo.name" v-bind="$attrs">
    <template #title>
      <span>
        <icon-font :name="(menuInfo?.meta?.icon as string)" :size="16" />
        <span>{{ menuInfo?.meta?.title }}</span>
      </span>
    </template>
    <template v-for="item in menuInfo.children" :key="item.name">
      <SideMenuItem :menu-info="item" />
    </template>
  </a-sub-menu>
  <template v-else>
    <a-menu-item :key="menuInfo.name">
      <icon-font :name="(menuInfo?.meta?.icon as string)" :size="16" />
      <span>{{ menuInfo?.meta?.title }}</span>
    </a-menu-item>
  </template>
</template>

<script setup lang="ts">
import { RouteRecordRaw } from 'vue-router'
withDefaults(
  defineProps<{
    menuInfo: RouteRecordRaw
  }>(),
  {
    // menuInfo: {}
  }
)
</script>
<style lang="scss" scoped></style>
