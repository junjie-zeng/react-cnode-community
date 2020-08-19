import React, { Component } from 'react'
import Header from '../../components/Header'
import { setToken } from '../../store/action'
import { connect } from 'react-redux'
import {Redirect} from 'react-router-dom'

interface Props {
    history: any
    setToken:Function
}

interface State {
    token: string
    [x: string]: any
}
class Login extends Component<Props, State>{
    constructor(props: Props) {
        super(props)
        this.state = {
            token: ''
        }
    }

    handleChage(key: string, value: string) {
        this.setState({
            [key]: value
        })
    }

    handleLogin = () => {
        const { token } = this.state
        const { setToken } = this.props
        if (!token) {
            console.log("请输入token")
            return
        }
        console.log(token)
        // 登录校验逻辑
        setToken(token,(res:boolean)=>{
            if(res){
                this.props.history.push('/my')
            }else{
                console.log('效验失败')
            }
            
        })
        
        
    }
    render() {
        const { token } = this.state
        const tokenStr = localStorage.getItem('token')
        // token存在
        if(tokenStr){
            return <Redirect to = "/my"/>
        }
        
        return (
            <div>
                <Header title='登录' backFun={() => { this.props.history.go(-1) }} />
                <div className="login">
                    <div className="login-wrap">
                        <div>
                            <input type="text" value={token} onChange={(event) => { this.handleChage('token', event.target.value) }} placeholder="请输入Access Token" />
                            <div>
                                <button className="login-btn" onClick={this.handleLogin}>登录</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = () => {
    return {

    }
}

export default connect(mapStateToProps, { setToken })(Login)