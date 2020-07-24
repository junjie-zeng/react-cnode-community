/*

    底部
*/

import React from 'react'
import { withRouter } from 'react-router-dom'

interface Props {
    navList:Array<any>
}

class NavFooter extends React.Component<any, any> {

    
    handleNav = (pathname: string) => {
        // console.log(pathname)
        // console.log(this.props.history)
        this.props.history.replace(pathname)
    }

    render() {
        const { pathname } = this.props.location
        const { navList } = this.props
        return (
            <div className="nav">
                {
                    navList.map((item:any, index:number) => (
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