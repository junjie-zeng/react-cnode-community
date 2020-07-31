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
                {/* <div className="list-box">
                    <div className="list-item">
                        <div className="item-top">
                            <div className="top-portrait"></div>
                            <h3>JAck</h3>
                            <span className="top-time">8 天前</span>
                        </div>
                        <div className="item-content">
                            <p>hello word</p>
                        </div>
                    </div>
                    <div className="list-item">
                        <div className="item-top">
                            <div className="top-portrait"></div>
                            <h3>JAck</h3>
                            <span className="top-time">8 天前</span>
                        </div>
                        <div className="item-content">
                            <p>hello word</p>
                        </div>
                    </div>
                </div> */}
            </div>
        )
    }
}

export default Msg