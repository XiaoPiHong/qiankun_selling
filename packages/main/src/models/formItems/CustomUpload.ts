import type { UploadFile } from 'element-plus'
import { FormItemTypeEnum } from './enums'
import { FormItem, IFormItemProps } from './abstracts'
import { cloneDeep } from '@/utils'

const onPreview = () => {}
const onRemove = () => {}
const onSuccess = () => {}
const onError = () => {}
const onProgress = () => {}
const beforeUpload = () => {}
const beforeRemove = () => {}
const httpRequest = () => {}
const onExceed = () => {}

type MethodType = 'POST' | 'PUT' | 'PATCH'
type ListType = 'text' | 'picture' | 'picture-card'
type T = UploadFile[]

interface ICustomUploadProps extends IFormItemProps {
  action?: string
  headers?: any
  method?: MethodType
  multiple?: boolean
  data?: object
  name?: string
  withCredentials?: boolean
  showFileList?: boolean
  drag?: boolean
  accept?: string
  fileList?: T
  listType?: ListType
  autoUpload?: boolean
  disabled?: boolean
  limit?: number
  onPreview?: () => void
  onRemove?: (file: UploadFile, fileList: UploadFile[]) => void
  onSuccess?: (response: any, file: UploadFile, fileList: UploadFile[]) => void
  onError?: (err: any, file: UploadFile, fileList: UploadFile[]) => void
  onProgress?: (event: any, file: UploadFile, fileList: UploadFile[]) => void
  beforeUpload?: (file: UploadFile) => void
  beforeRemove?: (file: UploadFile, fileList: UploadFile[]) => any
  httpRequest?: () => void
  onExceed?: (files: File[], uploadFiles: UploadFile[]) => void
}

export default class CustomUpload extends FormItem {
  readonly _type = FormItemTypeEnum.CUSTOM_UPLOAD

  /** 必选参数，上传的地址 */
  action: string

  /** 设置上传的请求头部 */
  headers: any

  /** 设置上传的请求头部 */
  method: MethodType

  /** 是否支持多选文件 */
  multiple: boolean

  /** 上传时附带的额外参数 */
  data: object

  /** 上传的文件字段名 */
  name: string

  /** 支持发送 cookie 凭证信息 */
  withCredentials: boolean

  /** 是否显示已上传文件列表 */
  showFileList: boolean

  /** 是否启用拖拽上传 */
  drag: boolean

  /** 接受上传的文件类型（thumbnail-mode 模式下此参数无效） */
  accept: string

  /** 默认上传的文件，例如：[{name: 'food.jpg', url: 'https://xxx.cdn.com/xxx.jpg'}] */
  fileList: T

  /** 文件列表的类型 */
  listType: ListType

  /** 是否自动上传文件 */
  autoUpload: boolean

  /** 是否禁用上传 */
  declare disabled: boolean

  /** 允许上传的最大数量 */
  limit: number

  /** 点击文件列表中已上传的文件时的钩子 */
  onPreview: () => void

  /** 文件列表移除文件时的钩子 */
  onRemove: (file: UploadFile, fileList: UploadFile[]) => void

  /** 文件上传成功时的钩子 */
  onSuccess: (response: any, file: UploadFile, fileList: UploadFile[]) => void

  /** 文件上传失败时的钩子 */
  onError: (err: any, file: UploadFile, fileList: UploadFile[]) => void

  /** 文件上传时的钩子 */
  onProgress: (event: any, file: UploadFile, fileList: UploadFile[]) => void

  /** 上传文件之前的钩子，参数为上传的文件。 若返回 false 或者返回 Promise 且被 reject，则终止上传。 */
  beforeUpload: (file: UploadFile) => void

  /** 删除文件之前的钩子，参数为上传的文件和文件列表。 若返回 false 或者返回 Promise 且被 reject，则终止删除。 */
  beforeRemove: (file: UploadFile, fileList: UploadFile[]) => any

  /** 覆盖默认的XHR行为，允许您实现自己的上传文件的请求 */
  httpRequest: () => void

  /** 当超过限制时钩子函数 */
  onExceed: (files: File[], uploadFiles: UploadFile[]) => void

  constructor(props: ICustomUploadProps) {
    super(props)

    this.action = props.action || ''
    this.headers = props.headers || {}
    this.method = props.method || 'POST'
    this.multiple = props.multiple || false
    this.data = props.data || {}
    this.name = props.name || 'file'
    this.withCredentials = props.withCredentials || false
    this.showFileList = props.showFileList || true
    this.drag = props.drag || false
    this.accept = props.accept || ''
    this.fileList = props.fileList || []
    this.listType = props.listType || 'text'
    this.autoUpload = props.autoUpload || true
    this.disabled = props.disabled || false
    this.limit = props.limit || 9
    this.onPreview = props.onPreview || onPreview
    this.onRemove = props.onRemove || onRemove
    this.onSuccess = props.onSuccess || onSuccess
    this.onError = props.onError || onError
    this.onProgress = props.onProgress || onProgress
    this.beforeUpload = props.beforeUpload || beforeUpload
    this.beforeRemove = props.beforeRemove || beforeRemove
    this.httpRequest = props.httpRequest || httpRequest
    this.onExceed = props.onExceed || onExceed
  }

  copy() {
    return new CustomUpload(cloneDeep(this))
  }

  getValue() {
    return this.fileList
  }

  setValue(value) {
    this.fileList = value
  }

  getFormValue() {
    return this.fileList
  }

  onBeforeChange(...args: any[]) {
    this.setValue(args[1])
  }
}
