import React from 'react'
import { connect } from 'react-redux'
import { getUserDetail } from './../../store/action'
import { getThemeType, getRelativeTime } from '../../assets/js/tools'
import Scroll from '../../baseUi/Scroll'
import Header from '../../components/Header'
interface Props {
    userInfo: any
    match: any
    getUserDetail: Function
    history: any
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


    back = ()=>{
        this.props.history.go(-1)
        //console.log(1)
    }
    render() {
        const { userInfo } = this.props

        
        console.log('userinfo', userInfo)
        return (
            <div>
                {/* portrait  ={userInfo.author.avatar_url} */}
                <Header backFun = {this.back} title = {userInfo.loginname}  icon2 = 'icon-qita'/>
                <div className="user-his-comment">

                    <div className="user-bg">
                        <div className="user-touxiang" style={{ backgroundImage: `url(${userInfo.avatar_url})` }}></div>
                    </div>
                    <div className="comment-tab">
                        <div className="active">最近主题</div>
                        <div>最近评论</div>
                    </div>
                    <div className="comment-tab-box">
                        <Scroll handleTouchEnd={() => { }} refreshTips={false}>
                            {
                                userInfo && userInfo.recent_replies && userInfo.recent_replies.map((item: any, index: number) => (
                                    <div className="comment-item" key={index}>
                                        <div className="comment-wrap">
                                            <div>
                                                <div className="touxiang" style={{ backgroundImage: `url(${item.author.avatar_url})` }}></div>
                                                <span className="name">{item.author.loginname}</span>
                                            </div>
                                            <div>
                                                <em>{getRelativeTime(item.last_reply_at)}</em>
                                            </div>
                                        </div>
                                        <div className="comment">
                                            <p>{item.title}</p>
                                        </div>
                                    </div>
                                ))
                            }
                        </Scroll>
                    </div>
                </div>
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