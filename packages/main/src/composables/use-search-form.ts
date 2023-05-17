import { reactive } from 'vue'
import { SearchForm, ISearchFormProps } from '@/models'

export default function useSearchForm(props?: ISearchFormProps) {
  const searchForm = reactive(new SearchForm(props))
  return { searchForm }
}
