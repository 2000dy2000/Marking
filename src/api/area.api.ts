import type { createAreaData, getAreaListData } from './types/area'

import request from '~/http'

/**
 * 获取仓库下属库区（器材室）的列表
 * @param data
 *
 */
export function getAreaList(data: getAreaListData) {
  return request({
    url: '/wms/area/list',
    method: 'POST',
    data,
  })
}

/**
 * 获取库区（器材室）详情
 * @param id
 * @returns
 */
export function getAreaInfo(id: number) {
  return request({
    url: `/wms/area/${id}`,
    method: 'GET',
  })
}

/**
 * 创建库区（器材室）
 * @param data
 * @returns
 */
export function createArea(data: createAreaData) {
  return request({
    url: '/wms/area',
    method: 'POST',
    data,
  })
}
