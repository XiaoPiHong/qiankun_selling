<template>
  <div class="page-container">
    <div id="jquery-container"></div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted } from 'vue'

const emit = defineEmits(['loadApp'])
onMounted(() => {
  emit('loadApp')
})
</script>
<style lang="scss" scoped></style>
