export interface User {
  remark: string
  userName: string
  email: string
  phoneNumber: number
  sex: number
  deptName: string
}

export interface serRes {
  createBy: number;
  createTime: string;
  updateBy: number | null;
  updateTime: string | null;
  searchValue: string | null;
  remark: string;
  params: Record<string, any>;
  userId: number;
  deptId: number;
  userName: string;
  nickName: string;
  email: string;
  phonenumber: string;
  sex: string;
  avatar: string;
  salt: string | null;
  status: string;
  delFlag: string;
  loginIp: string;
  loginDate: string;
  dept: {
    createBy: number | null;
    createTime: string | null;
    updateBy: number | null;
    updateTime: string | null;
    searchValue: string | null;
    remark: string | null;
    params: Record<string, any>;
    deptId: number;
    parentId: number | null;
    ancestors: string | null;
    deptName: string;
    orderNum: number | null;
    leader: string;
    phone: string | null;
    email: string | null;
    status: string | null;
    delFlag: string | null;
    parentName: string | null;
    children: any[]; // You can replace any[] with a more specific type if known
  };
  roles: string[];
  roleIds: number[] | null;
  postIds: number[] | null;
  roleId: number | null;
  admin: boolean;
}

