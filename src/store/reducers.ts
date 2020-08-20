import { combineReducers } from 'redux'
import { Action } from '../interface'
import { GET_CONTENT_SUCCESS, GET_CLASSIFY_CONTENT_SUCCESS, GET_CONTENT_DETAIL_SUCCESS, LOADING, REFRESHTIPS, MSG_TIPS, GET_USERINFO_SUCCESS, GET_MSG_SUCCESS ,GET_USER_COLLECT_SUCCESS} from './action-type'

import { MASK, PANEL } from './action-type'



// 首页
const contentState = {
    loading: false,
    refreshTips: false, // 刷新提示 加载中
    msgTips: false,     // 刷新提示
    contentList: [],    // 内容列表
    classifyContentList: [],
    detail: {}           // 详情
}


const content = (state = contentState, action: Action) => {
    switch (action.type) {
        case GET_CONTENT_SUCCESS:
            return { ...state, contentList: [...action.data, ...state.contentList] }
        case GET_CLASSIFY_CONTENT_SUCCESS:
            return { ...state, classifyContentList: action.data }
        case GET_CONTENT_DETAIL_SUCCESS:
            return { ...state, detail: action.data }
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

// 用户信息
const userState = {
    userInfo: {},
    userCollect: []
}

const user = (state = userState, action: Action) => {
    switch (action.type) {
        case GET_USERINFO_SUCCESS:
            return { ...state, userInfo: action.data }
        case GET_USER_COLLECT_SUCCESS:
            return { ...state, userCollect: action.data }
        default:
            return state
    }
}

// 消息
const msgState = {
    msgInfo: {}
}

const msg = (state = msgState, action: Action) => {
    switch (action.type) {
        case GET_MSG_SUCCESS:
            return { ...state, msgInfo: action.data }
        default:
            return state
    }
}

// assistState
const assistState = {
    mask: false,
    panel: false
}

const assist = (state = assistState, action: Action) => {
    switch (action.type) {
        case MASK:
            return { ...state, mask: action.data }
        case PANEL:
            return { ...state, panel: action.data }
        default:
            return state
    }
}




export default combineReducers({
    content,
    user,
    msg,
    assist
})