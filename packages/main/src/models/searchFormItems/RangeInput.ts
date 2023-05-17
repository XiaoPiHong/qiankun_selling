import { SearchFormItemTypeEnum } from './enums'
import { SearchFormItem, ISearchFormItemProps, IOption } from './abstracts'

interface IInputOption {
  cname?: string | number
  operate?: string | number
  tname?: string | number
  typename?: string | number
}
interface IRangeInputProps extends ISearchFormItemProps {
  value?: { key: string | number; value: [string, string] }
  options?: IOption[]
  prePlaceholder?: string
  appendPlaceholder?: string
  preOption: IInputOption
  appendOption: IInputOption
}

export default class RangeInput extends SearchFormItem {
  readonly _type = SearchFormItemTypeEnum.RANGE_INPUT

  private value: { key: string | number; value: [string, string] }

  options: IOption[]

  prePlaceholder: string

  appendPlaceholder: string

  preOption: IInputOption

  appendOption: IInputOption

  constructor(props: IRangeInputProps) {
    super(props)
    const { value, options, prePlaceholder, appendPlaceholder, preOption, appendOption } = props
    this.value = value || { key: '', value: ['', ''] }
    this.options = options || []
    this.prePlaceholder = prePlaceholder || ''
    this.appendPlaceholder = appendPlaceholder || ''
    this.preOption = { cname: '', operate: '', tname: '', typename: '', ...preOption }
    this.appendOption = { cname: '', operate: '', tname: '', typename: '', ...appendOption }
  }

  getValue() {
    return this.value
  }

  setValue(value: { key: string | number; value: [string, string] }) {
    this.value = value
  }

  /** RANGE_INPUT组件分前后搜索条件 */
  getOption() {
    const option = this.options.find((item) => item.value === this.value.key)
    if (option)
      return [
        { ...this.preOption, ...option },
        { ...this.appendOption, ...option },
      ]
    return []
  }
}
