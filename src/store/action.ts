import { getContentListRequest,getContentDetailRequest } from '../api'
import { GET_CONTENT_SUCCESS,GET_CLASSIFY_CONTENT_SUCCESS, LOADING, REFRESHTIPS, MSG_TIPS, GET_CONTENT_DETAIL_SUCCESS } from './action-type'
import { time } from 'console'


/*
    同步action
*/

// 获取内容成功
const changeContent = (data: any) => ({ type: GET_CONTENT_SUCCESS, data })
const changeClassifyContent = (data: any) => ({ type: GET_CLASSIFY_CONTENT_SUCCESS, data })
const changeLoading = (data: boolean) => ({ type: LOADING, data })
const changeRefreshTips = (data: boolean) => ({ type: REFRESHTIPS, data })
const changeMsgTips = (data: boolean) => ({ type: MSG_TIPS, data })
const changeDetail = (data: any) => ({ type: GET_CONTENT_DETAIL_SUCCESS, data })

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
export const getClassifyContent = (page: number, limit: number,tab:string) => {
    return async (dispatch: any) => {
        try {
            dispatch(changeRefreshTips(true))
            let res = await getContentListRequest(page, limit,tab)
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
export const getDetail = (id:string)=>{
    return async(dispatch:any)=>{
        try{
            dispatch(changeRefreshTips(true))
            let res:any =  await getContentDetailRequest(id)
            let data = res.data
            if(data.success){
                dispatch(changeDetail(data.data))
                dispatch(changeRefreshTips(false))
            }
            console.log('getDetail',res)
        }catch(err){
            console.log('getDetail',err)
        }
    }
}