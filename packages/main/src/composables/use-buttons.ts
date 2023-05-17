import { reactive } from 'vue'
import { Button, IButtonProps } from '@/models'

export default function useButtons(propList: IButtonProps[]) {
  const buttons = reactive(propList.map((button) => new Button(button)))
  return { buttons }
}
