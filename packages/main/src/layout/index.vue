<template>
  <div class="app">
    <el-scrollbar style="width: 100%">
      <div :id="dialogToKey.PAGE_CONTAINER" class="app-container">
        <layout-header class="app-container__header" />
        <layout-tabs class="app-container__tabs" />
        <suspense>
          <div class="app-container__main">
            <el-scrollbar style="height: 100%">
              <router-view v-slot="{ Component }">
                <keep-alive>
                  <component
                    :id="dialogToKey.PAGE_TABS_CONTAINER"
                    :key="route.path"
                    :is="Component"
                    v-if="route.meta.keepAlive"
                  />
                </keep-alive>
                <component
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
import { useRoute } from 'vue-router'
import layoutHeader from './layoutHeader/index.vue'
import layoutTabs from './layoutTabs/index.vue'
import * as dialogToKey from '@/configs/dialog-to-key'

const route = useRoute()
</script>
<style lang="scss" scoped>
.app {
  width: 100vw;
  height: 100vh;
}

.app-container {
  position: relative;
  display: grid;
  grid-template-areas:
    'app-container__header'
    'app-container__tabs'
    'app-container__main';
  grid-template-rows: 46px 40px calc(100vh - 46px - 40px);
  grid-template-columns: 1fr;
  width: 100vw;
  height: 100vh;
  min-width: 1200px;

  .app-container__header {
    grid-area: app-container__header;
    background-color: #438eb9;
  }

  .app-container__tabs {
    grid-area: app-container__tabs;
    background-color: #eff3f8;
  }

  .app-container__main {
    grid-area: app-container__main;
    transition: margin-left 0.5s ease;
    overflow: hidden; /** 防止触发app.vue纵向滚动条 */
  }
}
</style>
