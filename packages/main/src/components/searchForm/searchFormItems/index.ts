import singleSelect from './singleSelect.vue'
import searchKeyInput from './searchKeyInput.vue'
import rangeInput from './rangeInput.vue'
import singleCheckBoxButton from './singleCheckBoxButton.vue'
import rangeDateTimePicker from './rangeDateTimePicker.vue'
import treeV2 from './treeV2.vue'
import { SearchFormItemTypeEnum } from '@/models/searchFormItems/enums'

const TYPE_TO_COMPONENT_MAP = {
  [SearchFormItemTypeEnum.SINGLE_SELECT]: singleSelect,
  [SearchFormItemTypeEnum.SEARCH_KEY_INPUT]: searchKeyInput,
  [SearchFormItemTypeEnum.RANGE_INPUT]: rangeInput,
  [SearchFormItemTypeEnum.SINGLE_CHECK_BOX_BUTTON]: singleCheckBoxButton,
  [SearchFormItemTypeEnum.RANGE_DATE_TIME_PICKER]: rangeDateTimePicker,
  [SearchFormItemTypeEnum.TREE_V2]: treeV2,
}

export {
  TYPE_TO_COMPONENT_MAP,
  singleSelect,
  searchKeyInput,
  rangeInput,
  singleCheckBoxButton,
  rangeDateTimePicker,
  treeV2,
}
