import request, { MethodEnum } from '@/utils/request'

const { VITE_BASE_URL } = import.meta.env

export function postSupplier(params) {
  return request({
    url: `${VITE_BASE_URL}/User/Login`,
    method: MethodEnum.POST,
    params,
  })
}

export function getVerifyCode(params) {
  return request({
    url: `${VITE_BASE_URL}/User/GetVerifyCode`,
    method: MethodEnum.GET,
    params,
  })
}
