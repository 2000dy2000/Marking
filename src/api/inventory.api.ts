import type { getInventoryListData } from './types/inventory'

import request from '~/http'

export function getInventoryList(data: getInventoryListData) {
  return request({
    url: '/wms/inventory/list',
    method: 'POST',
    data,
  })
}
