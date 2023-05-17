import { ITableProps, ISearchFormProps } from '@/models'
import { SearchFormItemTypeEnum } from '@/models/searchFormItems/enums'

/** 获取排序参数 */
export const getOrderByParams = (table: ITableProps) => {
  let orderBy = ''
  // 处理默认的排序

  orderBy = table.defaultSort.map(({ sortColumns, order }) => `${sortColumns} ${order}`).join(',')
  // 后处理手动改变的排序
  if (table.sort.length > 0) {
    orderBy = table.sort.map(({ sortColumns, order }) => `${sortColumns} ${order}`).join(',')
  }
  return orderBy
}

/** 获取搜索表单项参数 */
export const getSearchParams = (searchForm: ISearchFormProps) => {
  // 处理搜索项
  const setTableSearch = (option, value) => {
    const { tname = '', cname = '', typename = '', operate = '' } = option
    if (cname && value) {
      tnames.push(tname)
      cnams.push(cname)
      typenames.push(typename)
      operates.push(operate)
      values.push(value)
    }
  }
  const tnames = []
  const cnams = []
  const typenames = []
  const operates = []
  const values = []
  searchForm.list.forEach((item) => {
    const itemOptions = item.getOption()

    if (itemOptions.length > 0) {
      switch (item._type) {
        case SearchFormItemTypeEnum.SEARCH_KEY_INPUT:
          setTableSearch(itemOptions[0], item.getValue().value)
          break
        case SearchFormItemTypeEnum.RANGE_INPUT:
        case SearchFormItemTypeEnum.RANGE_DATE_TIME_PICKER:
          setTableSearch(itemOptions[0], item.getValue().value[0])
          setTableSearch(itemOptions[1], item.getValue().value[1])
          break
        case SearchFormItemTypeEnum.SINGLE_CHECK_BOX_BUTTON:
          setTableSearch(itemOptions[0], item.getValue()[0])
          break
        case SearchFormItemTypeEnum.TREE_V2:
          setTableSearch(itemOptions[0], item.getValue().join(','))
          break
        default:
          setTableSearch(itemOptions[0], item.getValue())
      }
    }
  })
  const search = `${tnames.join('`')}|${cnams.join('`')}|${values.join('`')}|${operates.join(
    '`'
  )}|${typenames.join('`')}`
  return search
}
