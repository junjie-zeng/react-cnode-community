
// action
export interface Action<T = any> {
    type: string,
    data: T
}
