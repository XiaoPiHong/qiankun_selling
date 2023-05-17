import request, { MethodEnum } from '@/utils/request'

const { VITE_BASE_URL } = import.meta.env

/** 获取分页 */
export function postAllegroList(params) {
  return request({
    url: `${VITE_BASE_URL}/AllegroListingUpload`,
    method: MethodEnum.POST,
    params,
  })
}
/** 获取分类 */
export function postProductCategoryReLoad(params) {
  return request({
    url: `${VITE_BASE_URL}/ProductCategory/ReLoad`,
    method: MethodEnum.POST,
    params,
  })
}

/** 立即发布 */
export function postAllegroListingUploadAsyncReleaseOffer(params) {
  return request({
    url: `${VITE_BASE_URL}/AllegroListingUpload/AsyncReleaseOffer`,
    method: MethodEnum.POST,
    params,
  })
}

/** 后台发布 */
export function postAllegroListingUploadReleaseOfferStatus(params) {
  return request({
    url: `${VITE_BASE_URL}/AllegroListingUpload/ReleaseOfferStatus`,
    method: MethodEnum.POST,
    params,
  })
}
/** 取消发布 */
export function postAllegroListingUploadUnPublish(params) {
  return request({
    url: `${VITE_BASE_URL}/AllegroListingUpload/UnPublish`,
    method: MethodEnum.POST,
    params,
  })
}
/** 删除前1000行 */
export function postAllegroListingUploadBulkDelete(params) {
  return request({
    url: `${VITE_BASE_URL}/AllegroListingUpload/BulkDelete`,
    method: MethodEnum.POST,
    params,
  })
}

/** 删除 */
export function postAllegroListingUploadDelete(params) {
  return request({
    url: `${VITE_BASE_URL}/AllegroListingUpload/Delete`,
    method: MethodEnum.POST,
    params,
  })
}

/** 复制 */
export function postAllegroListingUploadCopySave(params) {
  return request({
    url: `${VITE_BASE_URL}/AllegroListingUpload/CopySave`,
    method: MethodEnum.POST,
    params,
  })
}

/** 备注 */
export function postAllegrolistinguploadSetEditRemark(params) {
  return request({
    url: `${VITE_BASE_URL}/allegrolistingupload/SetEditRemark`,
    method: MethodEnum.POST,
    params,
  })
}

/** 查找来源 */
export function postFileSearchSupplyUrl(params) {
  return request({
    url: `${VITE_BASE_URL}/File/SearchSupplyUrl`,
    method: MethodEnum.POST,
    params,
  })
}
/** 设置分类 */
export function postAllegroListingUploadSetProductCategroy(params) {
  return request({
    url: `${VITE_BASE_URL}/AllegroListingUpload/SetProductCategroy`,
    method: MethodEnum.POST,
    params,
  })
}
