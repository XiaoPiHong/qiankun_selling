<template>
  <svg :class="svgClass" aria-hidden="true" :style="{ color }">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps({
  iconClass: {
    // 文件夹名称-文件名称
    type: String,
    required: true,
  },
  className: {
    type: String,
    default: '',
  },
  color: {
    type: String,
    default: '',
  },
})
const iconName = computed(() => `#icon-${props.iconClass}`)
const svgClass = computed(() => {
  if (props.className) {
    return `svg-icon ${props.className}`
  }
  return 'svg-icon'
})
</script>

<style lang="scss" scoped>
.svg-icon {
  vertical-align: -0.15em;
  overflow: hidden;
  width: 1em;
  height: 1em;
  fill: currentcolor;
}
</style>
