import React, { Component } from 'react'


class My extends Component {
    render() {
        return (
            <div>
                <header className="header">
                    <div className="back">
                        <em className="iconfont icon-fanhui"></em>
                    </div>
                    <div className="wrap">
                        {/* <span style={{ background: 'goldenrod' }}></span> */}
                        <em>用户中心</em>
                    </div>
                    <div className="other">
                        <em className="iconfont icon-shoucang"></em>
                    </div>
                </header>
                <div className="my-box">
                    <div className="user-bg">
                        <div className="user-touxiang"></div>
                    </div>
                    <ul className="my-wrap">
                        <li>
                            <div>更多信息</div>
                            <div>
                                <em className="iconfont icon-fanhui"></em>
                            </div>
                        </li>
                        <li>
                            <div>评论加尾</div>
                            <div>
                                <em className="iconfont icon-fanhui"></em>
                            </div>
                        </li>
                    </ul>
                    <div className="login-out">
                        <button>退出</button>
                    </div>
                </div>
            </div>

        )
    }
}

export default My