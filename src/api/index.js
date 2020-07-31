/*
    包含了n个接口请求的函数的模块
    函数返回值为：promise
*/

// 引入ajax
import ajax from './ajax';

const _PATH = 'https://cnodejs.org/api/v1'

// https://cnodejs.org/api/v1/topics?page=1&limit=2&markdown=false

export const getContentListRequest = (page, limit, tab = '' ) => ajax(`${_PATH}/topics?page=${page}&limit=${limit}${tab ? `&tab=${tab}` : ''}`)

// https://cnodejs.org/api/v1/topic/5ee1ee83b703280f0bcb922a

export const getContentDetailRequest = (id) => ajax(`${_PATH}/topic/${id}`)

export const getUserDetailRequest = (username)=>ajax(`${_PATH}/user/${username}`)
// https://cnodejs.org/api/v1/user/Q-Angelo