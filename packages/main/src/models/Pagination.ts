export interface IPaginationProps {
  pageSize?: number
  total?: number
  currentPage?: number
  layout?: string
  pageSizes?: number[]
}

export default class Pagination {
  pageSize: number

  total: number

  currentPage: number

  pageSizes: number[]

  layout: string

  constructor(props: IPaginationProps = {}) {
    this.pageSize = props.pageSize || 30
    this.total = props.total || 0
    this.layout = props.layout || 'total, prev, pager, next, jumper, sizes'
    this.currentPage = typeof props.currentPage === 'undefined' ? 1 : props.currentPage
    this.pageSizes = props.pageSizes || [30, 100, 300]
  }

  update(props: IPaginationProps) {
    Object.keys(props).forEach((key) => {
      this[key] = props[key]
    })
  }
}
