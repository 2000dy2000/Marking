export interface Warehouse {
  id: number
  warehouseName: string
  logoUrl: string
  remark: string
}

export interface WarehouseRes {
  createBy: number
  createTime: string
  updateBy: number
  updateTime: string
  id: number
  warehouseName: string
  warehouseNo: string
  delFlag: number
  remark: string
}
