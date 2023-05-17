import { reactive } from 'vue'
import { VxeTree, IVxeTreeProps } from '@/models'

export default function useVxeTree(props?: IVxeTreeProps) {
  const tree = reactive(new VxeTree(props))
  return { tree }
}
