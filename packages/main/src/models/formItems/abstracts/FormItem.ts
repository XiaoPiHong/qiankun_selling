import { FormItemTypeEnum } from '../enums'
import { getRandomStrFn } from '@/utils'

const getRandomStr = getRandomStrFn()
const onChange = () => {}

type FieldType = 'none' | 'mobilephone' | 'telephone' | 'postalcode' | 'identity-card' | 'email'
type ColSpanType = 6 | 8 | 12 | 16 | 18 | 24

export interface IFormItemProps {
  prop: string
  label?: string
  labelMaxLength?: number
  description?: string
  required?: boolean
  repeat?: boolean
  fieldType?: FieldType
  colSpan?: ColSpanType
  disabled?: boolean
  rules?: object[]
  onChange?: (...value: any[]) => void
}

export default abstract class FormItemRender {
  /**
   * 字段组件类型
   * @abstract
   */
  abstract readonly _type: FormItemTypeEnum

  /**
   * 字段属性
   * @readonly
   */
  readonly prop: string

  /**
   * 字段显示名称
   */
  label: string

  /**
   * 字段显示名称最大长度
   */
  labelMaxLength: number

  /**
   * 字段字段描述信息
   */
  description: string

  /**
   * 是否必填
   */
  required: boolean

  repeat: boolean

  fieldType: FieldType

  /**
   * 列的跨度，最大值为 24
   */
  colSpan: ColSpanType

  /**
   * 是否禁用
   */
  disabled: boolean

  /**
   * 提交表单的规则列表
   */
  rules: object[]

  /**
   * 监听 value 改变触发
   */
  onChange: (...value: any[]) => void

  /**
   * 复制当前表单组件
   * @abstract
   */
  abstract copy(): FormItemRender

  /**
   * 获取值
   * @abstract
   */
  abstract getValue()

  /**
   * 设置新值
   * @param value 新值
   * @abstract
   */
  abstract setValue(value): void

  /**
   * 获取表单值
   * @abstract
   */
  abstract getFormValue(): any

  constructor(props: IFormItemProps) {
    this.prop = props.prop || getRandomStr(20)
    this.prop = props.prop
    this.label = props.label || ''
    this.labelMaxLength = props.labelMaxLength || 20
    this.description = props.description || ''
    this.required = props.required || undefined // 默认为undefined，默认为false，rules规则会失效
    this.repeat = props.repeat || false
    this.fieldType = props.fieldType || 'none'
    this.colSpan = props.colSpan || 24
    this.disabled = props.disabled || false
    this.rules = props.rules || []
    this.onChange = props.onChange || onChange
  }

  /**
   * 更新改变值 before 触发
   */
  onBeforeChange(...args: any[]) {
    this.setValue(args[0])
  }

  /**
   * 更新改变值 after 触发
   */
  onAfterChange(...args: any[]) {}
}
