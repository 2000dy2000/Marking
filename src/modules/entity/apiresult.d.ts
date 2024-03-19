export interface ApiResult<T> {
    map(arg0: (item: T) => T): never[];
    map(arg1: (item: any) => { userId: any; id: any; question: any; answer: boolean; feedback: string; selectedOptions: string; time: string; }): never[];
    rows: { createBy: number; createTime: string; updateBy: number | null; updateTime: string | null; searchValue: string | null; remark: string; params: Record<string, any>; userId: number; deptId: number; userName: string; nickName: string; email: string; phonenumber: string; sex: string; avatar: string; salt: string | null; status: string; delFlag: string; loginIp: string; loginDate: string; dept: { createBy: number | null; createTime: string | null; updateBy: number | null; updateTime: string | null; searchValue: string | null; remark: string | null; params: Record<string, any>; deptId: number; parentId: number | null; ancestors: string | null; deptName: string; orderNum: number | null; leader: string; phone: string | null; email: string | null; status: string | null; delFlag: string | null; parentName: string | null; children: any[]; }; roles: string[]; roleIds: number[] | null; postIds: number[] | null; roleId: number | null; admin: boolean; }[];
    total: number;
    content: T;
    uuid: string;
    img: string;
    code: number;
    data: T;
    msg: string;
    token: string;
    user: object;
}

// 实现重载的函数
export function map<T>(apiResult: ApiResult<T>, mapper: (item: T) => T): never[];
export function map(apiResult: ApiResult<any>, mapper: (item: any) => { userId: any; id: any; question: any; answer: boolean; feedback: string; selectedOptions: string; time: string; }): never[];
export function map(apiResult: ApiResult<any>, mapper: (item: any) => any): never[] {
    return apiResult.rows.map(mapper);
}
