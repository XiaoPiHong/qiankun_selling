<template>
  <div v-show="data.show" class="container-component">
    <el-input
      class="container-component__input"
      :model-value="_value"
      :placeholder="data.placeholder"
      readonly
      @click.stop="onClickDropDown"
    ></el-input>
    <div class="container-component__collapse" @click.stop v-show="collapse">
      <el-input style="width: 300px" v-model="query" placeholder="搜索" @keyup="onQueryChanged" />
      <div class="container-component__collapse__tree">
        <vxe-table
          v-if="refresh"
          height="100%"
          ref="treeEl"
          :show-header="false"
          :column-config="{ resizable: false }"
          :tree-config="{
            transform: true,
            rowField: data.props.rowField,
            parentField: data.props.parentField,
            expandAll: data.props.expandAll,
            expandRowKeys: data.props.expandRowKeys,
          }"
          :data="nodeList"
          :checkbox-config="{
            labelField: data.checkboxConfig.labelField,
            checkStrictly: data.checkboxConfig.checkStrictly,
            showHeader: false,
            checkRowKeys: data.getValue(),
          }"
          :row-config="{
            keyField: data.rowConfig.keyField,
          }"
          @checkbox-change="onChange"
        >
          <vxe-column type="checkbox" tree-node></vxe-column>
        </vxe-table>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted, computed, watch, toRefs, onBeforeUnmount, nextTick } from 'vue'
import XEUtils from 'xe-utils'
import { TreeV2 } from '@/models/searchFormItems'

const props = defineProps({
  data: {
    type: TreeV2,
    required: true,
  },
})
const emit = defineEmits(['change'])
const treeEl = ref()
const query = ref('')
const { data } = toRefs(props)
const nodeList = ref([])
const refresh = ref(true)
const collapse = ref(false)
/** input显示勾选项内容 */
const _value = computed(() =>
  nodeList.value
    .filter(
      (item) =>
        data.value
          .getValue()
          .findIndex((rowField) => rowField === item[data.value.props.rowField]) > -1
    )
    .map((item) => item[data.value.checkboxConfig.labelField])
    .join(',')
)
const timer = ref()
/** 默认展开的节点 */
const _expand = computed(() =>
  nodeList.value.filter(
    (item) =>
      data.value.props.expandRowKeys.findIndex(
        (rowField) => rowField === item[data.value.props.rowField]
      ) > -1
  )
)
onMounted(() => {
  /** 监听值变化，勾选对应选项 */
  watch(
    () => data.value.getValue(),
    (value) => {
      if (value.length) {
        treeEl.value.setCheckboxRow(
          nodeList.value.filter(
            (item) =>
              value.findIndex((rowField) => rowField === item[data.value.props.rowField]) > -1
          ),
          true
        )
      } else {
        treeEl.value.clearCheckboxRow()
      }
    },
    {
      immediate: true,
    }
  )
  /** 监听树变化，重新渲染视图 */
  watch(
    () => data.value.nodeList,
    (value) => {
      nodeList.value = [...value]
      refresh.value = false
      nextTick(() => {
        refresh.value = true
      })
    },
    {
      immediate: true,
    }
  )
  document.addEventListener('click', collapseEvent)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', collapseEvent)
})

/** 点击文档任何地方取消折叠 */
const collapseEvent = () => {
  collapse.value = false
}
/** 折叠 */
const onClickDropDown = () => {
  collapse.value = !collapse.value
}

/** 搜索 */
const onQueryChanged = () => {
  clearTimeout(timer.value)
  timer.value = null
  setTimeout(() => {
    const filterName = XEUtils.toValueString(query.value).trim().toLowerCase()
    if (filterName) {
      // const filterRE = new RegExp(filterName, 'gi')
      const list = data.value.nodeList.filter(
        (item) =>
          XEUtils.toValueString(item[data.value.checkboxConfig.labelField])
            .toLowerCase()
            .indexOf(filterName) > -1
      )
      // list.forEach((item) => {
      //   item[data.value.checkboxConfig.labelField] = XEUtils.toValueString(
      //     item[data.value.checkboxConfig.labelField]
      //   ).replace(filterRE, (match) => `<span class="keyword-lighten">${match}</span>`)
      // })
      const parentArr = []
      const findParent = (item) => {
        const temp = data.value.nodeList.find(
          (node) => node[data.value.props.rowField] === item[data.value.props.parentField]
        )
        if (temp) {
          parentArr.push(temp)
          findParent(temp)
        }
      }
      list.forEach((item) => {
        findParent(item)
      })
      nodeList.value = [...list, ...parentArr]
      nextTick(() => {
        treeEl.value.setAllTreeExpand(true)
        clearTimeout(timer.value)
        timer.value = null
      })
    } else {
      nodeList.value = [...data.value.nodeList]
      nextTick(() => {
        treeEl.value.setTreeExpand(_expand.value, true)
        clearTimeout(timer.value)
        timer.value = null
      })
    }
  }, 250)
}

const onChange = (checked) => {
  // 单选 + 勾选 + 父子不关联模式
  treeEl.value.clearCheckboxRow()
  if (!data.value.multiple && checked.checked && data.value.checkboxConfig.checkStrictly) {
    emit('change', [checked.row[data.value.props.rowField]])
  } else {
    emit(
      'change',
      checked.records.map((item) => item[data.value.props.rowField])
    )
  }
}
</script>
<style lang="scss" scoped>
.container-component {
  flex-basis: 10%;
  margin-right: 10px;
  margin-bottom: 10px;

  .container-component__collapse {
    overflow: hidden;
    padding: 5px 15px;
    position: absolute;
    left: 10%;
    right: 10%;
    top: 40px;
    bottom: 10%;
    z-index: 2001;
    border-radius: 8px;
    background-color: #fff;
    box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
    display: flex;
    flex-direction: column;

    .container-component__collapse__tree {
      flex: 1;
      height: 0;
    }
  }
}

// .keyword-lighten {
//   color: #000;
//   background-color: #ff0;
// }
</style>
