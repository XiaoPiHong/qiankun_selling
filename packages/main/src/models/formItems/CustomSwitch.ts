import { FormItemTypeEnum } from './enums'
import { FormItem, IFormItemProps } from './abstracts'
import { cloneDeep } from '@/utils'

type T = boolean

interface ICustomSwitchProps extends IFormItemProps {
  value?: T
  activeText?: string
  inactiveText?: string
}

export default class CustomSwitch extends FormItem {
  readonly _type = FormItemTypeEnum.CUSTOM_SWITCH

  private value: T

  activeText: string

  inactiveText: string

  constructor(props: ICustomSwitchProps) {
    super(props)
    this.value = props.value || false
    this.activeText = props.activeText || ''
    this.inactiveText = props.inactiveText || ''
  }

  copy() {
    return new CustomSwitch(cloneDeep(this))
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
