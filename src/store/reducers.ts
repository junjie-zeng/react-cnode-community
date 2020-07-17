import { combineReducers } from 'redux'
import { Action } from '../interface'
import { GET_CONTENT_SUSSESS, LOADING, REFRESHTIPS, MSG_TIPS } from './action-type'





// 首页
const contentInfo = {
    loading: false,
    refreshTips: false,
    msgTips: false,
    contentList: []
}


const content = (state = contentInfo, action: Action) => {
    switch (action.type) {
        case GET_CONTENT_SUSSESS:
            return { ...state, contentList: [...action.data, ...state.contentList] }
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