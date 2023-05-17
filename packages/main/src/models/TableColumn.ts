type AlignType = 'left' | 'center' | 'right'
export interface ITableColumnProps {
  prop: string
  label?: string
  minWidth?: string | number
  align?: AlignType
  sortable?: boolean
}

export default class TableColumn {
  /** 字段 */
  prop: string

  /** 字段名称 */
  label: string

  /** 列的最小宽度 */
  minWidth: string | number

  /** 对齐方式 */
  align: AlignType

  /**
   * 对应列是否可以排序， 如果设置为 'custom'，
   * 则代表用户希望远程排序，需要监听 Table 的 sort-change 事件
   */
  sortable: boolean

  constructor(props: ITableColumnProps) {
    this.prop = props.prop
    this.label = props.label || ''
    this.minWidth = props.minWidth || '80'
    this.align = props.align || 'center'
    this.sortable = props.sortable || false
  }
}
