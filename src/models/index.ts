
// action
export interface Action<T = any> {
    type: string,
    data: T
}


// 路由
interface Router {
    path: string,
    component: any,
    routes?: Array<any>
  }