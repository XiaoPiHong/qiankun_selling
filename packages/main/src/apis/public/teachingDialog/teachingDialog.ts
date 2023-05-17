import request, { MethodEnum } from '@/utils/request'

const { VITE_BASE_URL } = import.meta.env

/** 获取教程内容 */
export function postTeaching(params) {
  return request({
    url: `${VITE_BASE_URL}/HelpDocument`,
    method: MethodEnum.POST,
    params,
  })
}
