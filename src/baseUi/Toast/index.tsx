import React from 'react'
import ReactDOM from 'react-dom'
import Toast from './Toast'
import './toast.css'

// 创建通知
function createNotification() {
    const div = document.createElement('div')
    document.body.appendChild(div)
    // Toast实例
    const notification: any = ReactDOM.render(<Toast />, div)
    //console.log(notification)
    return {
        addNotice(notice: any) {
            return notification.addNotice(notice)
        }, destroy() {
            console.log('destroy.....')
            ReactDOM.unmountComponentAtNode(div)
            document.body.removeChild(div)
        }
    }
}

let notification: any = null
const notice = (type: any, content: any, duration = 2000, callback: any) => {
    if (!notification)
        // 创建通知通过实例调用toast组件添加方法
        notification = createNotification()
    return notification.addNotice({ type, content, duration, callback })
}

export default {
    info(content: string, duration?: number, callback?: any) {
        return notice('info', content, duration, callback)
    },
    success(content = '成功', duration?: number, callback?: any) {
        return notice('success', content, duration, callback)
    },
    err(content: string, duration?: number, callback?: any) {
        return notice('error', content, duration, callback)
    },
    loading(content = '加载中...', duration = 0, callback?: any) {
        return notice('loading', content, duration, callback)
    }
}