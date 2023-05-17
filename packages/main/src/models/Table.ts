type T = 'asc' | 'desc'
interface ITableSort {
  order: T
  sortColumns: string
}
interface ITableSortconfig {
  multiple: boolean
  chronological: boolean
}

interface ITableColumnConfig {
  resizable: boolean
}

// interface ITableRowConfig {
//   height: number
// }

export interface ITableProps {
  loading?: boolean
  data?: any[]
  sort?: ITableSort[]
  selection?: any[]
  sorting?: boolean
  defaultSort?: ITableSort[]
  sortConfig?: ITableSortconfig
  columnConfig?: ITableColumnConfig
  // rowConfig?: ITableRowConfig
}

export default class Table {
  loading: boolean

  data: any[]

  sort: ITableSort[]

  selection: any[]

  sorting: boolean

  defaultSort: ITableSort[] // 默认的排序方式

  sortConfig: ITableSortconfig // 排序配置项

  columnConfig: ITableColumnConfig // 列配置项

  // rowConfig: ITableRowConfig // 行配置项

  constructor(props: ITableProps = {}) {
    this.loading = props.loading || false
    this.data = props.data || []
    this.sort = props.sort || []
    this.defaultSort = props.defaultSort || []
    this.selection = props.selection || []
    this.sorting = props.sorting || false
    this.sortConfig = props.sortConfig || {
      multiple: false, // 多个排序
      chronological: true, // 按点击的先后顺序进行排序
    }
    this.columnConfig = props.columnConfig || { resizable: true }
    // this.rowConfig = props.rowConfig || {}
  }

  update(props: ITableProps) {
    Object.keys(props).forEach((key) => {
      this[key] = props[key]
    })
  }

  getData() {
    return this.data
  }
}
