import CustomInput from './CustomInput'
import CustomTextarea from './CustomTextarea'
import CustomSingleSelect from './CustomSingleSelect'
import CustomDividerLine from './CustomDividerLine'
import CustomUpload from './CustomUpload'
import CustomCheckbox from './CustomCheckbox'
import CustomSwitch from './CustomSwitch'
import CustomColorSelect from './CustomColorSelect'
import { FormItemTypeEnum } from '@/models/formItems/enums'

export { default as CustomInput } from './CustomInput'
export { default as CustomTextarea } from './CustomTextarea'
export { default as CustomSingleSelect } from './CustomSingleSelect'
export { default as CustomDividerLine, CustomDividerLineValueEnum } from './CustomDividerLine'
export { default as CustomUpload } from './CustomUpload'
export { default as CustomCheckbox } from './CustomCheckbox'
export { default as CustomSwitch } from './CustomSwitch'
export { default as CustomColorSelect } from './CustomColorSelect'

export const TYPE_TO_MODEL_MAP = {
  [FormItemTypeEnum.CUSTOM_INPUT]: CustomInput,
  [FormItemTypeEnum.CUSTOM_TEXTAREA]: CustomTextarea,
  [FormItemTypeEnum.CUSTOM_SINGLE_SELECT]: CustomSingleSelect,
  [FormItemTypeEnum.CUSTOM_DIVIDER_LINE]: CustomDividerLine,
  [FormItemTypeEnum.CUSTOM_UPLOAD]: CustomUpload,
  [FormItemTypeEnum.CUSTOM_CHECKBOX]: CustomCheckbox,
  [FormItemTypeEnum.CUSTOM_SWITCH]: CustomSwitch,
  [FormItemTypeEnum.CUSTOM_COLOR_SELECT]: CustomColorSelect,
}

export type FormItemModelType =
  | CustomInput
  | CustomTextarea
  | CustomSingleSelect
  | CustomDividerLine
  | CustomUpload
  | CustomCheckbox
  | CustomSwitch
  | CustomColorSelect
