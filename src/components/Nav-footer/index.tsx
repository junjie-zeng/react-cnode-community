/*

    底部
*/

import React from 'react'
import { withRouter } from 'react-router-dom'
class NavFooter extends React.Component<any, any> {

    navList = [
        {
            path: '/home',
            text: '首页',
            icon: 'iconfont icon-shouye'
        },
        {
            path: '/classify',
            text: '分类',
            icon: 'iconfont icon-fenlei'
        },
        {
            path: '/msg',
            text: '消息',
            icon: 'iconfont icon-dkw_xiaoxi'
        },
        {
            path: '/my',
            text: '我的',
            icon: 'iconfont icon-wo'
        }
    ]

    handleNav = (pathname: string) => {
        // console.log(pathname)
        // console.log(this.props.history)
        this.props.history.replace(pathname)
    }

    render() {
        const { pathname } = this.props.location
        const { navList } = this
        return (
            <div className="nav">
                {
                    navList.map((item, index) => (
                        <div key={index} className={pathname == item.path ? 'active' : ''} onClick={() => { this.handleNav(item.path) }}>
                            <span className={item.icon}></span>
                            <span>{item.text}</span>
                        </div>
                    ))
                }
            </div>
        )
    }
}

export default withRouter(NavFooter)