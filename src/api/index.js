/*
    包含了n个接口请求的函数的模块
    函数返回值为：promise
*/

// 引入ajax
import ajax from './ajax';

const _PATH = 'https://cnodejs.org/api/v1'

// https://cnodejs.org/api/v1/topics?page=1&limit=2&markdown=false
// 获取内容列表
export const getContentListRequest = (page, limit, tab = '') => ajax(`${_PATH}/topics?page=${page}&limit=${limit}${tab ? `&tab=${tab}` : ''}`)

// https://cnodejs.org/api/v1/topic/5ee1ee83b703280f0bcb922a
// 获取内容详情
export const getContentDetailRequest = (id) => ajax(`${_PATH}/topic/${id}`)
// 获取用户详情
export const getUserDetailRequest = (username) => ajax(`${_PATH}/user/${username}`)
// https://cnodejs.org/api/v1/user/Q-Angelo

// 获取消息
// https://cnodejs.org/api/v1/messages?accesstoken=xxxx
export const getMsgRequest = (accesstoken)=>ajax(`${_PATH}/messages?accesstoken=${accesstoken}`)
// 效验token
export const verifyTokenRequest = (accesstoken) => ajax(`${_PATH}/accesstoken`, { accesstoken }, 'POST')

