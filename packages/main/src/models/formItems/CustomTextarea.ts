import { FormItemTypeEnum } from './enums'
import { FormItem, IFormItemProps } from './abstracts'
import { cloneDeep } from '@/utils'

interface IAutosizeProps {
  minRows?: number
  maxRows?: number
}

class Autosize {
  /**
   * 最小行数
   */
  minRows: number

  /**
   * 最大行数
   */
  maxRows: number

  constructor(props: IAutosizeProps = {}) {
    const { minRows, maxRows } = props
    this.minRows = typeof minRows !== 'undefined' ? minRows : 2
    this.maxRows = typeof maxRows !== 'undefined' ? maxRows : 6
  }
}

type T = string | number

interface ICustomTextareaProps extends IFormItemProps {
  value?: T
  autosize?: IAutosizeProps
}

export default class CustomTextarea extends FormItem {
  readonly _type = FormItemTypeEnum.CUSTOM_TEXTAREA

  private value: T

  /**
   * 自适应高度对象
   */
  autosize: Autosize

  constructor(props: ICustomTextareaProps) {
    super(props)

    const { value, autosize } = props
    this.value = value || ''
    this.autosize = new Autosize(autosize)
  }

  copy() {
    return new CustomTextarea(cloneDeep(this))
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
