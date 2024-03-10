import type { getMovementListData } from './types/movement'
import request from '~/http'

export function getMovementType() {
  return request({
    url: '/system/dict/data/type/wms_movement_type',
    method: 'GET',
  })
}

export function getMovementStatus() {
  return request({
    url: '/system/dict/data/type/wms_movement_status',
    method: 'GET',
  })
}

export function getMovementList(data: getMovementListData) {
  return request({
    url: '/wms/inventoryMovement/list',
    method: 'POST',
    data,
  })
}

export function getMovementInfo(id: number) {
  return request({
    url: `/wms/inventoryMovement/${id}`,
    method: 'GET',
  })
}

export function createMovement(data: any) {
  return request({
    url: '/wms/inventoryMovement/add-or-update',
    method: 'POST',
    data,
  })
}

export function updateMovement(data: any) {
  return request({
    url: '/wms/inventoryMovement/add-or-update',
    method: 'POST',
    data,
  })
}
