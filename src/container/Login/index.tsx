import React, { Component } from 'react'
import Header from '../../components/Header'
import {Redirect} from 'react-router-dom'
interface Props{
    history:any
}

interface State{
    tokenName:string
    [x: string]: any
}
class Login extends Component <Props,State>{
    constructor(props:Props){
        super(props)
        this.state = {
            tokenName:''
        }
    }

    handleChage(key:string,value:string){
        this.setState({
            [key]:value
        })
    }

    handleLogin = ()=>{
        const {tokenName } = this.state
        console.log(tokenName)

        // 登录校验逻辑...

        // 效验成功后将用户信息与token本地存储
        localStorage.setItem('token',tokenName)
        //localStorage.setItem('user',)
        this.props.history.push('/my')
    }
    render() {
        const { tokenName} = this.state
        return (
            <div>
                <Header title='登录' backFun={() => { this.props.history.go(-1) }} />
                <div className="login">
                    <div className="login-wrap">
                        <div>
                            <input type="text" value = {tokenName} onChange = {(event)=>{this.handleChage('tokenName',event.target.value)}}  placeholder="请输入Access Token" />
                            <div>
                                <button className = "login-btn" onClick = {this.handleLogin}>登录</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default Login