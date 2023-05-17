import { SearchFormItemTypeEnum } from './enums'
import { SearchFormItem, ISearchFormItemProps, IOption } from './abstracts'

type RangeDateTimePickerType = 'date' | 'datetime'

type ValueFormatType = 'YYYY-MM-DD HH:mm:ss' | 'YYYY-MM-DD' | ''
interface IDateTimePickerOption {
  cname?: string | number
  operate?: string | number
  tname?: string | number
  typename?: string | number
}
interface IRangeDateTimePickerProps extends ISearchFormItemProps {
  type?: RangeDateTimePickerType
  value?: { key: string | number; value: [string, string] }
  options?: IOption[]
  prePlaceholder?: string
  appendPlaceholder?: string
  preOption: IDateTimePickerOption
  appendOption: IDateTimePickerOption
  valueFormat?: ValueFormatType
}

export default class RangeDateTimePicker extends SearchFormItem {
  readonly _type = SearchFormItemTypeEnum.RANGE_DATE_TIME_PICKER

  private value: { key: string | number; value: [string, string] }

  type: RangeDateTimePickerType

  options: IOption[]

  prePlaceholder: string

  appendPlaceholder: string

  preOption: IDateTimePickerOption

  appendOption: IDateTimePickerOption

  valueFormat: ValueFormatType

  constructor(props: IRangeDateTimePickerProps) {
    super(props)
    const {
      value,
      options,
      prePlaceholder,
      appendPlaceholder,
      preOption,
      appendOption,
      type,
      valueFormat,
    } = props
    this.type = type || 'date'
    this.value = value || { key: '', value: ['', ''] }
    this.options = options || []
    this.prePlaceholder = prePlaceholder || ''
    this.appendPlaceholder = appendPlaceholder || ''
    this.preOption = { cname: '', operate: '', tname: '', typename: '', ...preOption }
    this.appendOption = { cname: '', operate: '', tname: '', typename: '', ...appendOption }
    this.valueFormat = valueFormat || ''
  }

  getValue() {
    return this.value
  }

  setValue(value: { key: string | number; value: [string, string] }) {
    this.value = value
  }

  /** RANGE_DATE_TIME_PICKER组件分前后搜索条件 */
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
