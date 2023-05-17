import { CustomTextarea, CustomColorSelect } from '@/models/formItems'

interface IFormConfig {
  [key: string]: any
}

export default function (data: { [key: string]: any } = {}, formConfig: IFormConfig = {}) {
  return {
    list: [
      new CustomTextarea({
        prop: 'Remark',
        label: '备注',
      }),
      new CustomColorSelect({
        prop: 'color',
        label: '备注颜色',
        options: [
          {
            value: '1',
            label: 'Green',
          },
          {
            value: '2',
            label: 'Red',
          },
          {
            value: '3',
            label: 'Blue',
          },
          {
            value: '4',
            label: 'Orange',
          },
          {
            value: '5',
            label: 'Purple',
          },
          {
            value: '6',
            label: 'Pink',
          },
          {
            value: '7',
            label: 'Cyan',
          },
          {
            value: '8',
            label: 'Brown',
          },
          {
            value: '9',
            label: 'Grey',
          },
        ],
        rules: [
          {
            required: true,
            message: '请选择备注颜色',
            trigger: 'change',
          },
        ],
      }),
    ],
  }
}
