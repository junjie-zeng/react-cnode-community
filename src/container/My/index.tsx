import React, { Component } from 'react'
import Header from '../../components/Header'

interface Props {
    history: any
}

interface State {
}
//容器
class My extends Component<Props, State> {




    // 退出
    handleLoginOut = () => {
        localStorage.setItem('token', '')
        localStorage.setItem('user', '')
        this.props.history.push('/login')
    }



    render() {
        let token = localStorage.getItem('token')
        let user = localStorage.getItem('user')
        return (
            <div>
                <Header title="用户中心" />
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
                        {
                            token ?
                                <button className='login-out-btn' onClick={this.handleLoginOut}>退出</button>
                                :
                                <button className='login-btn' onClick={() => { this.props.history.push('/login') }}>登录</button>

                        }

                    </div>
                </div>
            </div>

        )
    }
}

export default My