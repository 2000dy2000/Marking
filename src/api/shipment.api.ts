import type { getShipmentListData } from './types/shipment'
import request from '~/http'

export function getShipmentStatus() {
  return request({
    url: '/system/dict/data/type/wms_shipment_status',
    method: 'GET',
  })
}

export function getShipmentType() {
  return request({
    url: '/system/dict/data/type/wms_shipment_type',
    method: 'GET',
  })
}

export function getShipmentList(data: getShipmentListData) {
  return request({
    url: '/wms/shipmentOrder/list',
    method: 'POST',
    params: data,
  })
}

export function getShipmentInfo(id: string) {
  return request({
    url: `/wms/shipmentOrder/${id}`,
    method: 'GET',
  })
}

export function updateShipmentDetailInfo(data: any) {
  return request({
    url: '/wms/shipmentOrderDetail',
    method: 'PUT',
    data,
  })
}

export function getShipmentDetailInfo(id: string) {
  return request({
    url: `/wms/shipmentOrderDetail/${id}`,
    method: 'GET',
  })
}

export function createShipmentInfo(data: any) {
  return request({
    url: '/wms/shipmentOrder/add-or-update',
    method: 'POST',
    data,
  })
}

export function updateShipmentInfo(data: any) {
  return request({
    url: '/wms/shipmentOrder/add-or-update',
    method: 'POST',
    data,
  })
}
