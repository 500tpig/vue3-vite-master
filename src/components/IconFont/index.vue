<template>
  <icon-font :name="props.name" :type="props.name" :class="props.className" :style="{ fontSize: size + 'px', color: props.color }" />
</template>

<script setup lang="ts">
import { createFromIconfontCN } from '@ant-design/icons-vue'

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  className: {
    type: String,
    default: ''
  },
  color: {
    type: String,
    default: ''
  },
  size: {
    type: Number,
    default: 14
  }
})

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_3299347_76ytc9127ce.js'
  // extraCommonProps: { class, attrs, props, on, style  }
})
</script>

<style scope lang="scss"></style>
