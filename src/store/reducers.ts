import { combineReducers } from 'redux'
import { Action } from '../interface'
import { GET_CONTENT_SUCCESS,GET_CONTENT_DETAIL_SUCCESS, LOADING, REFRESHTIPS, MSG_TIPS } from './action-type'





// 首页
const contentInfo = {
    loading: false,
    refreshTips: false, // 刷新提示 加载中
    msgTips: false,     // 刷新提示
    contentList: [],    // 内容列表
    detail:{}           // 详情
}


const content = (state = contentInfo, action: Action) => {
    switch (action.type) {
        case GET_CONTENT_SUCCESS:
            return { ...state, contentList: [...action.data, ...state.contentList] }
        case GET_CONTENT_DETAIL_SUCCESS:
            return {...state,detail:action.data}
        case LOADING:
            return { ...state, loading: action.data }
        case REFRESHTIPS:
            return { ...state, refreshTips: action.data }
        case MSG_TIPS:
            return { ...state, msgTips: action.data }
        default:
            return state
    }
}


export default combineReducers({
    content
})