import React, { Component } from 'react'


class Msg extends Component {
    render() {
        return (
            <div className="msg-box">
                <div className="msg-info">
                    <a href="javascript:;" className="active">未读消息</a>
                    <a href="javascript:;">已读消息</a>
                </div>
                <div className="msg-content">
                    暂无消息
                </div>
            </div>
        )
    }
}

export default Msg