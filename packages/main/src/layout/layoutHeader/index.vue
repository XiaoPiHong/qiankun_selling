<template>
  <div class="header-container">
    <div class="header-container__logo">
      <img
        style="margin-left: 20px; width: 148px; vertical-align: middle"
        src="@/assets/images/top-logo.png"
      />
    </div>
    <div class="header-container__nav">
      <el-menu
        style="height: 100%"
        mode="horizontal"
        :collapse-transition="false"
        unique-opened
        @select="onSelectMenu"
      >
        <template v-for="topItem in navTree" :key="topItem.id">
          <!-- 一级 -->
          <el-menu-item v-if="topItem.children.length === 0" :index="topItem.id">
            {{ topItem.name }}
          </el-menu-item>
          <!-- 多级 -->
          <template v-else>
            <el-sub-menu :index="topItem.id">
              <template #title>
                <span>{{ topItem.name }}</span>
              </template>
              <el-menu-item-group
                v-for="secondItem in topItem.children"
                :key="secondItem.id"
                :title="secondItem.name"
              >
                <el-menu-item
                  v-for="thirdItem in secondItem.children"
                  :key="thirdItem.id"
                  :index="thirdItem.id"
                >
                  {{ thirdItem.name }}
                </el-menu-item>
              </el-menu-item-group>
            </el-sub-menu>
          </template>
        </template>
      </el-menu>
    </div>
    <div class="header-container__info"></div>
  </div>
</template>
<script lang="ts" setup>
import { useRouter } from 'vue-router'
import * as routeNames from '@/router/route-names'

interface INavThree {
  id: string
  name: string
  children: INavThree[]
}
const router = useRouter()
const navTree: Array<INavThree> = [
  {
    id: 'ROOT_HOME',
    name: '首页',
    children: [],
  },
  {
    id: 'SALE',
    name: '销售',
    children: [
      {
        id: 'ALLEGRO',
        name: 'Allegro',
        children: [
          {
            id: 'SALE_ALLEGRO_PUBLISH',
            name: '产品刊登',
            children: [],
          },
        ],
      },
    ],
  },
  {
    id: 'PRODUCT',
    name: '产品',
    children: [
      {
        id: 'SUPPILER',
        name: '供应商',
        children: [
          {
            id: 'PRODUCT_SUPPLIER_ADMINISTRATION',
            name: '供应商管理',
            children: [],
          },
        ],
      },
    ],
  },
]
/** 菜单选中 */
const onSelectMenu = (name) => {
  router.push({
    name: routeNames[name],
  })
}
</script>
<style lang="scss" scoped>
.header-container {
  display: flex;
  align-items: center;
  height: 46px;

  .header-container__logo {
    width: 168px;
  }

  .header-container__nav {
    flex: 1;
    padding: 0 20px;
    width: 0;
    height: 100%;

    :deep(.el-menu--horizontal) {
      border-bottom: none;
      background-color: var(--primary-color);

      > .el-menu-item {
        border-bottom: none;
        color: #fff !important;
      }

      .el-sub-menu__title {
        border-bottom: none;
        color: #fff !important;
      }

      > .el-menu-item:not(.is-disabled):hover {
        background-color: var(--primary-dark-color);
      }

      > .el-menu-item:not(.is-disabled):focus {
        background-color: unset;
      }

      .el-sub-menu__title:hover {
        background-color: var(--primary-dark-color);
      }
    }
  }

  .header-container__info {
    width: 320px;
  }
}

:deep(.el-menu-item) {
  color: var(--primary-color) !important;
}
</style>
