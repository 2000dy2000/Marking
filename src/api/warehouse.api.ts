import type { createWarehouseData } from './types/warehouse'

import request from '~/http'

/**
 * 获取仓库列表
 *
 */
export function getAllWareHouseList() {
  return request({
    url: '/wms/warehouse/list',
    method: 'POST',
  })
}

export function createWarehouse(data: createWarehouseData) {
  return request({
    url: '/wms/warehouse',
    method: 'POST',
    data,
  })
}
