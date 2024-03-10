import request from '~/http'

export function getInventoryHistoryList(data: any) {
  return request({
    url: '/wms/inventoryHistory/list',
    method: 'POST',
    data,
  })
}
