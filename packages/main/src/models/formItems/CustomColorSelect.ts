import { FormItemTypeEnum } from './enums'
import { FormItem, IFormItemProps } from './abstracts'
import { cloneDeep } from '@/utils'

type T = number | string
export interface IOption {
  label: string
  value: string | number
}

interface ICustomColorSelectProps extends IFormItemProps {
  value?: T
  options?: IOption[]
}

export default class CustomColorSelect extends FormItem {
  readonly _type = FormItemTypeEnum.CUSTOM_COLOR_SELECT

  private value: T

  options: IOption[]

  constructor(props: ICustomColorSelectProps) {
    super(props)
    this.value = props.value || ''
    this.options = props.options || []
  }

  copy() {
    return new CustomColorSelect(cloneDeep(this))
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
