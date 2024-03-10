export interface getAreaListData {
  areaNameLike?: string
  areaNo?: string
  warehouseId?: number
}

export interface createAreaData {
  areaName: string
  areaNo: string
  warehouseId: number
  remark?: string
}