import { reactive } from 'vue'
import { Pagination, IPaginationProps } from '@/models'

export default function usePagination(props?: IPaginationProps) {
  const pagination = reactive(new Pagination(props))
  return { pagination }
}
