import { getRandomStrFn } from '@/utils'
import { FormConfig } from '@/models'
import { FormItem } from '@/models/formItems/abstracts'

const getRandomStr = getRandomStrFn()

export interface IFormProps {
  id?: string
  title?: string
  type?: string
  show?: boolean
  data?: any
  list?: FormItem[]
  config?: FormConfig
  remark?: string
  appendToBody?: boolean
  modal?: boolean
}

/**
 * 表单渲染类型的枚举
 */
export enum FORM_TYPE {
  ADD = 'ADD',
  EDIT = 'EDIT',
}

export default class FormRender {
  /**
   * 标识
   */
  id: string

  /**
   * 标题
   */
  title: string

  /**
   * 类型
   */
  type: string

  /**
   * 显示或隐藏
   */
  show: boolean

  /**
   * 暂存的任意数据
   */
  data: any

  /**
   * 系统默认的 FormItem 列表
   */
  list: FormItem[]

  /**
   * 配置
   */
  config: FormConfig

  /**
   * 表单备注(提示)
   */
  remark: string

  /**
   * 是否插入至body元素上
   */
  appendToBody: boolean

  /**
   *
   *  遮罩层
   */
  modal: boolean

  constructor(props: IFormProps = {}) {
    this.id = props.id || getRandomStr(20)
    this.title = props.title || ''
    this.type = props.type || ''
    this.show = props.show || false
    this.data = props.data || {}
    this.list = props.list || []
    this.config = props.config || new FormConfig()
    this.remark = props.remark || ''
    this.appendToBody = props.appendToBody || false
    this.modal = props.modal || true
  }

  /**
   * 更新属性
   * @param props 更新属性的集合
   */
  update(props: IFormProps) {
    Object.keys(props).forEach((key) => {
      this[key] = props[key]
    })
  }

  /**
   * 获取列表项
   * @param prop 列表项的 prop 属性
   * @returns 列表项
   */
  getListItem(prop: string): FormItem | null {
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
    const obj = {}
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
}
