type SizeType = 'large' | 'default' | 'small'
type LabelPositionType = 'left' | 'right' | 'top'
type LabelWidthType = number

interface IFormRenderConfigProps {
  size?: SizeType
  labelPosition?: LabelPositionType
  labelWidth?: LabelWidthType
  gutter?: number
}

export default class FormConfig {
  /**
   * 表单尺寸
   */
  public size: SizeType

  /**
   * 标题位置
   */
  public labelPosition: LabelPositionType

  /**
   * 标题宽度
   */
  public labelWidth: LabelWidthType

  /**
   * 栅格间隔
   */
  public gutter: number

  constructor(props: IFormRenderConfigProps = {}) {
    this.size = props.size || 'default'
    this.labelPosition = props.labelPosition || 'right'
    this.labelWidth = props.labelWidth || 100
    this.gutter = props.gutter || 16
  }
}
