import type { getReceiptOrderListData } from './types/receiptOrder'

import request from '~/http'

export function getReceiptOrderList(data: getReceiptOrderListData) {
  return request({
    url: '/wms/receiptOrder/list',
    method: 'POST',
    data,
  })
}

export function getReceiptOrderDetail(id: number | string) {
  return request({
    url: `/wms/receiptOrder/${id}`,
    method: 'GET',
  })
}

export function getReceiptStatus() {
  return request({
    url: '/system/dict/data/type/wms_receipt_status',
    method: 'GET',
  })
}

export function getReceiptType() {
  return request({
    url: '/system/dict/data/type/wms_receipt_type',
    method: 'GET',
  })
}

export function updateReceiptOrder(data: any) {
  return request({
    url: '/wms/receiptOrder/add-or-update',
    method: 'POST',
    data,
  })
}

export function createReceiptOrder(data: any) {
  return request({
    url: '/wms/receiptOrder/add-or-update',
    method: 'POST',
    data,
  })
}

export function getReceiptOrderDetailInfo(id: number) {
  return request({
    url: `/wms/receiptOrderDetail/${id}`,
    method: 'GET',
  })
}

export function updateReceiptOrderDetail(data: any) {
  return request({
    url: '/wms/receiptOrderDetail',
    method: 'PUT',
    data,
  })
}
