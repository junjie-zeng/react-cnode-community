import { getContentListRequest, getContentDetailRequest, getUserDetailRequest, verifyTokenRequest, getMsgRequest, getUserCollectRequest ,collectRequest,delCollectRequest} from '../api'
import { GET_CONTENT_SUCCESS, GET_CLASSIFY_CONTENT_SUCCESS, LOADING, REFRESHTIPS, MSG_TIPS, GET_CONTENT_DETAIL_SUCCESS, GET_USERINFO_SUCCESS, GET_MSG_SUCCESS } from './action-type'
import { GET_USER_COLLECT_SUCCESS } from './action-type'


/*
    同步action
*/

// 修改内容
const changeContent = (data: any) => ({ type: GET_CONTENT_SUCCESS, data })
const changeClassifyContent = (data: any) => ({ type: GET_CLASSIFY_CONTENT_SUCCESS, data })
const changeLoading = (data: boolean) => ({ type: LOADING, data })
const changeRefreshTips = (data: boolean) => ({ type: REFRESHTIPS, data })
const changeMsgTips = (data: boolean) => ({ type: MSG_TIPS, data })
const changeDetail = (data: any) => ({ type: GET_CONTENT_DETAIL_SUCCESS, data })
const changeUserCollect = (data: any) => ({ type: GET_USER_COLLECT_SUCCESS, data })
const changeMsg = (data: any) => ({ type: GET_MSG_SUCCESS, data })


// 修改遮罩

const changeAssist = (type: string, data: boolean) => ({ type, data })


// 修改用户信息
const changeUserDetail = (data: any) => ({ type: GET_USERINFO_SUCCESS, data })

/*
    异步action
*/

// 获取内容
export const getContent = (page: number, limit: number) => {

    return async (dispatch: any) => {
        try {

            // dispatch(changeLoading(true))
            dispatch(changeRefreshTips(true))
            dispatch(changeMsgTips(true))

            let res = await getContentListRequest(page, limit)
            let data = res.data
            let timer: any = null
            console.log("timer start...", timer)
            if (data.success) {
                console.log("getContent", data.data)
                // dispatch(changeLoading(false))
                dispatch(changeRefreshTips(false))
                dispatch(changeContent(data.data))
                clearTimeout(timer)
                timer = setTimeout(() => {
                    dispatch(changeMsgTips(false))
                    clearTimeout(timer)
                }, 2000)

            }
            console.log("timer end...", timer)

        } catch (err) {
            console.log("getContent", err)
        }

    }

}

// 根据分类获取内容
export const getClassifyContent = (page: number, limit: number, tab: string) => {
    return async (dispatch: any) => {
        try {
            dispatch(changeRefreshTips(true))
            let res = await getContentListRequest(page, limit, tab)
            let data = res.data
            console.log("getClassifyContent...", data.data)
            dispatch(changeRefreshTips(false))
            dispatch(changeClassifyContent(data.data))
        } catch (err) {
            console.log("getClassifyContent...", err)
        }

    }

}

// 获取详情
export const getDetail = (id: string,token:string) => {
    return async (dispatch: any) => {
        try {
            dispatch(changeRefreshTips(true))
            let res: any = await getContentDetailRequest(id,token)
            let data = res.data
            if (data.success) {
                dispatch(changeDetail(data.data))
                dispatch(changeRefreshTips(false))
            }
            console.log('getDetail', res)
        } catch (err) {
            console.log('getDetail', err)
        }
    }
}

// 收藏
export const setCollect = (id:string,token:string,isCollect:boolean) =>{
    return async (dispatch:any)=>{
        try{
            if(isCollect){
                let res:any = await delCollectRequest(token,id)
                console.log('delCollectRequest...',res)
            }else{
                let res:any = await collectRequest(token,id)
                console.log('collectRequest...',res)
            }
            // 重新调用详情，触发状态更新
            dispatch(getDetail(id,token))
        }catch(err){
            console.log('setCollect err...',err)
        }
    }
}

// 获取用户信息
export const getUserDetail = (username: string) => {
    return async (dispatch: any) => {
        try {
            let res: any = await getUserDetailRequest(username)
            let data = res.data
            dispatch(changeUserDetail(data.data))
            console.log('getUserDetail...', data.data)
        } catch (err) {
            console.log('getUserDetail...', err)
        }
    }
}

// 获取用户收藏
export const getUserCollect = (username: string, callback?: Function) => {
    return async (dispatch: any) => {
        try {
            let res: any = await getUserCollectRequest(username)
            let data = res.data
            dispatch(changeUserCollect(data.data))
            callback && callback()
            //console.log('getUserCollect res ...',data.data)
        } catch (err) {
            console.log('getUserCollect err ...', err)
        }
    }
}


// 获取消息 getMsgRequest
export const getMsg = (token: string) => {
    return async (dispatch: any) => {
        try {
            let res: any = await getMsgRequest(token)
            let data = res.data
            console.log('getMsg res...', data.data)
            dispatch(changeMsg(data.data))
        } catch (err) {
            console.log('getMsg err...', err)
        }
    }
}

// 效验token
export const setToken = (token: string, callback: Function) => {
    return async () => {
        try {
            let res: any = await verifyTokenRequest(token)
            let data = res.data
            // 本地存储
            localStorage.setItem('token', token)
            localStorage.setItem('user', JSON.stringify(data))
            callback && callback(true)
            console.log('setToken res...', data)
        } catch (err) {
            callback && callback(false)
            console.log('setToken...', err)
        }
    }
}

// 遮罩
// export const setMask = (isMask: boolean) => changeAssist(MASK, isMask)
// 查看面板
// export const setSeePanle = (isPanle: boolean) => changeAssist(PANEL, isPanle)
// 设置辅助状态
export const setAssist = (type: string, is: boolean) => changeAssist(type, is)