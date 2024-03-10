import type { getItemListData } from './types/item'

import request from '~/http'

interface InventoryListPayload {
  itemId: number | null
  panelType: string | '20'
}

export function getItemTypeList() {
  return request({
    url: '/wms/itemType/treeselect',
    method: 'GET',
  })
}

export function getItemList(data: getItemListData) {
  return request({
    url: '/wms/item/list?page=0&size=9999',
    method: 'POST',
    data,
  })
}

export function getItemInfo(id: number | string) {
  return request({
    url: `/wms/item/${id}`,
    method: 'GET',
  })
}

export function getInventoryList(payload: InventoryListPayload) {
  return request({
    url: '/wms/inventory/list',
    method: 'POST',
    data: payload,
  })
}
