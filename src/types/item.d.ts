export interface Item {
  itemNo: string;
  itemName: string;
  itemTypeName: string;
  warehouseName: string;
  areaName: string;
}
export interface ItemRes {
  createBy: number;
  createTime: string;
  updateBy: number;
  updateTime: string;
  id: number;
  itemNo: string;
  itemName: string;
  itemType: string;
  itemTypeName: string;
  unit: string | null;
  rackId: number | null;
  areaId: number;
  warehouseName: string;
  areaName: string;
  warehouseId: number;
  quantity: number | null;
  expiryDate: string | null;
  remark: string | null;
  place: string | null;
  delFlag: number;
}
