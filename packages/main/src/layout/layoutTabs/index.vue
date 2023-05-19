<template>
  <div class="tabs-container">
    <el-tabs
      v-model="tabpane"
      type="border-card"
      @tab-remove="onClickRemoveTab"
      @tab-click="onClickTab"
    >
      <el-tab-pane
        v-for="item in showTabpanes"
        :key="item.id"
        :label="item.name"
        :closable="item.id === 'ROOT_HOME' ? false : true"
        :name="item.id"
      />
    </el-tabs>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive, watch } from 'vue'
import { useRouter } from 'vue-router'
import * as routeNames from '@/router/route-names'

interface ITabphane {
  id: string
  name: string
}
const router = useRouter()
const tabpane = ref('ROOT_HOME')
const tabpanes: Array<ITabphane> = reactive([
  {
    id: 'ROOT_HOME',
    name: '首页',
  },
  {
    id: 'PRODUCT_SUPPLIER_ADMINISTRATION',
    name: '供应商管理',
  },
  {
    id: 'SALE_ALLEGRO_PUBLISH',
    name: 'Allegro产品刊登',
  },
  {
    id: 'MAIN_SUPPLIER_INDEX',
    name: '供应商管理',
  },
])
const showTabpanes: Array<ITabphane> = reactive([
  {
    id: 'ROOT_HOME',
    name: '首页',
  },
])

watch(
  () => router.currentRoute.value,
  (val) => {
    const tempTabphane = showTabpanes.find((item) => item.id === val.name)
    const curTabphane = tabpanes.find((item) => item.id === val.name)
    if (!tempTabphane && curTabphane) {
      showTabpanes.push({ ...curTabphane })
      tabpane.value = curTabphane.id
    } else if (tempTabphane && curTabphane) {
      tabpane.value = curTabphane.id
    }
  },
  { immediate: true }
)

/** 点击标签页 */
const onClickTab = (pane) => {
  router.push({
    name: routeNames[pane.paneName],
  })
}
/** 移除标签页 */
const onClickRemoveTab = (name) => {
  const curTabphaneIndex = showTabpanes.findIndex((item) => item.id === name)
  if (curTabphaneIndex > -1) {
    showTabpanes.splice(curTabphaneIndex, 1)
    router.push({
      name: showTabpanes[showTabpanes.length - 1].id,
    })
  }
}
</script>
<style lang="scss" scoped>
.tabs-container {
  :deep(.el-tabs__content) {
    display: none;
  }

  :deep(.el-tabs--border-card) {
    border: none;
  }
}
</style>
