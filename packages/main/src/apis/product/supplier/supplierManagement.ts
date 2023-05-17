import request, { MethodEnum, ContentTypeEnum } from '@/utils/request'

const { VITE_BASE_URL } = import.meta.env

export function getSupplierList(params) {
  return request({
    url: `${VITE_BASE_URL}/Supplier`,
    method: MethodEnum.POST,
    params,
  })
}
export function deleteSupplier(params) {
  return request({
    url: `${VITE_BASE_URL}/Supplier/Delete`,
    method: MethodEnum.POST,
    params,
  })
}
export function postSupplierAddAndEdit(params) {
  return request({
    url: `${VITE_BASE_URL}/Supplier/Edit`,
    method: MethodEnum.POST,
    params,
  })
}

export function importSupplierExcelSave(body) {
  return request({
    url: `${VITE_BASE_URL}/Supplier/ImportExcelSave`,
    method: MethodEnum.POST,
    body,
    headers: {
      'Content-Type': ContentTypeEnum.MULTIPART_FORM_DATA,
    },
  })
}
