import { reactive, toRaw } from 'vue'
import { Table, TableColumn, IPaginationProps, ITableProps, ISearchFormProps } from '@/models'
import { usePagination } from '@/composables'
import { getOrderByParams, getSearchParams } from '@/utils/table-params'

export interface IUseTableProps {
  dataApi: (...args: any[]) => Promise<any>
  dataFormat?: (data: any[]) => any[]
  paginationProps?: IPaginationProps
  tableProps?: ITableProps
  searchForm?: ISearchFormProps
}

export default function useTable(tableColumns: TableColumn[], props: IUseTableProps) {
  const table = reactive(new Table(props.tableProps))
  const { dataApi, dataFormat, paginationProps, searchForm } = props
  const { pagination } = usePagination(paginationProps)
  const getTableData = () => {
    table.update({ loading: true })
    table.selection = []

    const params = {
      pageIndex: pagination.currentPage,
      pageSize: pagination.pageSize,
      orderBy: getOrderByParams(table),
      search: getSearchParams(searchForm),
    }

    return dataApi(params)
      .then((res) => {
        const { page, records, rows } = res.Data

        table.update({
          data: typeof dataFormat === 'function' ? dataFormat(rows) : rows,
        })
        pagination.update({
          total: records,
          currentPage: page,
        })
      })
      .finally(() => {
        table.update({ loading: false })
      })
  }

  const onSortChange = ({ sortList }) => {
    table.update({
      sort: sortList.map(({ field, order }) => ({
        sortColumns: field,
        order,
      })),
    })
    getTableData()
  }

  const onSelectionChange = (checked) => {
    table.selection = checked.records.map((item) => toRaw(item)) // 取消响应
  }

  return {
    table,
    columns: tableColumns,
    pagination,
    getTableData,
    onSortChange,
    onSelectionChange,
  }
}
