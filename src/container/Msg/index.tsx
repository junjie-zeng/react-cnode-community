import React, { Component } from 'react'


class Msg extends Component {
    render() {
        return (
            <div className="msg-box">
                <div className="comment-tab">
                    <div className="active">未读消息</div>
                    <div>已读消息</div>
                </div>
                <div className="comment-tab-box">
                    <div className="scroll-box wrapper">
                        <div className="scroll-wrap-list">
                            <div className="comment-item">
                                <div className="comment-wrap">
                                    <div>
                                        <div className="touxiang"></div>
                                        <span className="name">junjie-zeng</span>
                                    </div>
                                    <div>
                                        <em>1年前</em>
                                    </div>
                                </div>
                                <div className="comment">
                                    <p>我和我的小伙伴都惊呆了</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Msg