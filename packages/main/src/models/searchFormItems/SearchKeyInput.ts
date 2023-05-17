import { SearchFormItemTypeEnum } from './enums'
import { SearchFormItem, ISearchFormItemProps, IOption } from './abstracts'

const onReset = () => {}
const onExpand = () => {}
const onSearch = () => {}

interface ISearchKeyInputProps extends ISearchFormItemProps {
  value?: { key: string | number; value: string }
  options?: IOption[]
  onReset?: (...value: any[]) => void
  onSearch?: (...value: any[]) => void
  onExpand?: (...value: any[]) => void
}

export default class SearchKeyInput extends SearchFormItem {
  readonly _type = SearchFormItemTypeEnum.SEARCH_KEY_INPUT

  private value: { key: string | number; value: string }

  options: IOption[]

  onReset: (...value: any[]) => void

  onSearch: (...value: any[]) => void

  onExpand: (...value: any[]) => void

  constructor(props: ISearchKeyInputProps) {
    super(props)
    const { value, options } = props
    this.value = value || { key: '', value: '' }
    this.options = options || []
    this.onExpand = props.onExpand || onExpand
    this.onSearch = props.onSearch || onSearch
    this.onReset = props.onReset || onReset
  }

  getValue() {
    return this.value
  }

  setValue(value: { key: string | number; value: string }) {
    this.value = value
  }

  getOption() {
    const option = this.options.find((item) => item.value === this.value.key)
    if (option) return [option]
    return []
  }
}
