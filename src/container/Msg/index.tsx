import React, { Component } from 'react'
import { connect } from 'react-redux'
import CommentTab from '../../components/CommentTab'
import { getMsg } from '../../store/action'
import { Link } from 'react-router-dom'
import Scroll from '../../baseUi/Scroll'
interface Props {
    getMsg: Function
    msgInfo: any
}
interface State {
    tabs: Array<any>
    ishasReadMessage: boolean
}
class Msg extends Component<Props, State> {

    constructor(props: Props) {
        super(props)
        this.state = {
            tabs: [
                { title: '未读消息', active: true },
                { title: '已读消息', active: false }
            ],
            ishasReadMessage: true
        }

    }

    componentWillMount() {
        this._init()

    }

    _init() {
        const { getMsg } = this.props
        const token = localStorage.getItem('token')
        if (token) {
            getMsg(token)
        }
    }

    _commentSwitch = (index: number, tabs: Array<any>) => {
        let { ishasReadMessage } = this.state
        // 0 未读 1 已读
        ishasReadMessage = index ? false : true
        this.setState({ tabs, ishasReadMessage })

    }

    render() {
        const { tabs, ishasReadMessage } = this.state
        const { msgInfo } = this.props
        const { has_read_messages, hasnot_read_messages } = msgInfo
        const token = localStorage.getItem('token')
        console.log('msgInfo...', msgInfo)
        return (
            <div className="msg-box">
                <CommentTab tabs={tabs} commentSwitch={this._commentSwitch} />
                <div className="comment-tab-box">
                    {
                        (token && has_read_messages && !has_read_messages.length && ishasReadMessage) ||
                            (token && hasnot_read_messages && !hasnot_read_messages.length && !ishasReadMessage) ?
                            <div className="msg">暂无消息</div> : ''
                    }
                    {

                        token ?
                            ''
                            :

                            <div className="msg">未登录请 <Link to='/login'>登录</Link></div>
                    }

                    {/* <Scroll handleTouchEnd={() => { }} refreshTips={false}>
                        <div className="comment-item">
                            <div className="comment-wrap">
                                <div>
                                    <div className="touxiang" style={{ backgroundImage: `url(${has_read_messages.author.avatar_url})` }}></div>
                                    <span className="name">{has_read_messages.author.loginname}</span>
                                </div>
                                <div>
                                    <em>1年前</em>
                                </div>
                            </div>
                            <div className="comment">
                                <p>我和我的小伙伴都惊呆了</p>
                            </div>
                        </div>
                    </Scroll> */}

                </div>
            </div>
        )
    }
}

const mapStateToProps = (state: any) => {
    return {
        msgInfo: state.msg.msgInfo
    }
}

export default connect(mapStateToProps, { getMsg })(Msg)