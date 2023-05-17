import { SearchFormItemTypeEnum } from '../enums'

const onChange = () => {}
export interface ISearchFormItemProps {
  prop: string
  hidden?: boolean
  onChange?: (...value: any[]) => void
}
export interface IOption {
  /**
   * 选项标题
   */
  label: string | number
  /**
   * 选项值
   */
  value: string | number

  /**
   * 后端约束的搜索条件(勿改)
   */
  cname?: string | number
  tname?: string | number
  operate?: string | number
  typename?: string | number
}
export default abstract class SearchFormItem {
  /**
   * 字段组件类型
   * @abstract
   */
  abstract readonly _type: SearchFormItemTypeEnum

  /**
   * 字段匹配选项
   * @abstract
   */
  abstract options: IOption[]

  /**
   * 隐藏标志
   */
  readonly hidden: boolean

  /**
   * 字段属性
   * @readonly
   */
  readonly prop: string

  /**
   * 控制显示
   */
  show: boolean

  /**
   * 监听 value 改变触发（props传递过来的onChange事件，用于页面逻辑交互）
   */
  onChange: (...value: any[]) => void

  /**
   * 获取值
   * @abstract
   */
  abstract getValue(): any

  /**
   * 设置新值
   * @param value 新值
   * @abstract
   */
  abstract setValue(value: any): void

  /**
   * 获取当前字段匹配项
   * @abstract
   */
  abstract getOption(): IOption[]

  constructor(props: ISearchFormItemProps) {
    this.prop = props.prop
    this.hidden = props.hidden || false
    this.show = !props.hidden
    this.onChange = props.onChange || onChange
  }

  /**
   * 更新改变值 before 触发（所有搜索表单项组件都是靠当前方法更新的值）
   */
  onBeforeChange(...args: any[]) {
    // console.log('onBeforeChange', args[0])
    this.setValue(args[0])
  }

  /**
   * 更新改变值 after 触发
   */
  onAfterChange(...args: any[]) {
    // console.log('onAfterChange', args[0])
  }
}
