import { FormItemTypeEnum } from './enums'
import { FormItem, IFormItemProps } from './abstracts'
import { cloneDeep } from '@/utils'

export interface IOption {
  label: string
  value: string | number | boolean
}

type T = string | number | boolean

interface ICustomSingleSelectProps extends IFormItemProps {
  options?: IOption[]
  value?: T
}

export default class CustomSingleSelect extends FormItem {
  readonly _type = FormItemTypeEnum.CUSTOM_SINGLE_SELECT

  options: IOption[]

  private value: T

  constructor(props: ICustomSingleSelectProps) {
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
    this.value = props.value || ''
    // this.value = typeof props.value !== 'undefined' ? props.value : ''
  }

  copy() {
    return new CustomSingleSelect(cloneDeep(this))
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

  pushOption() {
    const { options } = this
    const currCount = options.length + 1

    options.push({
      label: `选项值${currCount}`,
      value: String(currCount),
    })
  }

  deleteOption(index: number) {
    const { options, value } = this
    const deleteItem = options[index]

    options.splice(index, 1)
    if (value === deleteItem.value) {
      this.value = ''
    }
  }
}
