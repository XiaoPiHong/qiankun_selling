import { TableColumn } from '@/models'
import { useTable, IUseTableProps } from '@/composables'

export default function (props: IUseTableProps) {
  const tableColumns = [
    new TableColumn({
      prop: 'SupplierName',
      label: '供应商名称/地址',
      minWidth: '100',
      align: 'center',
      sortable: false,
    }),
    new TableColumn({
      prop: 'WebSite',
      label: '到货周期/产品网址',
      minWidth: '100',
      align: 'center',
      sortable: false,
    }),
    new TableColumn({
      prop: 'SettlementMethod',
      label: '结算方式/支付方式',
      minWidth: '120',
      align: 'center',
      sortable: true,
    }),
    new TableColumn({
      prop: 'BankName',
      label: '开户人/银行名称/银行账号',
      minWidth: '180',
      align: 'center',
      sortable: false,
    }),
    new TableColumn({
      prop: 'Contacts',
      label: '联系人/手机/电话',
      minWidth: '100',
      align: 'center',
      sortable: false,
    }),
    new TableColumn({
      prop: 'QQ',
      label: 'QQ/邮箱/旺旺',
      minWidth: '100',
      align: 'center',
      sortable: false,
    }),
    new TableColumn({
      prop: 'Remark',
      label: '备注',
      minWidth: '100',
      align: 'center',
      sortable: false,
    }),
  ]
  const { table, pagination, columns, getTableData, onSortChange, onSelectionChange } = useTable(
    tableColumns,
    props
  )

  return {
    table,
    columns,
    pagination,
    getTableData,
    onSortChange,
    onSelectionChange,
  }
}
