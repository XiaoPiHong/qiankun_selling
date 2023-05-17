import { CustomCheckbox, CustomSwitch } from '@/models/formItems'

interface IFormConfig {
  [key: string]: any
}
export default function (data: { [key: string]: any } = {}, formConfig: IFormConfig = {}) {
  return {
    list: [
      new CustomCheckbox({
        prop: 'StoreIds',
        label: '店铺',
        options: [
          {
            label: 'allegro',
            value: '156',
          },
          {
            label: 'allegro_delete',
            value: '7840',
          },
          {
            label: 'k-allegrosandbox',
            value: '1543',
          },
          {
            label: '沙盒环境可用于测试刊登产品-51selling',
            value: '9020',
          },
        ],
        rules: [
          {
            required: true,
            message: '请选择店铺',
            trigger: 'change',
          },
        ],
      }),
      new CustomSwitch({
        prop: 'AutoAfterTemp',
        label: '物流模板',
        value: true,
        activeText: '自动',
      }),
    ],
  }
}
