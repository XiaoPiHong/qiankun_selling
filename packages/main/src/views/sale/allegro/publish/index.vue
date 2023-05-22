<template>
  <div class="page-container">
    <div class="page-container__control">
      <my-button v-for="item in buttons" :key="item.text" :prop="item" />
      <my-search-form :form="searchForm" />
    </div>
    <div class="page-container__content">
      <div class="page-container__content__table">
        <vxe-table
          height="100%"
          class="mytable-scrollbar"
          stripe
          border
          :loading="table.loading"
          :column-config="table.columnConfig"
          :data="table.data"
          :sort-config="table.sortConfig"
          :scroll-y="{ enabled: false }"
          @checkbox-change="onSelectionChange"
          @checkbox-all="onSelectionChange"
          @sort-change="onSortChange"
        >
          <vxe-column type="checkbox" align="center" width="60"></vxe-column>
          <vxe-column
            v-for="column of columns"
            :key="column.prop"
            :field="column.prop"
            :sortable="column.sortable"
            :min-width="column.minWidth"
            :align="column.align"
            :title="column.label"
          >
            <template #default="{ row }">
              <template v-if="column.prop === 'Image'">
                <img
                  style="vertical-align: middle"
                  :src="row.Image.split('|')[0]"
                  :width="60"
                  :height="60"
                />
                <el-dropdown class="image__dropdown">
                  <el-button text type="primary">
                    来源 <svg-icon iconClass="button-drop-down"></svg-icon
                  ></el-button>
                  <template #dropdown>
                    <el-dropdown-menu>
                      <div>
                        <el-dropdown-item
                          ><svg-icon iconClass="button-edit-filling"></svg-icon
                          >编辑来源</el-dropdown-item
                        >
                      </div>
                      <div @click="() => onClickSearchSourceUrl(row)">
                        <el-dropdown-item
                          ><svg-icon iconClass="button-search"></svg-icon>查找来源</el-dropdown-item
                        >
                      </div>
                      <div
                        v-for="item in getSourcePlatformDropdownItem(row.SourceUrl)"
                        :key="item.url"
                        @click="() => onClickOpenSourceUrl(item.url)"
                      >
                        <el-dropdown-item divided>{{ item.label }}</el-dropdown-item>
                      </div>
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
              </template>
              <template v-else-if="column.prop === 'OfferName'">
                <div :title="row.OfferName" class="text-hidden">{{ row.OfferName }}</div>
                <div :title="row.OfferId" class="text-hidden">{{ row.OfferId }}</div>
                <div :title="row.StoreName" class="text-hidden">{{ row.StoreName }}</div>
                <div :title="row.ShowCategoryName" class="text-hidden">
                  {{ row.ShowCategoryName }}
                </div>
              </template>
              <!-- 操作列 -->
              <template v-else-if="column.prop === 'operate'">
                <div class="operate__group">
                  <el-button text type="primary">编辑</el-button>
                  <el-dropdown>
                    <el-button text type="primary">
                      更多 <svg-icon iconClass="button-drop-down"></svg-icon
                    ></el-button>
                    <template #dropdown>
                      <el-dropdown-menu>
                        <div @click="() => onClickSingleCopy(row)">
                          <el-dropdown-item>复制</el-dropdown-item>
                        </div>
                        <div @click="() => onClickSingleRemark(row)">
                          <el-dropdown-item>备注</el-dropdown-item>
                        </div>
                        <div @click="() => onClickSingleDelete(row)">
                          <el-dropdown-item>删除</el-dropdown-item>
                        </div>
                      </el-dropdown-menu>
                    </template>
                  </el-dropdown>
                </div>
              </template>
              <template v-else-if="column.prop === 'Status'">
                <el-tag
                  style="color: #fff"
                  round
                  :color="AllegroPublishStatusColorEnum[row.Status]"
                  >{{ AllegroPublishStatusEnum[row.Status] || row.Status }}</el-tag
                >
              </template>
              <template v-else-if="column.prop === 'Operator'">
                <div>{{ row.Operator }}</div>
                <div>{{ row.OperatorTime }}</div>
              </template>
              <template v-else-if="column.prop === 'PlatformVariantSku'">
                <div class="more__dropdown">
                  <div class="more__dropdown__content">
                    <template v-for="(variant, index) in row.Variants" :key="variant.Id">
                      <div
                        v-show="index < row.collapseAuto"
                        :title="variant.PlatformVariantSku"
                        class="text-hidden"
                      >
                        {{ variant.PlatformVariantSku }}
                      </div>
                    </template>
                  </div>
                </div>
              </template>
              <template v-else-if="column.prop === 'Available'">
                <div class="more__dropdown">
                  <div class="more__dropdown__content">
                    <template v-for="(variant, index) in row.Variants" :key="variant.Id">
                      <div v-show="index < row.collapseAuto">{{ variant.Available }}</div>
                    </template>
                  </div>
                </div>
              </template>
              <!-- 价格折叠列 -->
              <template v-else-if="column.prop === 'Price'">
                <div class="more__dropdown">
                  <div class="more__dropdown__content">
                    <template v-for="(variant, index) in row.Variants" :key="variant.Id">
                      <div v-show="index < row.collapseAuto">{{ variant.Price }}</div>
                    </template>
                  </div>
                  <div
                    class="more__dropdown__icon"
                    v-if="row.Variants.length > row.collapseDefault"
                  >
                    <span @click="() => onClickPriceCollapse(row)">
                      <svg-icon
                        :iconClass="
                          row.collapseAuto === row.Variants.length ? 'angle-up' : 'angle-down'
                        "
                      ></svg-icon>
                    </span>
                  </div>
                </div>
              </template>
              <template v-else>
                <div :title="row[column.prop]">
                  {{ row[column.prop] }}
                </div>
              </template>
            </template>
          </vxe-column>
        </vxe-table>
      </div>
      <el-pagination
        class="page-container__content__pagination"
        v-model:current-page="pagination.currentPage"
        v-model:page-size="pagination.pageSize"
        small
        :page-sizes="pagination.pageSizes"
        :layout="pagination.layout"
        :total="pagination.total"
        background
        @size-change="() => getTableData()"
        @current-change="() => getTableData()"
      />
    </div>
    <my-form :form="form" @submit="(data) => onSubmitForm(data)" @close="() => onCloseForm()" />
    <!-- 分类组件 -->
    <vxe-tree :data="tree" @change="onVxeTreeChange" />
    <!-- 教程弹窗 -->
    <teaching-dialog v-model:show="teachingDialogData.show" :title="teachingDialogData.title" />
  </div>
</template>
<script lang="ts" setup>
import { reactive } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import teachingDialog from '@/components/teachingDialog/index.vue'
import VxeTree from '@/components/vxeTree/index.vue'
import { useButtons, useSearchForm, useForm, useVxeTree } from '@/composables'
import { usePageSearchForm, usePageTable, useCopyForm, useRemarkForm } from './composables'
import * as publishApi from '@/apis/sale/allegro/publish'
// import { transformTree } from '@/utils/tree'
import { TreeV2 } from '@/models/searchFormItems'
import { getOrderByParams, getSearchParams } from '@/utils/table-params'
import {
  AllegroPublishStatusEnum,
  AllegroPublishStatusColorEnum,
} from '@/enums/sale/allegro/publish'
import { getPlatformName } from '@/utils/platform'

enum FORM_TYPE {
  ADD = 'ADD',
  EDIT = 'EDIT',
  COPY = 'COPY',
  REMARK = 'REMARK',
  SINGLE_COPY = 'SINGLE_COPY',
  SINGLE_REMARK = 'SINGLE_REMARK',
  SINGLE_DELETE = 'SINGLE_DELETE',
}

const { buttons } = useButtons([
  {
    buttonType: 'success',
    text: '添加',
    icon: 'button-add',
    onClick: () => onClickAddBtn(),
  },
  {
    buttonType: 'success',
    text: '复制',
    icon: 'button-copy',
    onClick: () => onClickCopyBtn(),
  },
  {
    buttonType: 'primary',
    text: '编辑',
    icon: 'button-edit-filling',
    onClick: () => onClickEditBtn(),
  },
  {
    buttonType: 'primary',
    text: '批量发布',
    infoIcon: 'button-drop-down',
    type: 'dropdown',
    dropDownOptions: [
      {
        label: '立即发布',
        onClick: () => onClickReleaseImmediately(),
      },
      {
        label: '后台发布',
        onClick: () => onClickReleaseBackstage(),
      },
      {
        label: '取消发布',
        onClick: () => onClickReleaseCancel(),
      },
    ],
  },
  {
    buttonType: 'primary',
    text: '批量操作',
    infoIcon: 'button-drop-down',
    type: 'dropdown',
    dropDownOptions: [
      {
        label: '修改基础信息',
        onClick: () => onClickChangeBaseInfo(),
      },
      {
        label: '修改分类和参数',
        onClick: () => onClickChangeClass(),
      },
      {
        label: '备注',
        onClick: () => onClickChangeRemark(),
      },
      {
        label: '删除',
        onClick: () => onClickDelete(),
      },
      {
        label: '删除前1000行',
        onClick: () => onClickDeletePre1000(),
      },
    ],
  },
  {
    buttonType: 'primary',
    text: '设置分类',
    infoIcon: 'button-drop-down',
    onClick: (event) => {
      tree.show = true
      event.stopPropagation()
    },
  },
  {
    text: '使用技巧',
    color: '#9585bf',
    icon: 'button-tips',
    onClick: () => {
      teachingDialogData.show = true
    },
  },
])

const { form } = useForm()

const { tree } = useVxeTree({
  placeholder: '产品分类',
  checkboxConfig: {
    checkStrictly: true,
  },
  type: 'checkbox',
})

const teachingDialogData = reactive({
  show: false,
  title: '教程文档',
})

const { searchForm } = useSearchForm(
  usePageSearchForm({
    searchKeyInput: {
      onReset: () => onReset(),
      onSearch: () => onSearch(),
      onExpand: () => onExpand(),
    },
    Status: {
      onChange: () => onSearch(),
    },
  })
)
const { table, getTableData, onSortChange, columns, pagination, onSelectionChange } = usePageTable({
  dataApi: publishApi.postAllegroList,
  tableProps: {
    defaultSort: [
      {
        sortColumns: 'OperatorTime',
        order: 'desc',
      },
      {
        sortColumns: 'Id',
        order: 'desc',
      },
    ],
  },
  dataFormat: (data) =>
    data.map((row) => ({
      ...row,
      collapseAuto: 3, // 折叠变化值
      collapseDefault: 3, // 折叠默认值
    })),
  searchForm,
})

/** 监听重置 */
const onReset = () => {
  const searchFormList = usePageSearchForm()
  searchFormList.list.forEach((item) => {
    searchForm.resetListValue(item)
  })
  getTableData()
}
/** 监听搜索 */
const onSearch = () => {
  getTableData()
}
/** 监听展开 */
const onExpand = () => {
  searchForm.list.forEach((item) => {
    if (item.hidden) {
      item.show = !item.show
    }
  })
}
/** 监听编辑 */
const onClickEditBtn = () => {
  if (!table.selection.length) {
    return ElMessage({
      type: 'error',
      message: '请勾选需要操作的数据',
    })
  }
  if (table.selection.length > 1) {
    return ElMessage({
      type: 'error',
      message: '只能同时操作一行数据',
    })
  }
  // const { list } = usePageForm(table.selection[0])
  // form.update({
  //   type: FORM_TYPE.EDIT,
  //   show: true,
  //   title: '[编辑]供应商',
  //   list,
  // })
}
/** 监听添加 */
const onClickAddBtn = () => {
  // const { list } = usePageForm()
  // form.update({
  //   type: FORM_TYPE.ADD,
  //   show: true,
  //   title: '[新增]供应商',
  //   list,
  // })
}
/** 监听复制 */
const onClickCopyBtn = () => {
  if (!table.selection.length) {
    return ElMessage({
      type: 'error',
      message: '请勾选需要操作的数据',
    })
  }
  const { list } = useCopyForm()
  form.update({
    type: FORM_TYPE.COPY,
    show: true,
    title: '复制',
    list,
  })
}
/** 监听立即发布 */
const onClickReleaseImmediately = () => {
  if (!table.selection.length) {
    return ElMessage({
      type: 'error',
      message: '请勾选需要操作的数据',
    })
  }
  if (table.selection.some((item) => item.Status === 0)) {
    return ElMessage({
      type: 'error',
      message: '“草稿”状态，不可执行该操作，请先编辑完善产品信息',
    })
  }
  ElMessageBox.confirm(`是否确认要发布选中行（${table.selection.length}）`, {
    title: '信息',
    type: 'warning',
  }).then(() => {
    publishApi
      .postAllegroListingUploadAsyncReleaseOffer({
        ids: table.selection.map((item) => item.Id).join(','),
      })
      .then((res) => {
        ElMessage({
          type: 'success',
          message: res.Message,
        })
        getTableData()
      })
  })
}
/** 监听后台发布 */
const onClickReleaseBackstage = () => {
  if (!table.selection.length) {
    return ElMessage({
      type: 'error',
      message: '请勾选需要操作的数据',
    })
  }
  ElMessageBox.confirm(`是否确认要发布选中行（${table.selection.length}）`, {
    title: '信息',
    type: 'warning',
  }).then(() => {
    publishApi
      .postAllegroListingUploadReleaseOfferStatus({
        ids: table.selection.map((item) => item.Id).join(','),
      })
      .then((res) => {
        ElMessage({
          type: 'success',
          message: res.Message,
        })
        getTableData()
      })
  })
}
/** 监听取消发布 */
const onClickReleaseCancel = () => {
  if (!table.selection.length) {
    return ElMessage({
      type: 'error',
      message: '请勾选需要操作的数据',
    })
  }
  ElMessageBox.confirm(`是否确认要取消发布选中行（${table.selection.length}）`, {
    title: '信息',
    type: 'warning',
  }).then(() => {
    publishApi
      .postAllegroListingUploadUnPublish({
        ids: table.selection.map((item) => item.Id).join(','),
      })
      .then((res) => {
        ElMessage({
          type: 'success',
          message: res.Message,
        })
        getTableData()
      })
  })
}
/** 监听修改基础信息 */
const onClickChangeBaseInfo = () => {
  if (!table.selection.length) {
    return ElMessage({
      type: 'error',
      message: '请勾选需要操作的数据',
    })
  }
}
/** 监听点击修改分类和参数 */
const onClickChangeClass = () => {
  if (!table.selection.length) {
    return ElMessage({
      type: 'error',
      message: '请勾选需要操作的数据',
    })
  }
}
/** 监听点击备注 */
const onClickChangeRemark = () => {
  if (!table.selection.length) {
    return ElMessage({
      type: 'error',
      message: '请勾选需要操作的数据',
    })
  }
  const { list } = useRemarkForm()
  form.update({
    type: FORM_TYPE.REMARK,
    show: true,
    title: '备注',
    list,
  })
}
/** 监听点击删除 */
const onClickDelete = () => {
  if (!table.selection.length) {
    return ElMessage({
      type: 'error',
      message: '请勾选需要操作的数据',
    })
  }
  ElMessageBox.confirm(`是否确认要删除选中行（${table.selection.length}）`, {
    title: '信息',
    type: 'warning',
  }).then(() => {
    publishApi
      .postAllegroListingUploadDelete({ ids: table.selection.map((item) => item.Id).join(',') })
      .then((res) => {
        ElMessage({
          type: 'success',
          message: res.Data,
        })
        getTableData()
      })
  })
}
/** 监听删除前1000行 */
const onClickDeletePre1000 = () => {
  ElMessageBox.confirm(
    `该操作将删除当前页面排序+搜索条件的前1000行数据，删除数据无法恢复，请确认是否要删除？`,
    {
      title: '信息',
      type: 'warning',
    }
  ).then(() => {
    publishApi
      .postAllegroListingUploadBulkDelete({
        orderBy: getOrderByParams(table),
        search: getSearchParams(searchForm),
      })
      .then((res) => {
        ElMessage({
          type: 'success',
          message: res.Message,
        })
        getTableData()
      })
  })
}
/** 监听点击查找来源 */
const onClickSearchSourceUrl = (row) => {
  publishApi
    .postFileSearchSupplyUrl({
      imageUrl: row.Image.split('|')[0],
    })
    .then((res) => {
      ElMessage({
        type: 'success',
        message: res.Message,
      })
      const sourceUrl =
        res.Url && res.Url.includes('http')
          ? `https://kj.1688.com/pdt_tongkuan.html?imgUrl=${res.Url}`
          : `https://kj.1688.com/pdt_tongkuan.html?imgUrl=http:${res.Url}`
      if (sourceUrl && res.Url) window.open(sourceUrl, '_blank')
    })
}
/** 监听点击单个复制 */
const onClickSingleCopy = (row) => {
  const { list } = useCopyForm()
  form.update({
    type: FORM_TYPE.SINGLE_COPY,
    show: true,
    data: row,
    title: '复制',
    list,
  })
}
/** 监听点击单个备注 */
const onClickSingleRemark = (row) => {
  const { list } = useRemarkForm()
  form.update({
    type: FORM_TYPE.SINGLE_REMARK,
    show: true,
    data: row,
    title: '备注',
    list,
  })
}
/** 监听点击单个删除 */
const onClickSingleDelete = (row) => {
  ElMessageBox.confirm(`是否确认要删除选中行`, {
    title: '信息',
    type: 'warning',
  }).then(() => {
    publishApi.postAllegroListingUploadDelete({ ids: row.Id }).then((res) => {
      ElMessage({
        type: 'success',
        message: res.Data,
      })
      getTableData()
    })
  })
}
/**
 * 提交新增表单
 */
const postForm = (data) => {
  // data.Id = 0
  // publishApi.postSupplierAddAndEdit(data).then((res) => {
  //   onCloseForm()
  //   ElMessage({
  //     type: 'success',
  //     message: res.Message,
  //   })
  //   getTableData()
  // })
}

/**
 * 提交编辑表单
 */
const putForm = (data) => {
  // data.Id = table.selection[0].Id
  // publishApi.postSupplierAddAndEdit(data).then((res) => {
  //   onCloseForm()
  //   ElMessage({
  //     type: 'success',
  //     message: res.Message,
  //   })
  //   getTableData()
  // })
}

/** 提交复制 */
const copyForm = (data) => {
  data.ids = table.selection.map((item) => item.Id).join(',')
  data.StoreIds = data.StoreIds.join(',')
  publishApi.postAllegroListingUploadCopySave(data).then((res) => {
    onCloseForm()
    ElMessage({
      type: 'success',
      message: res.Message,
    })
    getTableData()
  })
}

/** 提交备注 */
const remarkForm = (data) => {
  data.ids = table.selection.map((item) => item.Id).join(',')
  data.ColorSelect = 'on'
  publishApi.postAllegrolistinguploadSetEditRemark(data).then((res) => {
    onCloseForm()
    ElMessage({
      type: 'success',
      message: res.Message,
    })
    getTableData()
  })
}
/** 提交单个复制 */
const singleCopyForm = (data) => {
  data.ids = form.data.Id
  data.StoreIds = data.StoreIds.join(',')
  publishApi.postAllegroListingUploadCopySave(data).then((res) => {
    onCloseForm()
    ElMessage({
      type: 'success',
      message: res.Message,
    })
    getTableData()
  })
}
/** 提交单个备注 */
const singleRemarkForm = (data) => {
  data.ids = form.data.Id
  data.ColorSelect = 'on'
  publishApi.postAllegrolistinguploadSetEditRemark(data).then((res) => {
    onCloseForm()
    ElMessage({
      type: 'success',
      message: res.Message,
    })
    getTableData()
  })
}

/**
 * 监听提交表单事件
 */
const onSubmitForm = (data) => {
  switch (form.type) {
    case FORM_TYPE.ADD:
      return postForm(data)
    case FORM_TYPE.EDIT:
      return putForm(data)
    case FORM_TYPE.COPY:
      return copyForm(data)
    case FORM_TYPE.REMARK:
      return remarkForm(data)
    case FORM_TYPE.SINGLE_COPY:
      return singleCopyForm(data)
    case FORM_TYPE.SINGLE_REMARK:
      return singleRemarkForm(data)
  }
}

/** 监听表单关闭事件 */
const onCloseForm = () => {
  form.update({
    show: false,
  })
}

/** 获取类目 */
const getProductCategory = () => {
  publishApi.postProductCategoryReLoad({ parentIdTree: '' }).then((res) => {
    // const tree = transformTree(-1, res, {
    //   idKey: 'id',
    //   parentIdKey: 'pId',
    //   formatNode: ({ id, data, children }) => ({
    //     id,
    //     children,
    //     label: data.name,
    //   }),
    // })
    const ProductCategoryId = searchForm.getListItem('ProductCategoryId')
    if (ProductCategoryId instanceof TreeV2) {
      ProductCategoryId.props.expandRowKeys = res.filter((item) => item.open).map((item) => item.id)
      ProductCategoryId.nodeList = res
    }

    tree.props.expandRowKeys = res.filter((item) => item.open).map((item) => item.id)
    tree.nodeList = res
  })
}

/** 获取来源平台下拉 */
const getSourcePlatformDropdownItem = (sourceUrl) => {
  const dropdownItem: { url: string; platform: string; label: string }[] = []
  const flag = sourceUrl.split(',').length === 1
  const sourceUrlArr = flag ? sourceUrl.split('|') : sourceUrl.split(',')
  sourceUrlArr.forEach((url) => {
    if (url) {
      const platform = getPlatformName(url)
      dropdownItem.push({
        url,
        platform,
        label: `来源${dropdownItem.length + 1}：${platform}`,
      })
    }
  })
  return dropdownItem
}

/** 监听点击来源链接 */
const onClickOpenSourceUrl = (url) => {
  window.open(url, '_blank ')
}

/** 监听点击折叠按钮 */
const onClickPriceCollapse = (row) => {
  row.collapseAuto =
    row.collapseAuto === row.Variants.length ? row.collapseDefault : row.Variants.length
}

/** 监听树选择 */
const onVxeTreeChange = (value) => {
  if (value.length) {
    if (!table.selection.length) {
      return ElMessage({
        type: 'error',
        message: '请勾选需要操作的数据',
      })
    }
    tree.value = value
    ElMessageBox.confirm(`是否确认要修改分类（选中行${table.selection.length}）`, {
      title: '信息',
      type: 'warning',
    }).then(() => {
      tree.show = false
      publishApi
        .postAllegroListingUploadSetProductCategroy({
          ids: JSON.stringify({
            Ids: table.selection.map((item) => item.Id),
            CategoryId: value[0],
          }),
        })
        .then((res) => {
          ElMessage({
            type: 'success',
            message: res.Message,
          })
          getTableData()
        })
        .finally(() => {
          tree.value = []
        })
    })
  }
}

getTableData()
getProductCategory()
</script>
<style lang="scss" scoped>
.page-container__content__table {
  .image__dropdown {
    :deep(.el-button:focus-visible) {
      outline: unset;
    }
  }

  .operate__group {
    display: flex;
    flex-direction: column;
    align-items: center;

    :deep(.el-button:focus-visible) {
      outline: unset;
    }
  }

  .more__dropdown {
    position: relative;
    display: flex;

    .more__dropdown__content {
      flex: 1;
      width: 0;
    }

    .more__dropdown__icon {
      display: flex;
      font-size: 18px;
      flex-direction: column;
      justify-content: end;

      span:hover {
        cursor: pointer;
        background-color: #ccc;
      }
    }
  }
}
</style>
