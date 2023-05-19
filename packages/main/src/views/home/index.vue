<template>
  <div class="page-container">
    <iframe
      id="iframe"
      src="/main#/supplier/index"
      frameborder="0"
      width="100%"
      height="100%"
      v-show="show"
    ></iframe>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue'

const show = ref(false)
onMounted(() => {
  const iframe: any = document.getElementById('iframe')
  if (iframe) {
    iframe.onload = async () => {
      const style = document.createElement('style')
      style.innerHTML =
        '.navbar { display: none !important; } .tabbable > div:first-child { display: none !important; }'
      iframe.contentWindow.document.body.appendChild(style)
      show.value = true
    }
  }
})
</script>
