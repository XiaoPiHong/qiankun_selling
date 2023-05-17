import { SearchFormItemTypeEnum } from './enums'
import { SearchFormItem, ISearchFormItemProps, IOption } from './abstracts'
import { cloneDeep } from '@/utils'

type T = string[] | number[]
interface ITreeConfigProps {
  rowField?: string
  parentField?: string
  expandAll?: boolean
  expandRowKeys?: T
}
interface ITreeRowConfig {
  keyField?: string
}
interface ITreeCheckboxConfigProps {
  labelField?: string
  checkStrictly?: boolean // 父子互不关联
  checkRowKeys?: T
}
interface ITreeV2Props extends ISearchFormItemProps {
  nodeList?: Node[]
  value?: T
  options?: IOption[]
  placeholder?: string
  multiple?: boolean
  props?: ITreeConfigProps

  checkboxConfig?: ITreeCheckboxConfigProps
  rowConfig?: ITreeRowConfig
}

export default class TreeV2 extends SearchFormItem {
  readonly _type = SearchFormItemTypeEnum.TREE_V2

  nodeList: any[]

  private value: T

  options: IOption[]

  placeholder: string

  multiple: boolean

  props: ITreeConfigProps

  checkboxConfig: ITreeCheckboxConfigProps

  rowConfig: ITreeRowConfig

  constructor(props: ITreeV2Props) {
    super(props)

    this.nodeList = props.nodeList || []
    this.value = props.value || []
    this.placeholder = props.placeholder || ''
    this.options = props.options || []
    this.multiple = props.multiple || false
    this.props = {
      rowField: props.props?.rowField || 'id',
      parentField: props.props?.parentField || 'pId',
      expandAll: props.props?.expandAll || false,
      expandRowKeys: props.props?.expandRowKeys || [],
    }
    this.rowConfig = {
      keyField: props.rowConfig?.keyField || 'id',
    }
    this.checkboxConfig = {
      labelField: props.checkboxConfig?.labelField || 'name',
      checkStrictly: props.checkboxConfig?.checkStrictly || false,
      checkRowKeys: [], // 仅用于重新更新节点时勾选对应项
    }
  }

  copy() {
    return new TreeV2(cloneDeep(this))
  }

  getValue() {
    return this.value
  }

  setValue(value) {
    this.value = value
  }

  getOption() {
    return this.options
  }
}
