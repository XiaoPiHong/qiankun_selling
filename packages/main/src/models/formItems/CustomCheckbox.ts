import { FormItemTypeEnum } from './enums'
import { FormItem, IFormItemProps } from './abstracts'
import { cloneDeep } from '@/utils'

export interface IOption {
  label: string
  value: string | number | boolean
}

type T = (string | number | boolean)[]

interface ICustomCheckboxProps extends IFormItemProps {
  options?: IOption[]
  value?: T
}

export default class CustomCheckbox extends FormItem {
  readonly _type = FormItemTypeEnum.CUSTOM_CHECKBOX

  options: IOption[]

  private value: T

  constructor(props: ICustomCheckboxProps) {
    super(props)

    this.options = props.options || [
      {
        label: '选项值1',
        value: '1',
      },
      {
        label: '选项值2',
        value: '2',
      },
      {
        label: '选项值3',
        value: '3',
      },
    ]
    this.value = props.value || []
  }

  copy() {
    return new CustomCheckbox(cloneDeep(this))
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
