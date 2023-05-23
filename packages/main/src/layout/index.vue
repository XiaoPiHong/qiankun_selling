<template>
  <div class="app">
    <el-scrollbar style="width: 100%">
      <div
        :id="dialogToKey.PAGE_CONTAINER"
        :class="{ 'app-container': true, 'app-container-dev': independentDev }"
      >
        <layout-header class="app-container__header" v-if="independentDev" />
        <layout-tabs class="app-container__tabs" v-if="independentDev" />
        <suspense>
          <div class="app-container__main">
            <el-scrollbar style="height: 100%">
              <router-view v-slot="{ Component }">
                <keep-alive>
                  <component
                    :class="{ 'page-container': true, 'page-container-dev': independentDev }"
                    :id="dialogToKey.PAGE_TABS_CONTAINER"
                    :key="route.path"
                    :is="Component"
                    v-if="route.meta.keepAlive"
                  />
                </keep-alive>
                <component
                  :class="{ 'page-container': true, 'page-container-dev': independentDev }"
                  :id="dialogToKey.PAGE_TABS_CONTAINER"
                  :key="route.path"
                  :is="Component"
                  v-if="!route.meta.keepAlive"
                />
              </router-view>
            </el-scrollbar>
          </div>
        </suspense>
      </div>
    </el-scrollbar>
  </div>
</template>
<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import layoutHeader from './layoutHeader/index.vue'
import layoutTabs from './layoutTabs/index.vue'
import * as dialogToKey from '@/configs/dialog-to-key'

// const { VITE_ENGINEERING_URL } = import.meta.env
const route = useRoute()
// const independentDev = computed(
//   () => `${window.location.protocol}//${window.location.host}` === VITE_ENGINEERING_URL
// )
const independentDev = computed(() => window.parent.length === 0)
</script>
<style lang="scss">
.app-container-dev {
  grid-template-areas:
    'app-container__header'
    'app-container__tabs'
    'app-container__main';
  grid-template-rows: 46px 40px calc(100vh - 46px - 40px);
}

.page-container-dev {
  height: calc(100vh - 46px - 40px);
}
</style>
