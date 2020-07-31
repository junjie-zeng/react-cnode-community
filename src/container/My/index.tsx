import React, { Component } from 'react'


class My extends Component {
    render() {
        return (
            <div>
                <div className="header">
                    <div className="header-left"><em></em></div>
                    <div className="header-center">jjz</div>
                    <div className="header-right"><em></em></div>
                </div>
                <div className="my-box">
                    <div className="wrapper">
                        <div className="header-protrait">

                        </div>
                    </div>
                    <div className="info">
                        <span>更多信息</span>
                        <span>&gt;</span>
                    </div>
                    <div className="info">
                        <span>评论加尾</span>
                        <span>&gt;</span>
                    </div>
                    <div className="btn">
                        <button>登录</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default My