import { TableColumn } from '@/models'
import { useTable, IUseTableProps } from '@/composables'

export default function (props: IUseTableProps) {
  const tableColumns = [
    new TableColumn({
      prop: 'Image',
      label: '图片',
      minWidth: '70',
      align: 'center',
      sortable: false,
    }),
    new TableColumn({
      prop: 'OfferName',
      label: '标题/OfferID/店铺/分类',
      minWidth: '150',
      align: 'left',
      sortable: false,
    }),
    new TableColumn({
      prop: 'Status',
      label: '状态',
      minWidth: '100',
      align: 'left',
      sortable: false,
    }),
    new TableColumn({
      prop: 'operate',
      label: '操作',
      minWidth: '100',
      align: 'center',
      sortable: false,
    }),
    new TableColumn({
      prop: 'AfterSalesTypeName',
      label: '运输价格表',
      minWidth: '100',
      align: 'left',
      sortable: false,
    }),
    new TableColumn({
      prop: 'Operator',
      label: '操作人/审核信息',
      minWidth: '120',
      align: 'left',
      sortable: false,
    }),
    new TableColumn({
      prop: 'PlatformVariantSku',
      label: 'SKU',
      minWidth: '100',
      align: 'left',
      sortable: false,
    }),
    new TableColumn({
      prop: 'Available',
      label: '库存',
      minWidth: '100',
      align: 'left',
      sortable: false,
    }),
    new TableColumn({
      prop: 'Price',
      label: '价格(PLN)',
      minWidth: '100',
      align: 'left',
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
