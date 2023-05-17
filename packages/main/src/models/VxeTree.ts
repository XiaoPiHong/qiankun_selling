type VxeTreeType = 'html' | 'checkbox'
type T = string[] | number[]
interface IVxeTreeConfigProps {
  rowField?: string
  parentField?: string
  expandAll?: boolean
  expandRowKeys?: T
}
interface IVxeTreeRowConfig {
  keyField?: string
}
interface IVxeTreeCheckboxConfigProps {
  labelField?: string
  checkStrictly?: boolean // 父子互不关联
  checkRowKeys?: T
}
export interface IVxeTreeProps {
  nodeList?: Node[]
  value?: T
  placeholder?: string
  multiple?: boolean
  props?: IVxeTreeConfigProps
  show?: boolean
  checkboxConfig?: IVxeTreeCheckboxConfigProps
  rowConfig?: IVxeTreeRowConfig
  type?: VxeTreeType
}

export default class VxeTree {
  type: VxeTreeType

  nodeList: any[]

  value: T

  placeholder: string

  multiple: boolean

  props: IVxeTreeConfigProps

  checkboxConfig: IVxeTreeCheckboxConfigProps

  rowConfig: IVxeTreeRowConfig

  show: boolean

  constructor(props: IVxeTreeProps) {
    this.nodeList = props.nodeList || []
    this.value = props.value || []
    this.show = props.show || false
    this.placeholder = props.placeholder || ''
    this.type = props.type || 'html'
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
}
