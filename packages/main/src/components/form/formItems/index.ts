import CustomInput from './CustomInput.vue'
import CustomTextarea from './CustomTextarea.vue'
import CustomSingleSelect from './CustomSingleSelect.vue'
import CustomUpload from './CustomUpload.vue'
import CustomDividerLine from './CustomDividerLine.vue'
import CustomCheckbox from './CustomCheckbox.vue'
import CustomSwitch from './CustomSwitch.vue'
import CustomColorSelect from './CustomColorSelect.vue'
import { FormItemTypeEnum } from '@/models/formItems/enums'

const TYPE_TO_COMPONENT_MAP = {
  [FormItemTypeEnum.CUSTOM_INPUT]: CustomInput,
  [FormItemTypeEnum.CUSTOM_TEXTAREA]: CustomTextarea,
  [FormItemTypeEnum.CUSTOM_SINGLE_SELECT]: CustomSingleSelect,
  [FormItemTypeEnum.CUSTOM_DIVIDER_LINE]: CustomDividerLine,
  [FormItemTypeEnum.CUSTOM_UPLOAD]: CustomUpload,
  [FormItemTypeEnum.CUSTOM_CHECKBOX]: CustomCheckbox,
  [FormItemTypeEnum.CUSTOM_SWITCH]: CustomSwitch,
  [FormItemTypeEnum.CUSTOM_COLOR_SELECT]: CustomColorSelect,
}

export {
  TYPE_TO_COMPONENT_MAP,
  CustomInput,
  CustomTextarea,
  CustomSingleSelect,
  CustomDividerLine,
  CustomUpload,
  CustomCheckbox,
  CustomSwitch,
  CustomColorSelect,
}
