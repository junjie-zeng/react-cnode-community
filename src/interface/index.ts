
// action
export interface Action<T = any> {
    type: string,
    data: T
}


// 路由
export interface RouteInterface {
    path: string,
    component: any,
    routes?: Array<any>
}

// 首页
export interface HomeInfo{
    loading:boolean,
    refreshTips:boolean,
    drowDownRefresh:boolean,
    contentList:Array<any>
}