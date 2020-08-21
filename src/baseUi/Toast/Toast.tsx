import React, { Component } from 'react'

interface Props {

}
interface State {
    notices: Array<any>
}


class Toast extends Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {
            notices: []
        }

    }

    transitionTime = 300
    // 唯一标识
    getNoticeKey() {
        const { notices } = this.state
        return `notice-${new Date().getTime()}-${notices.length}`
    }
    // 添加
    addNotice(notice: any) {
        const { notices } = this.state
        // 生成标识
        notice.key = this.getNoticeKey()
        // 添加 
        // notices.push(notice);
        // 只添加一个 
        notices[0] = notice;
        // 更新
        this.setState({ notices })
        // 有延迟则等待 否则返回回调（根据回调去决定是否删除）
        if (notice.duration > 0) {
            setTimeout(() => {
                this.removeNotice(notice.key)
            }, notice.duration)
        } return () => {
            this.removeNotice(notice.key)
        }
    }
    // 删除
    removeNotice = (key: any) => {
        let { notices } = this.state
        // 过滤
        notices = notices.filter((notice) => {
            if (notice.key === key) {
                if (notice.callback)
                    // 执行回调
                    setTimeout(notice.callback, this.transitionTime)
                return false
            }
            return true
        })
        // 更新
        this.setState({
            notices: notices
        })
    }

    render() {
        const { notices } = this.state
        const icons: any = {
            info: 'toast_info',
            success: 'toast_success',
            error: 'toast_error',
            loading: 'toast_loading'
        }
        return (
            <div className="toast">
                {
                    notices.map((notice: any) => (
                        <div className="toast_bg" key={notice.key}>
                            <div className='toast_box'>
                                <div className={`toast_icon ${icons[notice.type]}`}>
                                </div>
                                <div className='toast_text'>{notice.content}</div>
                            </div>
                        </div>
                    ))
                }
            </div>)
    }
}


export default Toast