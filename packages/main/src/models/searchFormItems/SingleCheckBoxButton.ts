import { SearchFormItemTypeEnum } from './enums'
import { SearchFormItem, ISearchFormItemProps, IOption } from './abstracts'

type T = string | number

interface ISingleCheckBoxButtonProps extends ISearchFormItemProps {
  value?: [T]
  options?: IOption[]
}

export default class SingleCheckBoxButton extends SearchFormItem {
  readonly _type = SearchFormItemTypeEnum.SINGLE_CHECK_BOX_BUTTON

  private value: [T]

  options: IOption[]

  constructor(props: ISingleCheckBoxButtonProps) {
    super(props)
    const { value, options } = props
    this.value = value || ['']
    this.options = options || [{ label: '全部', value: '' }]
  }

  getValue() {
    return this.value
  }

  setValue(value: [T]) {
    this.value = value
  }

  getOption() {
    const option = this.options.find((item) => item.value === this.value[0])
    if (option) return [option]
    return []
  }
}
