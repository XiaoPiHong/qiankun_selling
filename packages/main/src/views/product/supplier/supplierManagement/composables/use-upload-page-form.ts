import { CustomUpload } from '@/models/formItems'

export default function () {
  return {
    list: [
      new CustomUpload({
        label: '供应商文件',
        prop: 'fileExcel',
        multiple: false,
        drag: true,
        limit: 1,
        accept:
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel',
        autoUpload: false,
        rules: [
          {
            required: true,
            message: '文件不能为空',
            trigger: 'change',
          },
        ],
      }),
    ],
  }
}
