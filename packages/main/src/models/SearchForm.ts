import { SearchFormItem } from '@/models/searchFormItems/abstracts'
import { cloneDeep } from '@/utils'

export interface ISearchFormProps {
  list?: SearchFormItem[]
}

export default class SearchForm {
  list: SearchFormItem[]

  constructor(props: ISearchFormProps = {}) {
    this.list = props.list || []
  }

  /**
   * 更新搜索表单属性
   * @param props 更新属性的集合
   */
  updateFormAttributes(props: ISearchFormProps) {
    Object.keys(props).forEach((key) => {
      this[key] = props[key]
    })
  }

  /**
   * 获取列表项
   * @param prop 列表项的 prop 属性
   * @returns 列表项
   */
  getListItem(prop: string): SearchFormItem | null {
    const { list } = this

    for (let i = 0, len = list.length; i < len; i++) {
      const formItem = list[i]

      if (formItem.prop === prop) {
        return formItem
      }
    }

    return null
  }

  /**
   * 获取列表项 prop 映射 value 的对象
   */
  getListPropToValueObj(): {
    [key: string]: any
  } {
    const obj: { [key: string]: any } = {}
    const { list } = this

    for (let i = 0, len = list.length; i < len; i++) {
      const formItem = list[i]
      obj[formItem.prop] = formItem.getValue()
    }

    return obj
  }

  /**
   * 更新列表项的 value 属性
   * @param data 更新键值对的集合
   */
  updateListValue(data: { [key: string]: any }) {
    Object.keys(data).forEach((key) => {
      const formItem = this.getListItem(key)

      if (formItem) {
        formItem.setValue(data[key])
      }
    })
  }

  /**
   * 重置表单项的 value 属性
   * @param data 列表项
   */
  resetListValue(data: SearchFormItem) {
    const formItem = this.getListItem(data.prop)
    if (formItem) {
      const depData = cloneDeep(data) // 深拷贝解决value私有问题
      formItem.setValue(depData.value)
    }
  }
}
