import React, { Component } from 'react'
import Header from '../../components/Header'

class My extends Component {
    render() {
        return (
            <div>
                <Header title = "用户中心"/>
                <div className="my-box">
                    <div className="user-bg">
                        <div className="user-touxiang"></div>
                    </div>
                    <ul className="my-wrap">
                        <li>
                            <div>更多信息</div>
                            <div>
                                <em className="iconfont icon-jiantou"></em>
                            </div>
                        </li>
                        <li>
                            <div>评论加尾</div>
                            <div>
                                <em className="iconfont icon-kaiguanguan"></em>
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