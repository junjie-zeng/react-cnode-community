import { getContentListRequest } from '../api'
import { GET_CONTENT_SUSSESS, LOADING, REFRESHTIPS,MSG_TIPS } from './action-type'


/*
    同步action
*/

// 获取内容成功
const changeContentList = (data: any) => ({ type: GET_CONTENT_SUSSESS, data })
const changeLoading  = (data:boolean) =>({type:LOADING,data})
const changeRefreshTips = (data:boolean) =>({type:REFRESHTIPS,data})
const changeMsgTips = (data:boolean)=>({type:MSG_TIPS,data})


/*
    异步action
*/

export const getContent = (page: number, limit: number) => {
    
    return async (dispatch: any) => {
        try {
            let timer:any = null
            // dispatch(changeLoading(true))
            dispatch(changeRefreshTips(true))
            dispatch(changeMsgTips(true))
            
            let res = await getContentListRequest(page, limit)
            let data = res.data
            
            if (data.success) {
                
                console.log("getContent", data.data)
                // dispatch(changeLoading(false))
                dispatch(changeRefreshTips(false))
                dispatch(changeContentList(data.data))
                clearTimeout(timer)
                timer = setTimeout(()=>{
                    dispatch(changeMsgTips(false))
                    clearTimeout(timer)
                },2000)
            }

        } catch (err) {
            console.log("getContent", err)
        }

    }

}