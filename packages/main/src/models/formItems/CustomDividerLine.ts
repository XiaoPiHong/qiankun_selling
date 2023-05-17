import { FormItemTypeEnum } from './enums'
import { FormItem, IFormItemProps } from './abstracts'
import { cloneDeep } from '@/utils'

export enum CustomDividerLineValueEnum {
  NONE = 'none',
  DASHED = 'dashed',
  THIN = 'thin',
  MIDDLE = 'middle',
}

type T = CustomDividerLineValueEnum
interface ICustomDividerLineProps extends IFormItemProps {
  value?: T
}

export default class CustomDividerLine extends FormItem {
  readonly _type = FormItemTypeEnum.CUSTOM_DIVIDER_LINE

  private value: T

  constructor(props: ICustomDividerLineProps) {
    super(props)
    this.value = props.value || CustomDividerLineValueEnum.NONE
  }

  copy() {
    return new CustomDividerLine(cloneDeep(this))
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
