<template>
  <a-layout-content class="layout-content">
    <BreadCrumb />
    <router-view class="layout-content-main"></router-view>
  </a-layout-content>
</template>
<script setup lang="ts">
import BreadCrumb from './BreadCrumb.vue'
</script>
<style lang="scss">
.layout-content {
  padding: 24px;
  height: 100%;
  .layout-content-main {
    margin-top: 10px;
    height: calc(100% - 32px);
    background-color: #fff;
  }
}
</style>
