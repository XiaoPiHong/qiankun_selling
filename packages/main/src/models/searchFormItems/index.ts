import SingleSelect from './SingleSelect'
import SearchKeyInput from './SearchKeyInput'
import RangeInput from './RangeInput'
import SingleCheckBoxButton from './SingleCheckBoxButton'
import RangeDateTimePicker from './RangeDateTimePicker'
import TreeV2 from './TreeV2'
import { SearchFormItemTypeEnum } from '@/models/searchFormItems/enums'

export { default as SingleSelect } from './SingleSelect'
export { default as SearchKeyInput } from './SearchKeyInput'
export { default as RangeInput } from './RangeInput'
export { default as SingleCheckBoxButton } from './SingleCheckBoxButton'
export { default as RangeDateTimePicker } from './RangeDateTimePicker'
export { default as TreeV2 } from './TreeV2'

export const TYPE_TO_MODEL_MAP = {
  [SearchFormItemTypeEnum.SINGLE_SELECT]: SingleSelect,
  [SearchFormItemTypeEnum.SEARCH_KEY_INPUT]: SearchKeyInput,
  [SearchFormItemTypeEnum.RANGE_INPUT]: RangeInput,
  [SearchFormItemTypeEnum.SINGLE_CHECK_BOX_BUTTON]: SingleCheckBoxButton,
  [SearchFormItemTypeEnum.RANGE_DATE_TIME_PICKER]: RangeDateTimePicker,
  [SearchFormItemTypeEnum.TREE_V2]: TreeV2,
}

export type SearchFormItemModelType =
  | SingleSelect
  | SearchKeyInput
  | RangeInput
  | SingleCheckBoxButton
  | RangeDateTimePicker
  | TreeV2
