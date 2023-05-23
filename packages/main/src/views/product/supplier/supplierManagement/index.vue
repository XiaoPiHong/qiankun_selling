<template>
  <div>
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
              <template v-if="column.prop === 'SupplierName'">
                <div class="text-hidden" :title="row.SupplierName">{{ row.SupplierName }}</div>
                <div class="text-hidden" :title="row.SupplierAddress">
                  {{ row.SupplierAddress }}
                </div>
              </template>
              <template v-else-if="column.prop === 'WebSite'">
                <div class="text-hidden" :title="row.ArrivalPeriod">
                  {{ row.ArrivalPeriod }}{{ row.WebSite ? '天' : '' }}
                </div>
                <div class="text-hidden" :title="row.WebSite">
                  <a target="_blank" :href="row.WebSite">{{ row.WebSite }}</a>
                </div>
              </template>
              <template v-else-if="column.prop === 'SettlementMethod'">
                <div
                  class="text-hidden"
                  :title="SettlementMethodEnum[row.SettlementMethod] || row.SettlementMethod"
                >
                  {{ SettlementMethodEnum[row.SettlementMethod] || row.SettlementMethod }}
                </div>
                <div
                  class="text-hidden"
                  :title="PaymentMethodEnum[row.PaymentMethod] || row.PaymentMethod"
                >
                  {{ PaymentMethodEnum[row.PaymentMethod] || row.PaymentMethod }}
                </div>
              </template>
              <template v-else-if="column.prop === 'BankName'">
                <div class="text-hidden" :title="row.AccountUserName">
                  {{ row.AccountUserName }}
                </div>
                <div class="text-hidden" :title="row.BankAccount">{{ row.BankAccount }}</div>
                <div class="text-hidden" :title="row.BankName">{{ row.BankName }}</div>
              </template>
              <template v-else-if="column.prop === 'Contacts'">
                <div class="text-hidden" :title="row.Contacts">
                  {{ row.Contacts }}
                </div>
                <div class="text-hidden" :title="row.MobilePhone">{{ row.MobilePhone }}</div>
                <div class="text-hidden" :title="row.Telephone">{{ row.Telephone }}</div>
              </template>
              <template v-else-if="column.prop === 'QQ'">
                <div class="text-hidden" :title="row.QQ">
                  {{ row.QQ }}
                </div>
                <div class="text-hidden" :title="row.Mailbox">{{ row.Mailbox }}</div>
                <div class="text-hidden" :title="row.Wangwang">{{ row.Wangwang }}</div>
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
  </div>
</template>
<script lang="ts" setup>
import { ElMessage, ElMessageBox } from 'element-plus'
import { useButtons, useSearchForm, useForm } from '@/composables'
import { usePageSearchForm, usePageTable, usePageForm, useUploadPageForm } from './composables'
import * as supplierApi from '@/apis/product/supplier/supplierManagement'
import {
  PaymentMethodEnum,
  SettlementMethodEnum,
} from '@/enums/product/supplier/supplierManagement'

enum FORM_TYPE {
  ADD = 'ADD',
  EDIT = 'EDIT',
  IMPORT = 'IMPORT',
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
    text: '导入',
    icon: 'button-file-import',
    onClick: () => onClickImportBtn(),
  },
  {
    buttonType: 'primary',
    text: '编辑',
    icon: 'button-edit-filling',
    onClick: () => onClickEditBtn(),
  },
  {
    buttonType: 'danger',
    text: '删除',
    icon: 'button-delete',
    onClick: () => onClickDeleteBtn(),
  },
])

const { form } = useForm()

const { searchForm } = useSearchForm(
  usePageSearchForm({
    searchKeyInput: {
      onReset: () => onReset(),
      onSearch: () => onSearch(),
      onExpand: () => onExpand(),
    },
  })
)
const { table, getTableData, onSortChange, columns, pagination, onSelectionChange } = usePageTable({
  dataApi: supplierApi.getSupplierList,
  tableProps: {
    defaultSort: [{ order: 'desc', sortColumns: 'Id' }],
  },
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
/** 监听删除 */
const onClickDeleteBtn = () => {
  if (!table.selection.length) {
    return ElMessage({
      type: 'error',
      message: '请勾选需要删除的数据',
    })
  }
  ElMessageBox.confirm(`是否确认删除选中行（${table.selection.length}）`, {
    title: '信息',
    type: 'warning',
  }).then(() => {
    supplierApi
      .deleteSupplier({ ids: table.selection.map((item) => item.Id).join(',') })
      .then((res) => {
        ElMessage({
          type: 'success',
          message: res.Data,
        })
        getTableData()
      })
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
  const { list } = usePageForm(table.selection[0])
  form.update({
    type: FORM_TYPE.EDIT,
    show: true,
    title: '[编辑]供应商',
    list,
  })
}
/** 监听添加 */
const onClickAddBtn = () => {
  const { list } = usePageForm()
  form.update({
    type: FORM_TYPE.ADD,
    show: true,
    title: '[新增]供应商',
    list,
  })
}
/** 监听导入 */
const onClickImportBtn = () => {
  const { list } = useUploadPageForm()
  form.update({
    type: FORM_TYPE.IMPORT,
    show: true,
    title: '导入供应商',
    list,
  })
}
/**
 * 提交新增表单
 */
const postForm = (data) => {
  data.Id = 0
  supplierApi.postSupplierAddAndEdit(data).then((res) => {
    onCloseForm()
    ElMessage({
      type: 'success',
      message: res.Message,
    })
    getTableData()
  })
}

/**
 * 提交编辑表单
 */
const putForm = (data) => {
  data.Id = table.selection[0].Id
  supplierApi.postSupplierAddAndEdit(data).then((res) => {
    onCloseForm()
    ElMessage({
      type: 'success',
      message: res.Message,
    })
    getTableData()
  })
}

/** 提交供应商导入 */
const importForm = (data) => {
  const formData = new FormData()
  formData.append('fileExcel', data.fileExcel[0].raw)
  supplierApi.importSupplierExcelSave(formData).then((res) => {
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
    case FORM_TYPE.IMPORT:
      return importForm(data)
  }
}

/** 监听表单关闭事件 */
const onCloseForm = () => {
  form.update({
    show: false,
  })
}

getTableData()
</script>
