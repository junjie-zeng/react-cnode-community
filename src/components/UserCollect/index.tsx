import React from 'react'
import { withRouter } from 'react-router-dom'
import Header from '../Header'
import Scroll from '../../baseUi/Scroll'
import { getThemeType, getRelativeTime, getThemeColor } from '../../assets/js/tools'
interface Props {
    loginname: string
    collect: any
    history?: any
    isShow:boolean
    collectPageBack:Function
    handleCollectDropDownRefresh:Function
    
}
interface State {
    isShow: boolean
}
// 用户收藏
//function UserCollect(props: Props) {
class UserCollect extends React.Component<any, State> {

    constructor(props: any) {
        super(props)
        
    }


    render() {
        const { loginname, collect ,isShow,collectPageBack,handleCollectDropDownRefresh} = this.props

        const _style = { top: isShow ? 0 : '60rem' }
        // console.log('props...', this.props)
        return (
            <div className="user-collect" style={_style}>
                <Header backFun={collectPageBack} title={loginname} />
                <div className="collect-wrap">
                    <Scroll handleTouchEnd={handleCollectDropDownRefresh} refreshTips={false}>
                        {
                            collect && collect.map((item: any, index: number) => (
                                <div className="list-item" key={index}>
                                    <div className="item-header">
                                        <div>
                                            <span className="portrait" style={{ backgroundImage: `url(${item.author.avatar_url})` }}></span>
                                            <span className="name">{item.author.loginname}</span>
                                        </div>
                                        <div>
                                            <span className="classify" style={{ background: getThemeColor(item) }}>{getThemeType(item)}</span>
                                            <span className="release-date">{getRelativeTime(item.create_at)}</span>
                                        </div>
                                    </div>
                                    <div className="item-content" onClick={() => { this.props.history.push(`/detail/${item.id}`) }}>
                                        <p>{item.title}</p>
                                    </div>
                                    <div className="item-nav">
                                        <div className="item-n-chakan">
                                            <span className="iconfont icon-yanjing"></span>
                                            <span>{item.visit_count}</span>
                                        </div>
                                        <div className="item-n-msg">
                                            <span className="iconfont icon-dkw_xiaoxi"></span>
                                            <span>{item.reply_count}</span>
                                        </div>
                                        <div className="item-n-date">
                                            <span className="iconfont icon-shijian00"></span>
                                            <span>{getRelativeTime(item.last_reply_at)}</span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </Scroll>
                </div>
            </div>
        )
    }
}

export default withRouter(UserCollect)