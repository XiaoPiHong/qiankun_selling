import { SearchFormItemTypeEnum } from './enums'
import { SearchFormItem, ISearchFormItemProps, IOption } from './abstracts'

type T = string | number

interface ISingleSelectProps extends ISearchFormItemProps {
  value?: T
  placeholder?: string
  options?: IOption[]
}

export default class SingleSelect extends SearchFormItem {
  readonly _type = SearchFormItemTypeEnum.SINGLE_SELECT

  private value: T

  placeholder: string

  options: IOption[]

  constructor(props: ISingleSelectProps) {
    super(props)
    const { placeholder, value, options } = props
    this.value = value || ''
    this.placeholder = placeholder || ''
    this.options = options || []
  }

  getValue() {
    return this.value
  }

  setValue(value: T) {
    this.value = value
  }

  getOption() {
    const option = this.options.find((item) => item.value === this.value)
    if (option) return [option]
    return []
  }
}
