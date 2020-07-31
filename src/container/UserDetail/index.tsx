import React from 'react'
import { connect } from 'react-redux'
import { getUserDetail } from './../../store/action'
import { getThemeType, getRelativeTime } from '../../assets/js/tools'
import Scroll from '../../baseUi/Scroll'
interface Props {
    userInfo: any
    match: any
    getUserDetail: Function
    history:any
}
interface State { }
class UserDetail extends React.Component<Props, State> {
    // 渲染前
    componentWillMount() {
        this._init()

    }

    _init() {
        const { getUserDetail } = this.props
        const { match } = this.props
        const username = match.params.username
        getUserDetail(username)
    }
    render() {
        const { userInfo } = this.props


        console.log('userinfo', userInfo)
        return (
            <div className="my-info-box">
                <div className="header">
                    <div className="header-left"  onClick = {()=>{ this.props.history.go(-1)}}><em className="iconfont icon-fanhui"></em></div>
                    <div className="header-center">{userInfo.loginname}</div>
                    <div className="header-right"><em className="iconfont icon-qita"></em></div>
                </div>
                <div>
                    <div className="wrapper">
                        <div className="header-protrait" style={{ backgroundImage: `url(${userInfo.avatar_url})` }}></div>
                    </div>
                    <div className="msg-info">
                        <a href="javascript:void(0);" className="active">最近主题</a>
                        <a href="javascript:void(0);">最近评论</a>
                    </div>
                </div>
                <Scroll handleTouchEnd={()=>{}} refreshTips={false}>

                    {
                        userInfo && userInfo.recent_replies && userInfo.recent_replies.map((item: any, index: number) => (
                            <div className="list-item" key={index}>
                                <div className="item-top">
                                    <div className="top-portrait" style={{ backgroundImage: `url(${item.author.avatar_url})` }}></div>
                                    <h3>{item.author.loginname}</h3>
                                    <span className="top-time">{getRelativeTime(item.last_reply_at)}</span>
                                </div>
                                <div className="item-content">
                                    <p>{item.title}</p>
                                </div>
                            </div>
                        ))
                    }
                </Scroll>
            </div>
        )
    }
}

const mapStateToProps = (state: any) => {
    return {
        userInfo: state.user.userInfo
    }
}

export default connect(mapStateToProps, { getUserDetail })(UserDetail)