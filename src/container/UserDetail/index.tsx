import React from 'react'
import { connect } from 'react-redux'
import { getUserDetail, setMask } from './../../store/action'
import { getThemeType, getRelativeTime } from '../../assets/js/tools'
import Scroll from '../../baseUi/Scroll'
import Header from '../../components/Header'
import CommentTab from '../../components/CommentTab'
import See from '../../components/See'
interface Props {
    userInfo: any
    match: any
    getUserDetail: Function
    history: any
    mask: boolean
    setMask: Function
}
interface State {
    isRecentTopics: boolean
    tabs: Array<any>
}
class UserDetail extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {
            isRecentTopics: true,
            tabs: [
                { title: '最近主题', active: true },
                { title: '最近评论', active: false }
            ]
        }
    }
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


    _commentSwitch = (index: number, tabs: Array<any>) => {
        let { isRecentTopics } = this.state
        // 0 最近主题 1 最近评论
        isRecentTopics = index ? false : true
        this.setState({ isRecentTopics, tabs })

    }

    _openMask = () => {
        this.props.setMask(true)
    }
    render() {
        const { userInfo, mask } = this.props
        const { isRecentTopics, tabs } = this.state
        return (
            <div>
                <Header backFun={() => { this.props.history.go(-1) }} title={userInfo.loginname} icon2='icon-qita' iconFun={this._openMask} />
                <div className="user-his-comment">
                    <div className="user-bg">
                        <div className="user-touxiang" style={{ backgroundImage: `url(${userInfo.avatar_url})` }}></div>
                    </div>
                    <CommentTab tabs={tabs} commentSwitch={this._commentSwitch} />
                    <div className="comment-tab-box">
                        {
                            isRecentTopics ?
                                <Scroll handleTouchEnd={() => { }} refreshTips={false}>
                                    {
                                        userInfo && userInfo.recent_topics && userInfo.recent_topics.map((item: any, index: number) => (
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
                                :
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
                        }

                    </div>
                </div>
                <See op={mask} />
            </div>
        )
    }
}

const mapStateToProps = (state: any) => {
    return {
        userInfo: state.user.userInfo,
        mask: state.other.mask
    }
}

export default connect(mapStateToProps, { getUserDetail, setMask })(UserDetail)