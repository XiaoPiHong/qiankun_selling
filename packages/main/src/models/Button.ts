type ButtonType = 'primary' | 'success' | 'warning' | 'danger'
interface IDropDownOption {
  label: string
  disabled?: boolean
  show?: boolean
  onClick: () => void
}
type Type = 'button' | 'dropdown'
export interface IButtonProps {
  type?: Type
  buttonType?: ButtonType
  disabled?: boolean
  show?: boolean
  icon?: string
  iconColor?: string
  infoIcon?: string
  infoIconColor?: string
  text?: string
  color?: string
  dropDownOptions?: IDropDownOption[]
  onClick?: (...value: any[]) => void
}
const onClick = () => {}
export default class Button {
  type: Type

  buttonType: ButtonType

  disabled: boolean

  show: boolean

  icon: string

  iconColor: string

  color: string

  text: string

  infoIcon: string

  infoIconColor: string

  dropDownOptions: IDropDownOption[]

  onClick: (...value: any[]) => void

  constructor(props: IButtonProps) {
    this.type = props.type || 'button'
    this.buttonType = props.buttonType || 'primary'
    this.disabled = props.disabled || false
    this.show = typeof props.show === 'undefined' ? true : props.show
    this.icon = props.icon || ''
    this.iconColor = props.iconColor || ''
    this.text = props.text || ''
    this.infoIcon = props.infoIcon || ''
    this.infoIconColor = props.infoIconColor || ''
    this.color = props.color || ''
    this.dropDownOptions =
      props.dropDownOptions?.map((item) => ({
        ...item,
        disabled: item.disabled || false,
        show: typeof item.show === 'undefined' ? true : item.show,
      })) || []
    this.onClick = props.onClick || onClick
  }
}
