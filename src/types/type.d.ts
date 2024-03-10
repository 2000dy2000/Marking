export interface ItemType {
  itemTypeId: number
  typeName: string
  parentId: number
  status: string
  createTime: string
}

export interface ItemTypeRes {
  ancestors: string;
  children: any[];  // 也可以使用递归的方式定义 ItemType[]
  createBy: number;
  createTime: string;
  delFlag: string;
  itemTypeId: number;
  orderNum: string;
  parentId: number;
  parentName: string;
  status: string;
  typeName: string;
  updateBy: number;
  updateTime: string;
}
