import React, { Component } from 'react'
import Header from '../../components/Header'
import Toast from './../../baseUi/Toast/index'
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
    // 更多信息
    handleManyInfo(loginname: string) {
        let token = localStorage.getItem('token')
        if (!token) {
            Toast.info('未登录')
            return
        }
        this.props.history.push(`/user/${loginname}`)
    }


    render() {
        let token = localStorage.getItem('token')
        let _user = localStorage.getItem('user') || '{}'
        let user = JSON.parse(_user)
        console.log(user)
        return (
            <div>
                <Header title={user.loginname || '用户中心'} />
                <div className="my-box">
                    <div className="user-wrap">
                        <div className = "user-bg" style={{ backgroundImage: `url(${user.avatar_url})` }}></div>
                        <div className="user-touxiang" style={{ backgroundImage: `url(${user.avatar_url})` }}></div>
                    </div>
                    <ul className="my-wrap">
                        <li onClick={() => { this.handleManyInfo(user.loginname) }}>
                            <div>更多信息</div>
                            <div>
                                <em className="iconfont icon-jiantou"></em>
                            </div>
                        </li>
                        {/* <li>
                            <div>评论加尾</div>
                            <div>
                                <em className="iconfont icon-kaiguanguan"></em>
                            </div>
                        </li> */}
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