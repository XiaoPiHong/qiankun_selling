import { ElMessage } from 'element-plus'
import qs from 'qs'
import * as loadUtil from '@/utils/load'
import * as cookieUtil from '@/utils/cookie'

/**
 * 方式 Enum
 */
export enum MethodEnum {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  HEAD = 'HEAD',
}

/**
 * 内容类型 Enum
 */
export enum ContentTypeEnum {
  APPLICATION_JSON = 'application/json',
  APPLICATION_X_WWW_FORM_URLENCODED = 'application/x-www-form-urlencoded', // 默认
  MULTIPART_FORM_DATA = 'multipart/form-data',
  APPLICATION_VND_MS_EXCEL = 'application/vnd.ms-excel',
  IMAGE_JPEG = 'image/jpeg',
  TEXT_HTML = 'text/html; charset=utf-8',
}

interface IRequestOptions {
  /** 请求路径 */
  url: string
  /** 请求方式 */
  method: MethodEnum
  /** params 请求参数 */
  params?: { [key: string]: any }
  /** headers 请求头 */
  headers?: { [key: string]: any }
  /** body 传参 */
  body?: any
}

export default function request(options: IRequestOptions) {
  const { url, method, params = {} } = options
  const headers = {
    'Content-Type': ContentTypeEnum.APPLICATION_X_WWW_FORM_URLENCODED,
    ...options.headers,
  }
  const searchParams = qs.stringify(params)
  let hrefParams = ''
  let { body } = options
  switch (method) {
    case MethodEnum.GET:
    case MethodEnum.HEAD:
      hrefParams = searchParams
      body = undefined
      delete headers['Content-Type'] // 删除默认的APPLICATION_X_WWW_FORM_URLENCODED
      break
    case MethodEnum.PUT:
    case MethodEnum.POST:
      if (headers['Content-Type'] === ContentTypeEnum.APPLICATION_JSON) {
        body = JSON.stringify(params)
      } else if (headers['Content-Type'] === ContentTypeEnum.MULTIPART_FORM_DATA) {
        delete headers['Content-Type'] // 删除使浏览器自动配置才能上传成功
        body = options.body
      } else {
        body = searchParams
      }
      break
  }

  return fetch(`${url}?${hrefParams}`, {
    method,
    body,
    headers,
    credentials: 'include',
  })
    .then((response) => {
      if (response.ok) {
        const contentType = response.headers.get('content-type')
        switch (true) {
          case contentType?.includes(ContentTypeEnum.TEXT_HTML): // 此处接口返回不规范，应该返回ContentTypeEnum.APPLICATION_JSON，告诉前端解析json
          case contentType?.includes(ContentTypeEnum.APPLICATION_JSON): {
            const getBodyPromise = response.json()
            return getBodyPromise.then((body) => {
              // 规范：通过判断 code 字段进行不同处理，此处使用IsSuccess
              switch (body.IsSuccess) {
                case true:
                  return body
                case undefined: // 此处后端接口处理不规范，直接返回了内容，接口：/ProductCategory/ReLoad
                  return body
                case false: {
                  if (body.ResponseError && body.ResponseError.Message) {
                    switch (body.ResponseError.Code) {
                      case 6: // 未登录
                        cookieUtil.tk.remove()
                        window.location.reload()
                        return Promise.reject(new Error(body.ResponseError.Message))
                      default: // 其他
                        return Promise.reject(new Error(body.ResponseError.Message))
                    }
                  }
                  return Promise.reject(new Error(body.Message))
                }
              }
            })
          }
          case contentType?.includes(ContentTypeEnum.IMAGE_JPEG): {
            return response.blob().then((blob) => {
              const objUrl = window.URL.createObjectURL(blob)
              return objUrl
            })
          }
          case contentType?.includes(ContentTypeEnum.APPLICATION_VND_MS_EXCEL): {
            return response.blob().then((blob) => {
              const url = window.URL.createObjectURL(blob)

              loadUtil.download(
                url,
                decodeURIComponent(
                  response.headers.get('content-disposition')?.split('attachment;filename=')[1] ??
                    `${Date.now()}.xlsx`
                )
              )
              window.URL.revokeObjectURL(url)
            })
          }
          default:
            return Promise.reject(new Error('请求失败'))
        }
      } else {
        return Promise.reject(new Error('请求失败'))
      }
    })
    .catch((error) => {
      ElMessage({
        type: 'error',
        message: error.message,
      })
      return Promise.reject(error)
    })
}
