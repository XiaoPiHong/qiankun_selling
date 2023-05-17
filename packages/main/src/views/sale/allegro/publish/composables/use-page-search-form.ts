import {
  SingleSelect,
  SearchKeyInput,
  RangeInput,
  SingleCheckBoxButton,
  RangeDateTimePicker,
  TreeV2,
} from '@/models/searchFormItems'

export default function (formConfig: { [key: string]: any } = {}) {
  const { searchKeyInput, Status } = formConfig
  return {
    list: [
      new SingleCheckBoxButton({
        prop: 'Status',
        options: [
          { value: '', label: '全部', cname: 'Status', tname: 'alu', operate: 'eq' },
          { value: '0', label: '待完善', cname: 'Status', tname: 'alu', operate: 'eq' },
          { value: '1', label: '待刊登', cname: 'Status', tname: 'alu', operate: 'eq' },
          { value: '4', label: '发布中', cname: 'Status', tname: 'alu', operate: 'eq' },
          { value: '2', label: '成功', cname: 'Status', tname: 'alu', operate: 'eq' },
          { value: '3', label: '失败', cname: 'Status', tname: 'alu', operate: 'eq' },
        ],
        ...Status,
      }),
      new TreeV2({
        prop: 'ProductCategoryId',
        placeholder: '产品分类',
        options: [
          {
            value: '',
            label: '',
            cname: 'ParentIdTree',
            tname: 'pc',
            operate: 'LeftLike',
          },
        ],
        checkboxConfig: {
          checkStrictly: true,
        },
      }),
      new SingleSelect({
        prop: 'AfterSalesTypeId',
        placeholder: '运输价格表',
        options: [
          {
            value: 'b7e6f605-05c9-4c3a-8d3a-bfa1e119118c',
            label: '7657',
            cname: 'AfterSalesTypeId',
            tname: 'aass',
            operate: 'eq',
          },
          {
            value: 'e898c3e7-92e0-4435-b978-07c51f582d2d',
            label: 'sandbox shipping rule',
            cname: 'AfterSalesTypeId',
            tname: 'aass',
            operate: 'eq',
          },
        ],
      }),
      new SingleSelect({
        prop: 'Title',
        placeholder: '重复项',
        options: [
          {
            value: '1',
            label: '重复标题',
            cname: 'Title',
            tname: 'alu',
            operate: 'eq',
          },
        ],
      }),
      new RangeInput({
        prop: 'Price',
        options: [
          {
            value: 'Price',
            label: '价格',
            cname: 'Price',
            tname: 'alu',
          },
        ],
        preOption: { operate: 'GreatEq' },
        appendOption: { operate: 'LessEq' },
        value: { key: 'Price', value: ['', ''] },
      }),
      new RangeDateTimePicker({
        prop: 'OperatorTime',
        options: [
          {
            value: 'OperatorTime',
            label: '最后操作时间',
            cname: 'OperatorTime',
            tname: 'alu',
          },
        ],
        preOption: { operate: 'GreatEq' },
        appendOption: { operate: 'LessEq' },
        valueFormat: 'YYYY-MM-DD',
        value: { key: 'OperatorTime', value: ['', ''] },
      }),
      new SearchKeyInput({
        prop: 'SearchKeyInput',
        options: [
          {
            value: 'PlatformParentSku',
            label: 'SKU',
            cname: 'PlatformParentSku',
            tname: 'alu',
            operate: 'like',
          },
          { value: 'BatchSku', label: 'SKU(批量)', cname: 'BatchSku', tname: 'alu', operate: 'in' },
          { value: 'OfferId', label: 'Offer ID', cname: 'OfferId', tname: 'alu', operate: 'in' },
          {
            value: 'CategoryNmae',
            label: '分类名',
            cname: 'CategoryNmae',
            tname: 'ac',
            operate: 'LeftLike',
          },
          { value: 'OfferName', label: '标题', cname: 'OfferName', tname: 'alu', operate: 'like' },
          { value: 'Operator', label: '操作人', cname: 'Operator', tname: 'alu', operate: 'in' },
          { value: 'Remark', label: '备注', cname: 'Remark', tname: 'alu', operate: 'like' },
        ],
        value: { key: 'PlatformParentSku', value: '' },
        ...searchKeyInput,
      }),
    ],
  }
}
