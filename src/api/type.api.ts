import request from '~/http'
import type { ItemTypeRes } from '~/types/type'

export function getAllTypes() {
  return request({
    url: '/wms/itemType/noPageList',
    method: 'GET',
  })
}

export function updateItemType(payload: ItemTypeRes) {
  return request({
    url: '/wms/itemType',
    method: 'PUT',
    data: payload,
  })
}
export function createItemType(itemType: ItemTypeRes) {
  return request({
    url: '/wms/itemType',
    method: 'POST',
    data: itemType,
  })
}
