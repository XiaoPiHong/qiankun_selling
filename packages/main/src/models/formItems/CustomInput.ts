import { FormItemTypeEnum } from './enums'
import { FormItem, IFormItemProps } from './abstracts'
import { cloneDeep } from '@/utils'

type Type = 'text' | 'password'
type T = string | number
type ValueModeType = 'custom' | 'linkage' | 'formula'

interface ICustomInputProps extends IFormItemProps {
  type?: Type
  value?: T
  valueMode?: ValueModeType
  placeholder?: string
  maxlength?: string | number
  append?: string | number
}

export default class CustomInput extends FormItem {
  readonly _type = FormItemTypeEnum.CUSTOM_INPUT

  type: Type

  private value: T

  /**
   * 字段值的模式
   */
  valueMode: ValueModeType

  /**
   * 占位提示
   */
  placeholder: string

  /**
   * 最多输入多少个字符
   */
  maxlength: string | number

  /**
   * 后缀
   */
  append: string | number

  constructor(props: ICustomInputProps) {
    super(props)

    const { type, value, valueMode, placeholder, maxlength, append } = props
    this.type = type || 'text'
    this.value = value || ''
    this.valueMode = valueMode || 'custom'
    this.placeholder = placeholder || ''
    this.maxlength = typeof maxlength !== 'undefined' ? maxlength : ''
    this.append = typeof append !== 'undefined' ? append : ''
  }

  copy() {
    return new CustomInput(cloneDeep(this))
  }

  getValue() {
    return this.value
  }

  setValue(value) {
    this.value = value
  }

  getFormValue() {
    return this.value
  }
}
