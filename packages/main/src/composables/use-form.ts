import { reactive } from 'vue'
import { Form, IFormProps } from '@/models'

export default function useForm(props?: IFormProps) {
  const form = reactive(new Form(props))
  return { form }
}
